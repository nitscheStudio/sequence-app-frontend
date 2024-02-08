import FilterableSampleList from "../components/FilterableSampleList";
import FilterForm from "../components/FilterForm";
import { Sample } from "../types/sample";
import { useState } from "react";

const Browse = () => {
  const [samples, setSamples] = useState<Sample[]>([]);

  const handleSearch = async (searchParams) => {
    // Use searchParams to perform the Meilisearch query
    // Update the samples state with the search results
    const results = await performSearch(searchParams); // Implement this function based on your backend
    setSamples(results);
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
