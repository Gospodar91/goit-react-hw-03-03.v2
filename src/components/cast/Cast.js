
import React,{Component} from "react";
import services from "../services";

class Cast extends Component{
  state={
      castInfo:[],
  }
  componentDidMount() {
    services.getCast(this.props.match.params.movieId)
    .then(
      cast=>this.setState({castInfo:cast})
    )   
  }
   render(){
     console.log('hi')
     console.log('this.stateCAst', this.state)
const {cast}={...this.state.castInfo.data}
  const  shortCast= cast&& cast.slice([0], [3])
  return (
    
   <>
     <h2>Cast</h2>
   <ul>
  {shortCast&&shortCast.map(cast=>(<li key={cast.id}>
    <p>{cast.name}</p>
    <img src={`https://image.tmdb.org/t/p/original${cast.profile_path}`} alt='olololo' />
      </li>))}
  </ul>
   </>
  );
};
}
export default Cast;
