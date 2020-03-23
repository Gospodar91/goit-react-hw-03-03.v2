import axios from "axios";
import { withRouter } from "react-router-dom";

const API_KEY = "5d541b775537fe62598d0f7b97768427";

const params = {
  api_key: API_KEY
  // language: "ru-RU"
};
axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const services= {
  async getTrendingData() {
    try {
      const data = await axios.get(`trending/all/day`, { params });
      return data;
    } catch (error) {
      console.log("Trendingerror", error);
      throw new Error();
    }
  },
  async movieDetailsPage(id) {
    try {
      const data = await axios.get(`movie/${id}`, { params });
      return data;
    } catch (error) {
      console.log("MovieDetail error", error);
      throw new Error();
    }
  },
  async getCast(id) {
    try {
      const data = await axios.get(`/movie/${id}/credits?`, { params });
      return data;
    } catch (error) {
      console.log("Cast error error", error);
      throw new Error();
    }
  },

  async getReview(id) {
    try {
      const data = await axios.get(`/movie/${id}/reviews?&page=1`, { params });
      return data;
    } catch (error) {
      console.log("Cast error error", error);
      throw new Error();
    }
  },
  async getSearchMovie(query) {
    try {
      const data = await axios.get(
        `search/movie?&language=en-US&query=${query}&page=1&include_adult=false`,
        { params }
      );
      console.log("data", data);
      return data;
    } catch (error) {
      console.log("error", error);
      throw new Error();
    }
  },
  
  handleGoBack(props){
    this.props.history.push('/home')
  }
};
export default withRouter(services)