const INITIAL_STATE={
    data: [],
    count: 0,
    requests:[],
    countrequest:0
}
    

const reducers=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'RELOAD':
            return {...state,data:action.payload,count:action.payload.length}
        case 'REQUEST':
            return {...state,requests:action.payload,countrequest:action.payload.length}
        case 'TOVERIFY':
            return {...state,...action.payload}
        default:
            return state
    }
}

export default reducers