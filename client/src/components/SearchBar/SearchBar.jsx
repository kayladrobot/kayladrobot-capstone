import React, { useState } from "react";
import "./SearchBar.scss";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(query);
    addActiveFilter(query);
    setQuery("");
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  const addActiveFilter = (filter) => {
    setActiveFilter([...activeFilter, filter]);
  };

  const removeActiveFilter = (filter) => {
    const updatedFilters = activeFilter.filter((item) => item !== filter);
    setActiveFilter(updatedFilters);
    onSearch("");
  };

  return (
    <div className="search">
      <div className="search__category-container">
      <p className="p--large">Tags</p>
        {activeFilter.map((filter) => (
          <div className="search__category" key={filter}>
            {filter}
            <button
              className="search__category--close"
              type="button"
              onClick={() => removeActiveFilter(filter)}
            >
              x
            </button>
          </div>
        ))}
      </div>

      <form className="search__form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search creatives"
          className="search__input"
          name="s"
          value={query}
          onChange={handleInputChange}
        />
        <button className="search__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
