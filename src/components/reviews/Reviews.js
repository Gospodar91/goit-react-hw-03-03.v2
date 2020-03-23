import React, { Component } from "react";
import services from "../services";

class Reviews extends Component {
  state = {
    reviewsInfo: [],
    queryPages: null
  };
  componentDidMount() {
    services
      .getReview(this.props.match.params.movieId)
      .then(results =>
        this.setState({
          reviewsInfo: results,
          queryPages: results.data.total_pages
        })
      );
  }

  render() {
    const { results } = { ...this.state.reviewsInfo.data };
    const shortResultsArr = results && results.slice([0], [3]);
    return (
      <>
        <h2>Rewiews</h2>
        {this.state.queryPages === 0 && <h2>Sorry,Rewiews was not found</h2>}
        <ul>
          {shortResultsArr &&
            shortResultsArr.map(results => (
              <li key={results.id}>
                <h2>{results.author}</h2>
                <p>{results.content}</p>
              </li>
            ))}
        </ul>
      </>
    );
  }
}

export default Reviews;
