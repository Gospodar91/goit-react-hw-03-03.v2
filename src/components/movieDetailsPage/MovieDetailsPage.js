import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import services from "../services";

class MovieDetailsPage extends Component {
  state = {
    movieInfo: [],
    status: null,
    query: ""
  };
  componentDidMount() {
    services
      .movieDetailsPage(this.props.location.state.id)
      .then(data =>
        this.setState({ movieInfo: data, 
          status: data.data.status 
        })
      );
      
  }

  handelGoBack = () => {
    const { history, location } = this.props;
    console.log("ButtonQuery", location.state);
    if (location.state.query === undefined) {
      history.push("/home");
    } else history.push(`/moviesSearch/?query=${location.state.query}`);
  };
  render() {
    console.log('this.propsMovieDetails', this.props.location.state)
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
        {this.state.status && (
          <>
            <button type="button" onClick={this.handelGoBack}>
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
                    genres.map(genre => (
                      <span key={genre.id}>{genre.name} </span>
                    ))}
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
        )}
      </>
    );
  }
}
export default withRouter(MovieDetailsPage);
