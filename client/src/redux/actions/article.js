import axios from 'axios'

const url = process.env.NODE_ENV === 'production' ? "/" : "http://localhost:5000/"

export function loadArticles () {
    return (dispatch)=>{
        axios.get(`${url}articles`).then((res)=>{
            let articles=res.data
            dispatch({type:'ARTICLES',payload:articles})
        }).catch((err)=>{
            console.log(err)
        })
    }
}
export function setArticle (obj) {
    return (dispatch)=>{
        
            dispatch({type:'SET_ARTICLE',payload:obj})
        
    }
}
export function addArticle (doc) {
    return (dispatch)=>{
        axios.post(`${url}article`,doc).then((res)=>{
            return res.data
        }).catch((err)=>{
            console.log(err)
        })
    }
}
export function clapArticle (id) {
    return (dispatch)=>{
        axios.post(`${url}article/clap`,{id}).then((res)=>{
            dispatch({type:'CLAP_ARTICLE'})
        }).catch((err)=>{
            console.log(err)
        })
    }
}

export function commentArticle (id,author_id,comment) {
    return (dispatch)=>{
        axios.post(`${url}article/comment`,{id,author_id,comment}).then((res)=>{
            dispatch({type:'COMMENT_ARTICLE',payload:{author:author_id,text:comment}})
        })
    }
}
export function updateArticle (data) {
    return (dispatch)=>{
        let {title,description,text,id}=data
        axios.put(`${url}article/update/${id}`,{title,description,text}).then((res)=>{
            dispatch({type:'SET_ARTICLE',payload:res.data})
        })
    }
}
export function setText (text) {
    return (dispatch)=>{
        dispatch({type:'SET_TEXT',payload:text})
    }
}
export function setId (id) {
    return (dispatch)=>{
        dispatch({type:'SET_ID',payload:id})
    }
}