import React, { Component,lazy,Suspense } from "react";

import { Link, withRouter, Switch,Route } from "react-router-dom";

import services from "../services";

const CastLazy = lazy(() => import("../cast/Cast"));
const RewiewLazy = lazy(() => import("../reviews/Reviews"));

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
    if (location.state.query === undefined) {
      history.push("/home");
    } else history.push(`/moviesSearch/?query=${location.state.query}`);
  };
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
        {this.state.status && (
          <>
            <button className='buttonBack' type="button" onClick={this.handelGoBack}>
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
                <p> Genre:
                  {genres &&
                    genres.map(genre => (
                      <span key={genre.id}> {genre.name} </span>
                    ))}
                </p>
              </div>
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
                className="RewiewLink"
                to={{
                  pathname: `/moviesSearch/${id}/reviews`,
                  state: { id: id }
                }}
              >
                Review
              </Link>
              <Suspense fallback={<div>Loading...</div>}>
              <Switch>
              <Route
            path="/moviesSearch/:movieId/cast"
            component={CastLazy}
          />
          <Route
            path="/moviesSearch/:movieId/reviews"
            component={RewiewLazy}
          />
          </Switch>
          </Suspense>
            </div>
            
          </>
        )}
      </>
    );
  }
}
export default withRouter(MovieDetailsPage);
