import React, { Component } from "react";
import "./App.css";
import PageLoader from "./loader/Loader";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ImageGallery from "./imageGallery/ImageGallery";
import Searchbar from "./searchbar/SearchBar";
import axios from "axios";
import Button from "./button/Button";
const KEY = "15302072-a81be31270c5e4995077a81d4";

export default class App extends Component {
  state = {
    query: "",
    isLoading: false,
    gallery: [],
    page: 1
  };
  componentDidMount() {
    this.handleSubmit();
  }

  handleChange = event => {
    if (this.state.query !== event.target.value) {
      this.setState({ page: 1 });
    }
    this.setState({ query: event.target.value });
  };

  handleOnSubmit = async e => {
    e.preventDefault();
    await this.setState({ gallery: [] });
    await this.handleSubmit();
  };

  handleSubmit = () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
    axios
      .get(
        `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${KEY}`
      )
      .then(data =>
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...data.data.hits],
          largeImageUrl: data.data.hits.largeImageURL
        }))
      )
      .finally(() => this.setState({ isLoading: false }));
  };
  loadMore = async () => {
    const pageStep = 1;
    await this.setState(prevState => ({ page: prevState.page + pageStep }));
    await this.handleSubmit();
  };
  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  };

  render() {
    const { gallery, isLoading, page } = this.state;
    return (
      <>
        <Searchbar
          handleChange={this.handleChange}
          handleOnSubmit={this.handleOnSubmit}
        />
        {isLoading && <PageLoader />}
        <ImageGallery gallery={gallery} />
        <Button loadMore={this.loadMore} />
        {page !== 1 && this.scroll()}
      </>
    );
  }
}
