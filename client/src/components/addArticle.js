import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addArticle
} from '../redux/actions/article'
import PropTypes from 'prop-types'

class AddArticle extends Component {
    static propTypes = {
        history: PropTypes.object
    }
    constructor(){
        super()
        this.state={
            title:'',
            description:'',
            text:'',
            author:'',
            claps:0
        }
    }
    componentWillMount(){
        if(this.props.user.isAuth===false)
        {
            this.props.history.push('/signIn')
        }
        else{
            this.setState({author:this.props.user.curr_user._id})
        }
    }
  Title= (evt)=> {
      this.setState({title:evt.target.value})
  }
  Description= (evt)=> {
    this.setState({description:evt.target.value})
}
Text= (evt)=>{
    this.setState({text:evt.target.value})
}
handleSubmit=(evt)=>{
    evt.preventDefault()
    
    this.props.addArticle(this.state)
    window.alert("Article has been added")
    document.getElementById("title").value=""
    document.getElementById("description").value=""
    document.getElementById("text").value=""
}
  render() {
    return (
      <div>
          {this.props.user.curr_user===undefined?'':
          <form onSubmit={this.handleSubmit} >
                <label >Title</label>
                <input id="title" type="text" onChange={this.Title} />
                <label >Description</label>
                <input id="description" type="text" onChange={this.Description} />
                <label >Text</label>
                <input id="text" type="text" onChange={this.Text} />
                <button className="btn btn-info">Submit</button>
          </form>
          }
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

export default connect(mapStateToProps,{addArticle
})(AddArticle);
