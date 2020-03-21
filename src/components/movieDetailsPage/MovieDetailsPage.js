import React, { Component } from "react";
import { Switch, Link, Route } from "react-router-dom";
import Cast from "../cast/Cast";
import Reviews from "../reviews/Reviews";
import css from "../../components/App.css";
import services from "../services";

class MovieDetailsPage extends Component {
  state = {
    movieInfo: []
  };
  componentDidMount() {
    services
      .movieDetailsPage(this.props.location.state.id)
      .then(data => this.setState({ movieInfo: data }));
  }
  render() {
    const {
      backdrop_path,
      original_title,
      vote_average,
      overview,
      id,
      genres
    } = { ...this.state.movieInfo.data };

    return (
      <>
        <button type="button" onClick={() => this.props.history.goBack()}>
          Go back
        </button>
        <div className="allInfo">
          <div className="infoImg">
            <img
              src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
              alt="ololoshenka"
            />{" "}
          </div>
          <div className="textArea">
            <h2 className="title">{original_title}</h2>
            <p className="score">Average score:{vote_average * 10}%</p>
            <h2 className="overviwe">{overview}</h2>
            <p>
              {genres &&
                genres.map(genre => <span key={genre.id}>{genre.name} </span>)}
            </p>
          </div>
        </div>
        <div className="LinkCastReview">
          <Link
            className="CastLink"
            to={{
              pathname: `/movies/${id}/MovieDetailsPage/cast`,
              state: { id: id }
            }}
          >
            Cast
          </Link>

          <Link
            className="RewiewLink"
            to={{
              pathname: `/movies/${id}/MovieDetailsPage/reviews`,
              state: { id: id }
            }}
          >
            Review
          </Link>
        </div>
      </>
    );
  }
}
export default MovieDetailsPage;
