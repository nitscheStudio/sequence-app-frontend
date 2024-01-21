import React from "react";

type SearchbarProps = {
  searchQuery: string;
  onSearch: (query: string) => void;
};

const Searchbar = ({ searchQuery, onSearch }: SearchbarProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
    
  };

  // const handleSubmit = (event: Event) => {
  //   event.preventDefault();
  //   onSearch(searchQuery);
  // };

  return (
    <div className="searchbar-wrapper">
      <input
        className="searchbar"
        type="text"
        name=""
        id=""
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="search by keyword..."
      />
    </div>
  );
};

export default Searchbar;
