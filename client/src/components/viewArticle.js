import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {setArticle,clapArticle,commentArticle,loadArticles
    ,setText
} from '../redux/actions/article'
import PropTypes from 'prop-types'

class ViewArticle extends Component {
  static propTypes = {
    history: PropTypes.object
}
  componentWillMount(){
      const id=this.props.location.state.id
      
      let items=this.props.redux.articles
      for(var i=0;i<items.length;i++)
      {
        if(items[i]._id===id)
        {
          this.props.setArticle(items[i])
        }
      }
  }

  clap =()=> {
    if(this.props.user.isAuth===false)
    {
      this.props.history.push('/signIn')
    }
    else
    {      this.props.clapArticle(this.props.location.state.id)}
  }
  handleSubmit =async (evt)=> {
    evt.preventDefault()
    if(this.props.user.isAuth)
    {
        await this.props.commentArticle(this.props.location.state.id,
        this.props.user.curr_user._id,this.props.redux.text)
        this.props.loadArticles()
    }
    else{
      this.props.history.push('/signIn')
    }
  }
  text =(data)=> {
      this.props.setText(data.target.value)
  }
  render() {
      const article=this.props.redux.curr_article
    return (
      <div>
          <div className="container-fluid">
            <h3>{article.title}</h3>
            <p>{article.text}</p>
            <h5>Likes:{article.claps}</h5>
            <button className="btn btn-info" onClick={this.clap}>Like</button>
          </div>
          <div className="container-fluid">
            {article.author===undefined?'':(<h6><p>Author:</p><p><Link to={{
                pathname:'/profile',
                state:{
                    id:article.author._id
                }
            }}>{article.author.name}</Link></p></h6>)}
          </div>

          <div className="container-fluid">
            <div>
                <form method="post" onSubmit={this.handleSubmit}>
                    <label >Comment</label>
                    <input type="text" name="comment" onChange={this.text} />
                    <button type="submit" className="btn btn-info">Comment</button>
                </form>
            </div>
            <div>
            {article.comments?(article.comments.length ? (
                article.comments.map(function(element){
                  return(<div>
                    <p>{element.text}</p>
                    <h5 ><p>Author:<Link to={{
                      pathname:'/profile',
                      state:{
                        id:element.author._id
                      }
                    }}>{element.author.name}</Link></p></h5>
                  </div>)
                })
              ):''):''}
            </div>
          </div>
          <div>
            {(this.props.user.curr_user&&article&&article.author)?
            ((this.props.user.curr_user._id===article.author._id)?(
              <div>
                <button className="btn btn-info"><Link to={{
                  pathname:'/edit'
                }}>Edit</Link></button>
              </div>
            ):''):''}
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

export default connect(mapStateToProps,{setArticle,clapArticle,commentArticle,loadArticles
,setText
})(ViewArticle);
