import React, { Component } from "react";
import services from "../services";
import HomePageList from "./homepageList/HomePageList";
class HomePage extends Component {
  state = {
    movies: []
  };

  async componentDidMount() {
    await services
      .getTrendingData()
      .then(data => this.setState({ movies: data.data.results }));
  }
  render() {
    return (
      <>
        <ul>
          {this.state.movies.map(movie => (
            <HomePageList movie={movie} key={movie.id} />
          ))}
        </ul>
      </>
    );
  }
}
export default HomePage;
