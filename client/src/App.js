import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {loadArticles} from './redux/actions/article'
class App extends Component {
  render() {
    return (
      <div>
        <div>
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                
              </div>
              <ul className="nav navbar-nav">
                <li><Link to="/">News</Link></li>
                <li><Link to="/getData" >All Articles</Link></li>
                <li><Link to="/addArticle" >Add Article</Link></li>
                {(this.props.user.isAuth===false)?(
                    ''
                ):(
                  <li><Link to={{
                    pathname:"/profile",
                    state:{
                      id:this.props.user.curr_user._id
                    }
                  }} >Profile</Link></li>
                )}
                <li><Link to="/signIn">Sign In/Sign Up</Link></li>
              </ul>
            </div>
          </nav>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    redux:state.article,
    user:state.user
  }
}

export default connect(mapStateToProps,{loadArticles})(App);
