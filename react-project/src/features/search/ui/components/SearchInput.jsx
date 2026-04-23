import React from "react";
import { useSearch } from "../../hooks/useSearch";
import Container from "./Container";

const SearchInput = ({ ...props }) => {
  let { handleSearch, searchValue, searchedSongs } = useSearch();

  return (
    <div className="w-50">
      <input
        onChange={handleSearch}
        className="w-full border-gray-600 border rounded py-3 px-3"
        {...props}
      />
      {searchValue ? <Container songs={searchedSongs} /> : null}
    </div>
  );
};

export default SearchInput;