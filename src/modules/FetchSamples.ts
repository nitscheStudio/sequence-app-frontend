import http from "../utils/http";
import MeiliSearch from "meilisearch";
import { Sample } from "../types/sample";

interface MeiliSearchParams {
  text?: string;
  filter?: string;
}

interface FetchParams {
  indexName: string;
  searchParams: MeiliSearchParams;
  page: number;
}

interface APIFetchParams {
  endpoint: string;
  page: number;
}

const client = new MeiliSearch({
  host: "http://localhost:7700",
  apiKey: "masterKey",
});

const index = client.index("samples_index");

export const fetchFromMeiliSearch = async ({
  indexName,
  searchParams,
  page,
}: FetchParams) => {
  const pageSize = 10;
  try {
    const searchOptions: any = {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      sort: ["created_at:desc"],
    };

    // If there's a filter provided, include it in the search options
    if (searchParams.filter) {
      searchOptions.filter = searchParams.filter;
    }

    const response = await client
      .index(indexName)
      .search(searchParams.text || "", searchOptions);

    // Map MeiliSearch hits to Sample type
    const samples: Sample[] = response.hits.map((hit) => ({
      id: hit.id,
      title: hit.title,
      bpm: hit.bpm,
      key: hit.key,
      scale: hit.scale,
      file_path: hit.file_path,
      user_id: hit.user_id,
      created_at: hit.created_at,
      genre_id: hit.genre_id,
      instrument_id: hit.instrument_id,
      tags: hit.tags || [],
      likes_count: hit.likes_count || 0,
      isLikedByCurrentUser: hit.isLikedByCurrentUser || false,
      profile_picture_path: hit.profile_picture_path || "",
    }));

    const totalSamples =
      response.estimatedTotalHits !== undefined
        ? response.estimatedTotalHits
        : 0;

    const totalPages = Math.ceil(totalSamples / pageSize);

    return { samples, totalSamples, totalPages };
  } catch (error) {
    console.error("MeiliSearch Fetch Error:", error);
  }
};

export const fetchFromAPI = async ({ endpoint, page }: APIFetchParams) => {
  try {
    await http.get("/sanctum/csrf-cookie");
    const response = await http.get(`/${endpoint}?page=${page}`);
    const samples = response.data.samples;
    const totalSamples = response.data.total;
    const totalPages = response.data.pages;
    const sampleData = [samples, totalSamples, totalPages];
    return sampleData;
  } catch (error) {
    console.error("API Fetch Error:", error);
  }
};

export const fetchLikedSamples = async () => {
  try {
    await http.get("/sanctum/csrf-cookie");
    const response = await http.get("/user/likedSamples");
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching liked Sample IDs:", error);
    return [];
  }
};
