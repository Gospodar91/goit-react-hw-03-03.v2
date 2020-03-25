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
  let parseSearchQuery = queryString.parse(location.search).query;
  console.log('parseSearchQuery', parseSearchQuery)

   if(parseSearchQuery){

    
    services
    .getSearchMovie (parseSearchQuery)
    .then(data =>
      this.setState({
        searchinfo: data.data.results,
        queryPages: data.data.total_results,
        query:parseSearchQuery
      })
    )
 
  

  }
 

}


   componentDidUpdate(prevProps, prevState) {
     if(prevProps.location.search!==this.props.location.search){
       this.setState({searchinfo:[]})
     }
 
    console.log('prevProps', prevProps.location.search)
    console.log('this.props.location.seacrh', this.props.location.search)

    if (prevState.query !== this.state.query) {
         services
        .getSearchMovie(this.state.query)
        .then(data =>
          this.setState({
            searchinfo: data.data.results,
            queryPages: data.data.total_results,
           

            
          })
        )
     
        
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
    
    console.log("MoviePageProps", this.props);
    console.log("MoviePageState", this.state);
    return (
      <>
        <h2 className="SearchMovie">Movie Search Page</h2>

        <SearchForm getQueryonSubmit={this.getQueryonSubmit} />
        {this.state.queryPages === 0 && <h2>Sorry,film was not found</h2>}
        {this.state.query  && (
          <>
            <ul className='MoviepageUl'>
              {searchinfo.map(searchinfo => (
                <li className='MoviepageLi' key={searchinfo.id}>
                  <Link className="LinkList"
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
                  <img className='smallImg' alt="unavailable"src={`https://image.tmdb.org/t/p/original${searchinfo.backdrop_path}`}/>
                </li>
              ))}
            </ul>
          </>
        )}
       
       
      </>
    );
  }
}
export default withRouter(MoviePage);
