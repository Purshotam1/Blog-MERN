import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {setProfile,followUser,signOut,getAllUser
} from '../redux/actions/user'
import PropTypes from 'prop-types'
class Profile extends Component {
    static propTypes = {
        history: PropTypes.object
    }
  componentWillMount(){
      this.props.getAllUser()
      this.props.setProfile(this.props.location.state.id)
  }
  componentWillReceiveProps(nextProps){
      if(nextProps.location.state.id!=this.props.location.state.id)
      {
        this.props.setProfile(nextProps.location.state.id)
      }
  }
  handleClick= ()=> {
      this.props.followUser(this.props.redux.curr_user._id,this.props.location.state.id)
  }
  handle=()=>{
      this.props.signOut()
      this.props.history.push('/')
  }
 
  render() {
      let profile=this.props.redux.profile
      let items=this.props.redux.allUsers
    return (
      profile?(<div>
          <div>
              <h1>{this.props.location.state.id}</h1>
              <h1>{profile.name}</h1>
              <h5>{profile.email}</h5>
          </div>
          <div>
              <h3>Followers</h3>
              {profile.followers?(profile.followers.length===0? '':(
                  profile.followers.map(function(element){
                    return (<h5><Link to={{
                        pathname:"/profile",
                        state:{
                            id:element
                        }
                    }}>{items.map(function(user){
                        if(element===user._id)
                        {
                            return user.name
                        }
                    })}</Link></h5>)  
                  })
              )):''}
          </div>
          <div>
              <h3>Following</h3>
              {profile.following?(profile.following.length? (
                  profile.following.map(function(element){
                    return (<h5><Link to={{
                        pathname:"/profile",
                        state:{
                            id:element
                        }
                    }}>{items.map(function(user){
                        if(element===user._id)
                        {
                            return user.name
                        }
                    })}</Link></h5>)  
                  })
              ):''):''}
          </div>
          {(this.props.redux.isAuth===true&&this.props.redux.curr_user._id!==profile._id)? (
              <div>
                  {(((this.props.redux.curr_user.followers))&&this.props.redux.curr_user.following.indexOf(profile._id))===-1? (
                      <div>
                          <button className="btn btn-info" onClick={this.handleClick}>Follow</button>
                      </div>
                  ):(
                    <div>
                        <h4>Followed</h4>
                    </div>
                  )}
              </div>
          ):''}
           { (this.props.redux.isAuth===true
           &&profile
           &&this.props.redux.curr_user._id===profile._id)? (
               <div>
                   <button className="btn btn-info" onClick={this.handle}>Log Out</button>
               </div>
           )
               :''
           }
          </div>):''
    );
  }
}

function mapStateToProps(state){
  return {
    redux:state.user,
    article:state.article
  }
}

export default connect(mapStateToProps,{setProfile,followUser,signOut,getAllUser
})(Profile);
