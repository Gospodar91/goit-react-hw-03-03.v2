import React from "react";
import  "./App.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useRouter } from "./router";


const App=() => {
  const routing = useRouter();
  return(
    <>
    <Router>
      <ul>
        <li>
      <Link to='/'> HomePage</Link>
      </li>
       <li>
      <Link to='/moviesSearch'>Movies</Link>
      </li>
      </ul>
      {routing}
 </Router>
    </>
)
  }

  export default  App;