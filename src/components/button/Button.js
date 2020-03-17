import React from "react";

const Button = ({ loadMore }) => {
  return (
    <>
      <button className="Button" type="button" onClick={loadMore}>
        LOAD MORE
      </button>
    </>
  );
};

export default Button;
