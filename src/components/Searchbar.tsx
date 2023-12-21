import React, { useState } from "react";
import { MeiliSearch, SearchResponse } from "meilisearch";
import { Sample, SearchResultsHits } from "../types/sample";


type SearchBarProps = {
  onSearch: (results: Sample[]) => void;
};

const client = new MeiliSearch({
  // host: "http://localhost:7700/indexes/samples_index/search",
  host: "http://localhost:7700/",
});

const SearchbarSample = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  // const [filter, setFilter] = useState("");

  const handleSearch = async () => {
    const index = client.index("samples_index");
    if (!query) return;
    try {
      const results = await index.search(query);
      console.log("search results", results.hits);
      onSearch(results.hits);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="searchbar-wrapper">
      <input
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search by keyword"
        className="search-input"
        type="text"
        value={query}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchbarSample;
