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
    <>      <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/home" component={HomePage} />
  
          <Route
            path="/moviesSearch/:movieId" exact
            component={MovieDetailsPageLazy}
          />

        
          <Route exact path="/moviesSearch" component={MoviePageLazy} />
          <Redirect to="/home" />
      </Switch>
       
      </Suspense>
   
    </>
  );
};
