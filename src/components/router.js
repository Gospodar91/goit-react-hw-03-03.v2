import { Route, Switch, Redirect } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import HomePage from "./homePage/Homepage";
import MovieDetailsPage from "./movieDetailsPage/MovieDetailsPage";
export const useRouter = () => {
  const CastLazy=lazy(() =>import('./cast/Cast'))
  const RewiewLazy=lazy(()=>import('./reviews/Reviews'))
  const MoviePageLazy=lazy(()=>import('./moviePage/MoviePage'))
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
  
      <Route  path="/movies/:id/MovieDetailsPage" component={MovieDetailsPage} />
     <>
      <Suspense fallback={<div>Loading...</div>}>
        <Route path="/moviesSearch" component={MoviePageLazy} />
        <Route path="/moviesSearch/:movieId/cast" component={CastLazy} />
        <Route path="/moviesSearch/:movieId/reviews" component={RewiewLazy} />
         </Suspense>
      </>
      <Redirect to="/" />
    </Switch>
    
  );
};
