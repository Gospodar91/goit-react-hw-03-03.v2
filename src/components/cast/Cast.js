import React, { Component } from "react";
import services from "../services";

class Cast extends Component {
  state = {
    castInfo: []
  };
  componentDidMount() {
    services
      .getCast(this.props.match.params.movieId)
      .then(cast => this.setState({ castInfo: cast,queryPages:cast.data.total_results }));
  }
  render() {
    const { cast } = { ...this.state.castInfo.data };
    const shortCast = cast && cast.slice([0], [5]);
    return (
      <>
        <h2>Cast</h2>
        {this.state.queryPages===0&& (
          <h2>Sorry,Rewiews was not found</h2>
        )}
        <ul className= 'CastList'>
          {shortCast &&
            shortCast.map(cast => (
              <li key={cast.id} className='CastItem'>
                
                <p>{cast.name}</p>
                <img
                  className="CastImg"
                  src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                  alt="olololo"
                />
              </li>
            ))}
        </ul>
      </>
    );
  }
}
export default Cast;
