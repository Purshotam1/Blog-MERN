let initialState={
    curr_user:{},
    allUsers:[],
    isAuth:false,
    profile:{},
    name:'',
    email:'',
    pass:'',
    login:false
}

export default (state=initialState,action)=>{
    switch(action.type){
        case 'USERS':
        {
            return {
                ...state,
                allUsers:action.payload
            }
        }
        case 'SET_USER':
        {
            return {
                ...state,
                curr_user:action.payload
            }
        }
        case 'SET_NAME':
        {
            return {
                ...state,
                name:action.payload
            }
        }
        case 'SET_EMAIL':
        {
            return {
                ...state,
                email:action.payload
            }
        }
        case 'SET_PASS':
        {
            return {
                ...state,
                pass:action.payload
            }
        }
        case 'SET_LOGIN':
        {
            return {
                ...state,
                login:action.payload
            }
        }
        case 'SET_PROFILE':
        {
            return {
                ...state,
                profile:action.payload
            }
        }
        case 'FOLLOW_USER':
        {
            let user=state.curr_user
            user.following.push(action.payload)
            return {
                ...state,
                curr_user:user
            }
        }
        case 'LOGIN':
        {
            return {
                ...state,
                isAuth:true
            }
        }
        case 'LOGOUT':
        {
            return {
                ...state,
                curr_user:{},
                isAuth:false
            }
        }
        default:
        return state
    }
}