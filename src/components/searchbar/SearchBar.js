import React from "react";

const Searchbar = ({ handleChange, handleOnSubmit }) => {
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleOnSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={handleChange}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
export default Searchbar;
