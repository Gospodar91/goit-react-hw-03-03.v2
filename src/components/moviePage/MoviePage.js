import React, { Component } from "react";
import { Link } from "react-router-dom";
import services from "../services";
import SearchForm from "./seacrhForm/SearhForm";

class MoviePage extends Component {
  state = {
    searchinfo: [],
    query: null
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      services
        .getSearchMovie(this.state.query)
        .then(data => this.setState({ searchinfo: data }));
    }
  }
  getQueryonSubmit = async e => {
    e.preventDefault();
    await this.setState({ query: e.target.elements[0].value });
  };
  render() {
    const { results } = { ...this.state.searchinfo.data };
    const infoArray = { ...results };
    const targetSearch = { ...infoArray[0] };
    const {
      backdrop_path,
      vote_average,
      original_title,
      overview,
      id
    } = targetSearch;
    console.log("results", results);
    console.log("this.state.query", this.state.query);
    return (
      <>
        <h2 className="SearchMovie">Movie Search Page</h2>
        <button
          className="goBackButton"
          type="button"
          onClick={() => this.props.history.goBack()}
        >
          Go back
        </button>

        <SearchForm getQueryonSubmit={this.getQueryonSubmit} />

        {this.state.query && (
          <>
            {/* <ul>
    {results.map( movie=>(<li key={movie.id}>{movie.id}</li>)  )}

      </ul>
           */}
            <div className="allInfo">
              <div className="infoImg">
                <img
                  src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                  alt="ololoshenka"
                  className="SearchImg"
                />{" "}
              </div>
              <div className="textArea">
                <h2 className="title">{original_title}</h2>

                <p className="score">Average score:{vote_average * 10}%</p>
                <h2 className="overview">{overview}</h2>
              </div>

              <div className="LinkCastReview">
                <Link
                  className="CastLink"
                  to={{
                    pathname: `/moviesSearch/${id}/cast`,
                    state: { id: id }
                  }}
                >
                  Cast
                </Link>

                <Link
                  to={{
                    pathname: `/moviesSearch/${id}/reviews`,
                    state: { id: id }
                  }}
                >
                  Review
                </Link>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
export default MoviePage;
