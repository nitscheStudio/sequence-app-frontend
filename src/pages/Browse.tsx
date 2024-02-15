import FilterableSampleList from "../components/FilterableSampleList";
import FilterForm from "../components/FilterForm";
import { Sample } from "../types/sample";
import { useState, useEffect } from "react";
import { CgLoadbarSound } from "react-icons/cg";
import MeiliSearch from "meilisearch";
import http from "../utils/http";

type FormValues = {
  text?: string;
  bpmRange?: number[];
  key?: string;
  scale?: string;
  genre_id?: number;
  instrument_id?: number;
  tags?: Array<{
    id: number;
    name: string;
  }>;
};

const Browse = () => {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [page, setPage] = useState(1);
  const [totalSamples, setTotalSamples] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // Initialize MeiliSearch client
  const client = new MeiliSearch({
    host: "http://localhost:7700",
    apiKey: "masterKey", // Use a public key with search-only permissions
  });

  const fetchSamples = async () => {
    try {
      const response = await http.get(`/samples?page=${page}`);
      setSamples(response.data.samples);
      setTotalSamples(response.data.total);
      setTotalPages(response.data.pages);
    } catch (error) {}
  };

  const index = client.index("samples_index");

  const handleSearch = async (searchParams: FormValues) => {
    try {
      let filters = [];

      // Conditionally construct filters based on searchParams
      if (searchParams.instrument_id) {
        filters.push(`instrument_id = ${searchParams.instrument_id}`);
      }
      if (searchParams.genre_id) {
        filters.push(`genre_id = ${searchParams.genre_id}`);
      }
      if (searchParams.key) {
        filters.push(`key = "${searchParams.key}"`); // Assuming 'key' is a string attribute
      }
      if (searchParams.scale) {
        filters.push(`scale = "${searchParams.scale}"`); // Assuming 'scale' is a string attribute
      }
      if (searchParams.bpmRange && searchParams.bpmRange.length === 2) {
        // Assuming your index has a 'bpm' attribute and you want to filter within the range
        filters.push(
          `bpm >= ${searchParams.bpmRange[0]} AND bpm <= ${searchParams.bpmRange[1]}`
        );
      }

      let searchOptions = {
        filter: filters.length > 0 ? filters.join(" AND ") : undefined,
        attributesToRetrieve: ["*"], // Retrieve all attributes
      };

      const { hits } = await index.search(
        searchParams.text || "",
        searchOptions
      );
      setSamples(hits as Sample[]); // Ensure you handle the type assertion properly
    } catch (error) {
      console.error("Search error:", error);
      setSamples([]); // Reset samples on error
    }
  };

  // Function to handle going to the next page
  const handleNextPage = () => {
    setPage((currentPage) => Math.min(currentPage + 1, totalPages));
    window.scrollTo(0, 0);
  };

  // Function to handle going to the previous page
  const handlePrevPage = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchSamples();
  }, [page]);

  return (
    <>
      <h1 className="sample-form-headline">
        <CgLoadbarSound />
        Browse All Samples
      </h1>
      <div className="browse-main-container">
        <section className="filter-sample-container">
          <div className="filter-sample-wrapper">
            <h3>Filter:</h3>
            <FilterForm onSearch={handleSearch} />
          </div>
        </section>
        <section className="filter-sample-container">
          <FilterableSampleList
            totalSamples={totalSamples}
            totalPages={totalPages}
            samples={samples}
            setSamples={setSamples}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            showEditButton={false}
            page={page}
          />
        </section>
      </div>
    </>
  );
};

export default Browse;
