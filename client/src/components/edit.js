import React, { Component } from 'react';
import {connect} from 'react-redux'
import {updateArticle} from '../redux/actions/article'
import PropTypes from 'prop-types'

class Edit extends Component {
  constructor(){
    super()
    this.state={
      title:null,
      description:null,
      text:null,
      id:null
    }
  }
  static propTypes = {
    history: PropTypes.object
    }
  async componentWillMount(){
      
        await this.props.user.isAuth?null:(this.props.history.push('/signIN'))
        let promise=new Promise((resolve,reject)=>{
            let item=this.props.redux.curr_article    
            if(item.author._id===this.props.user.curr_user._id)
                    {
                        resolve(item)
                    }
                    else
                    {
                        window.alert("Only author can edit")
                        this.props.history.push('/getData')
                        reject()
                    }
               
            
        })
        Promise.all([promise]).then((article)=>{
            this.setState({title:article[0].title,description:article[0].description,text:article[0].text,id:article[0]._id})
            
        })
        
  }
  handleClick=async (evt)=>{
      evt.preventDefault()
      await this.props.updateArticle(this.state)
      window.alert("Article Updated")
      this.props.history.push('/')
  }
  render() {
      let article=this.state
      
    return (
    <div>
         <form onSubmit={this.handleClick}>
            <label>Title</label>
            <input placeholder={article.title} id="title" type="text" onChange={(evt)=>{this.setState({title:evt.target.value})}} />
            <label>Description</label>
            <input id="description" type="text" onChange={(evt)=>{this.setState({description:evt.target.value})}} />
            <label>Text</label>
            <input id="text" type="text" onChange={(evt)=>{this.setState({text:evt.target.value})}} />
            <button type="submit" className="btn btn-info">Update</button>
         </form>
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

export default connect(mapStateToProps,{updateArticle})(Edit);
