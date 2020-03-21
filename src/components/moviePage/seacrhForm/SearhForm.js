import React from "react";

const SearchForm = ({ getQueryonSubmit }) => {
  return (
    <>
      <form onSubmit={getQueryonSubmit}>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
        />
      </form>
    </>
  );
};
export default SearchForm;
