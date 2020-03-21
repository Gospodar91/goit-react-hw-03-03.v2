
import React,{Component} from "react";
import services from "../services";

class Reviews extends Component{
  state={
    reviewsInfo:[],
  
    
  }
  componentDidMount() {
    services.getReview(this.props.match.params.movieId)
    .then(
      results=>this.setState({ reviewsInfo:results})
    )
    
  }
  
  render(){
    const {results}={...this.state.reviewsInfo.data};
   const shortResultsArr=results&& results.slice([0],[3])
    console.log('results', shortResultsArr)


    // console.log('this.state.Reviews', titleData.data)
    // console.log('this.propsaaaadad', this.props.match.params.movieId)
  return (
   <>
   <h2>Rewiews</h2>
   <ul>
     {shortResultsArr&&shortResultsArr.map(results=>(<li key={results.id}>
     <h2>{results.author}</h2>
     <p>{results.content}</p>



     </li>))}
   </ul>
   </>
  );
};
}


export default Reviews;
