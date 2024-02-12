import FilterableSampleList from "../components/FilterableSampleList";
import FilterForm from "../components/FilterForm";
import { Sample } from "../types/sample";
import { useState } from "react";
import http from "../utils/http";

type FormValues = {
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

  const handleSearch = async (searchParams: FormValues) => {
    // Use searchParams to perform the Meilisearch query
    // Update the samples state with the search results
    const results = await performSearch(searchParams); // Implement this function based on your backend
    setSamples(results);
  };

  const performSearch = async (searchParams: FormValues): Promise<Sample[]> => {
    console.log(searchParams);  
    try {
      await http.get("/sanctum/csrf-cookie");
      const response = await http.post<Sample[]>("/search", searchParams);
      console.log(response);
      return response.data; // Assuming response.data contains the array of samples
    } catch (error) {
      console.error("Search error:", error);
      return []; // Return an empty array in case of an error
    }
  };

  return (
    <>
      <section className="filter-sample-container">
        <h1>Filter All Samples</h1>
        <div>
          <FilterForm onSearch={handleSearch} />
        </div>
        <section className="sample-list-container">
          <FilterableSampleList showEditButton={false} endpoint="samples" />
        </section>
      </section>
    </>
  );
};

export default Browse;
