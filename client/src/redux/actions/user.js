import axios from 'axios'

const url = process.env.NODE_ENV === 'production' ? "/" : "http://localhost:5000/"

export function setUser (user_data) {
    let item={name:user_data.name,
        email:user_data.email,
        pass:user_data.pass,
        followers:[],
        following:[]
    }
    return (dispatch)=>{
        axios.post(`${url}user/signUp`,item).then((res)=>{
            return res.data
        }).catch((err)=>{
            console.log(err)
        })
    }
}
export function getAllUser () {
    return (dispatch)=>{
        axios.get(`${url}users`).then((res)=>{
            dispatch({type:'USERS',payload:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
}
export function setLogin (flag) {
    return (dispatch)=>{
        dispatch({type:'SET_LOGIN',payload:flag})
    }
}
export function setName (flag) {
    return (dispatch)=>{
        dispatch({type:'SET_NAME',payload:flag})
    }
}
export function setEmail (flag) {
    return (dispatch)=>{
        dispatch({type:'SET_EMAIL',payload:flag})
    }
}
export function setPass (flag) {
    return (dispatch)=>{
        dispatch({type:'SET_PASS',payload:flag})
    }
}
export function setProfile (id) {
    return (dispatch)=>{
        axios.get(`${url}user/profile/${id}`,).then((res)=>{
            let user=res.data.user
            dispatch({type:'SET_PROFILE',payload:user})
        }).catch((err)=>{
            console.log(err)
        })
    }
}

export function followUser (_id,user_id) {
    return (dispatch)=>{
        axios.post(`${url}user/follow`,{id:_id,user_id:user_id}).then((res)=>{
            dispatch({type:'FOLLOW_USER',payload:user_id})
        }).catch((err)=>{
            console.log(err)
        })
    }
}

export function signIn (temp) {
    return (dispatch)=>{
       
            if(temp.flag)
            {
                dispatch({type:'LOGIN'})
                dispatch({type:'SET_USER',payload:temp.user})
                
            }
    }
}
export function signOut () {
    return (dispatch)=>{
        dispatch({type:'LOGOUT'})
    }
}