import React, { Component } from 'react';
import {connect} from 'react-redux'
import {setUser,signIn,setLogin,setEmail,setName,setPass,getAllUser
} from '../redux/actions/user'
import PropTypes from 'prop-types'
class SignIN extends Component {
   
    componentWillMount(){
        this.props.getAllUser()
    }
    static propTypes = {
        history: PropTypes.object
    }
    
    handleClick= async (evt)=> {
    evt.preventDefault()
    let items=this.props.redux.allUsers
    
    await items.map((item)=>{
        if(item.email===this.props.redux.email&&item.pass===this.props.redux.pass)
        {
            this.props.signIn({flag:true,user:item})
            
        }
    })
    if(this.props.redux.isAuth===false)
    {
        window.alert("Wrong email or password")
        
    }
    else{
        window.alert("Logged In")
        this.props.history.push('/')
    }
  }
  
  handleClick2 =async (evt)=> {
    evt.preventDefault()
    await this.props.setUser({name:this.props.redux.name,email:this.props.redux.email,pass:this.props.redux.pass})
    window.alert('user Added')
    this.props.history.push('/')
    }
  Name =(doc)=> {
    this.props.setName(doc.target.value)
}
Email= (doc)=> {
    this.props.setEmail(doc.target.value)
}
Pass= (doc)=> {
    this.props.setPass(doc.target.value)
}
LogIN=(evt)=>{
    this.props.setLogin(false)
}
SignUp=(evt)=>{
    this.props.setLogin(true)
}
  render() {
       
    return (
      <div>
          <div>
              <button className="btn btn-info" onClick={this.LogIN}>LogIn</button>
              <button className="btn btn-info" onClick={this.SignUp}>Sign Up</button>
          </div>
          {(this.props.redux.isAuth===true)? (
              <div>
                  <p>You are already Logged In</p>
              </div>
          ):((this.props.redux.login===undefined||this.props.redux.login===false) ? (
              <div>
                  <form onSubmit={this.handleClick}>
                      <label  >Email</label>
                      <input name="email" type="text" onChange={this.Email} />
                      <label >Pass</label>
                      <input name="pass" type="password" onChange={this.Pass} />
                      <button className="btn btn-info" type="submit">LogIn</button>
                  </form>
              </div>
          ):(
            <div>
                  <form onSubmit={this.handleClick2}>
                        <label  >Name</label>
                      <input type="text" onChange={this.Name} />
                      <label  >Email</label>
                      <input name="email" type="text" onChange={this.Email} />
                      <label  >Pass</label>
                      <input name="pass" type="password" onChange={this.Pass} />
                      <button className="btn btn-info" type="submit">SignUp</button>
                  </form>
            </div>
          ))}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    redux:state.user
  }
}

export default connect(mapStateToProps,{setUser,signIn,setLogin,setEmail,setName,setPass,getAllUser
})(SignIN);
