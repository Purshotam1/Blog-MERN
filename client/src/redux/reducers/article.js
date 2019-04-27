
let initialState={
    curr_article:{},
    articles:[],
    text:''
}

export default (state=initialState,action)=>{
    switch(action.type){
        case 'ARTICLES':
        {
            return {
                ...state,
                articles:action.payload
            }
        }
        case 'SET_TEXT':
        {
            return {
                ...state,
                text:action.payload
            }
        }
        case 'SET_ID':
        {
            return {
                ...state,
                author_id:action.payload
            }
        }
        case 'SET_ARTICLE':
        {
            return {
                ...state,
                curr_article:action.payload
            }
        }
        case 'ADD_ARTICLE':
        {
            if(state.loaded_articles===undefined)
            {
                return {
                    ...state,
                    loaded_articles:[action.payload]
                }
            }
            else return {
                ...state,
                loaded_articles:[...state.loaded_articles,action.payload]
            }
        }
        case 'CLAP_ARTICLE':
        {
            let article=state.curr_article
            article.claps++
            return {
                ...state,
                curr_article:article
            }
        }
        case 'COMMENT_ARTICLE':
        {
            let article=state.curr_article
            if(article.comments)
            {
                article.comments.push(action.payload)
            }
            else article.comments=[action.payload]
            return {
                ...state,
                curr_article:article
            }
        }
        default:
        return state
    }
}