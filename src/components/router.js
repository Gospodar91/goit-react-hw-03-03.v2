import { Route, Switch, Redirect } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import HomePage from "./homePage/Homepage";
// import MovieDetailsPage from "./movieDetailsPage/MovieDetailsPage";
export const useRouter = () => {

  const MoviePageLazy = lazy(() => import("./moviePage/MoviePage"));
  const MovieDetailsPageLazy = lazy(() =>
    import("./movieDetailsPage/MovieDetailsPage")
  );
  return (
    <>
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Suspense fallback={<div>Loading...</div>}>
          <Route
            path="/moviesSearch/:movieId"
            component={MovieDetailsPageLazy}
          />

        
          <Route exact path="/moviesSearch" component={MoviePageLazy} />
          {/* <Route path="/moviesSearch/:movieId/cast" component={CastLazy} />
          <Route path="/moviesSearch/:movieId/reviews" component={RewiewLazy} /> */}
        </Suspense>
      </Switch>
      <Redirect to="/home" />
    </>
  );
};
