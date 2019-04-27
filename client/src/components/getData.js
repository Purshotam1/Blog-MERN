import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {loadArticles} from '../redux/actions/article'
class GetData extends Component {
  constructor(){
    super()
    this.state={
      article:[]
    }
  }
  handleClick=()=>{
    this.props.loadArticles()
  }
  render() {
    return (
      
        <div>
          
          <div className="container-fluid">
                <button onClick={this.handleClick} className="btn btn-info">Load Data</button>
                {(this.props.redux.articles.length>0)?(
                  
                  this.props.redux.articles.map((element,i)=>{
                   return( <div>
                      <p >{element._id}</p>
                      <p>{element.title===undefined?'':element.title}</p>
                      <p >Author:{element.author===undefined?'':element.author.name}</p>
                      <p >{element.description===null?'':element.description}</p>
                      <Link to={{
                        pathname:'/viewArticle',
                        state:{
                          id:element._id
                        }
                      }}> <button  className="btn btn-info">Read More</button></Link>
                    </div>)
                  })
                  
                ):''}
               { 
              }
          </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    redux:state.article
  }
}

export default connect(mapStateToProps,{loadArticles})(GetData);
