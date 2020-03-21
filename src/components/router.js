import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "./homePage/Homepage";
import MoviePage from "./moviePage/MoviePage";
import MovieDetailsPage from "./movieDetailsPage/MovieDetailsPage";
import Cast from "./cast/Cast";
import Reviews from "./reviews/Reviews";
export const useRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/movies/:id/MovieDetailsPage" component={MovieDetailsPage} />
      <>
     
        <Route path="/moviesSearch" component={MoviePage} />
        <Route path="/moviesSearch/:movieId/cast" component={Cast} />
        <Route path="/moviesSearch/:movieId/reviews" component={Reviews} />
       
      </>
    
    </Switch>
  );
};
