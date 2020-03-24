import React, { Component } from "react";
import { Link,withRouter } from "react-router-dom";
import services from "../services";
import SearchForm from "./seacrhForm/SearhForm";
import queryString from "query-string";

class MoviePage extends Component {
  state = {
    searchinfo: [],
    query: '',
    queryPages: null,
    prevSearchQuery: ""
  };

componentDidMount() {
  console.log('this.props', this.props)
  const { location } = this.props;
    console.log('this.props.location.search', this.props.location.search)
  const parseSearchQuery = queryString.parse(location.search).query;
  console.log('parseSearchQuery', parseSearchQuery)
  if(parseSearchQuery!== ""){

    
    services
    .getSearchMovie (parseSearchQuery)
    .then(data =>
      this.setState({
        searchinfo: data.data.results,
        queryPages: data.data.total_results,
        query:parseSearchQuery
      })
    )
    .then((this.props.location.search = this.state.query));
    
  }
}


   componentDidUpdate(prevProps, prevState) {
    const { location } = this.props;
    console.log('location Search', location.search)
    const parseSearchQuery = queryString.parse(location.search).query;
    console.log('parseSearchQuery', parseSearchQuery)
    if (prevState.query !== this.state.query) {
         services
        .getSearchMovie(this.state.query)
        .then(data =>
          this.setState({
            searchinfo: data.data.results,
            queryPages: data.data.total_results
          })
        )
        .then((this.props.location.search = this.state.query));
        
      }

   
  }
  getQueryonSubmit =async e => {
    e.preventDefault();
  await  this.setState({
      query: e.target.elements[0].value,
      prevSearchQuery: e.target.elements[0].value
      
    });
    console.log('this.state', this.state)
     this.props.history.push(`/moviesSearch/?query=${this.state.query}`);
  };

  render() {
    const { searchinfo } = this.state;
    const targetSearch = { ...searchinfo[0] };
    const {
      backdrop_path,
      vote_average,
      original_title,
      overview,
      id
    } = targetSearch;
    console.log("MoviePageProps", this.props);
    console.log("MoviePageState", this.state);
    return (
      <>
        <h2 className="SearchMovie">Movie Search Page</h2>

        <SearchForm getQueryonSubmit={this.getQueryonSubmit} />
        {this.state.queryPages === 0 && <h2>Sorry,film was not found</h2>}
        {this.state.query && searchinfo.length > 1 && (
          <>
            <ul>
              {searchinfo.map(searchinfo => (
                <li key={searchinfo.id}>
                  <Link
                    to={{
                      pathname: `/moviesSearch/${searchinfo.id}`,
                     
                      state: {
                        search: `?search=${this.state.query}`,
                       
                        id: searchinfo.id,
                        query: this.state.prevSearchQuery,
                        from: `/moviesSearch/`
                      }
                    }}
                  >
                    {searchinfo.original_title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
        {this.state.query && searchinfo.length === 1 && (
          <>
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
export default withRouter(MoviePage);
