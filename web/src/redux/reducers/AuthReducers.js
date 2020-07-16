const INITIAL_STATE={
    id: '',
    username: '',
    email: '',
    role: '',
    isverified: false,
    loading: false,
    isLogin: false,
    message: ''
}


const reducers=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'LOGIN_FAIL':
            return {...state,message:action.payload,loading:false}
        case 'LOADING':
            return {...state,loading:true}
        case 'LOGIN_SUCCESS':
            return {...state,...action.payload,isLogin:true,loading:false,message:''}
        case 'LOGOUT':
            return INITIAL_STATE
        default:
            return state
    }
}

export default reducers