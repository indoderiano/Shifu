import Axios from "axios"
import { API_URL } from "../../supports/ApiUrl"

export const ReloadSchedules=(role,id)=>{
    // console.log('reloadschedules')
    if(role==='user'){
        var expand='trainer'
    }else if(role==='trainer'){
        var expand='user'
    }else{
        return {type: 'RELOAD_FAIL'}
    }
    // console.log('expand'+expand)
    
    return(dispatch)=>{
        if(role==='user'){
            Axios.get(`${API_URL}/schedules/card?userid=${id}&status=requested&status=onschedule&status=onprogress&status=finish`)
            // Axios.get(`${API_URL}/schedules?_expand=user&_expand=trainer&userId=${id}&status=requested&status=onschedule&status=onprogress&status=finish`)
            .then((res)=>{
                // console.log(res.data)
                res.data.forEach((val,index)=>{

                })
                dispatch({type: 'RELOAD', payload: res.data})
            }).catch((err)=>{
                console.log(err)
            })
        }else if(role==='trainer'){ // need to fix this, because id is userid not trainerid, we need trainerid // done
            Axios.get(`${API_URL}/schedules/card?trainerid=${id}&status=approved&status=onschedule&status=onprogress`)
            // Axios.get(`${API_URL}/schedules?_expand=user&_expand=trainer&trainerId=${id}&status=approved&status=onschedule&status=onprogress`)
            .then((res)=>{
                // console.log(res.data)
                // reverse array so , the older schedule show up first
                res.data.reverse()
                dispatch({type: 'RELOAD', payload: res.data})
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
}

export const ReloadRequests=(id)=>{ // id is userid not trainerid, we need trainerid
    
    return(dispatch)=>{
        Axios.get(`${API_URL}/schedules/card?trainerid=${id}&status=requested`)
        // Axios.get(`${API_URL}/schedules?_expand=user&trainerId=${id}&status=requested`)
        .then((res)=>{
            // console.log(res.data)
            // reverse array so , the older schedule show up first
            res.data.reverse()
            dispatch({type: 'REQUEST', payload: res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
}

export const LoadSessionsToVerify=()=>{
    return(dispatch)=>{
        Axios.get(`${API_URL}/schedules/card/?status=finish&status=complete&status=cancelled`)
        // Axios.get(`${API_URL}/schedules?_expand=trainer&_expand=user&status=finish&status=complete&status=cancelled`)
        .then((res)=>{
            console.log(res.data)
            res.data.reverse()

            //count session that needs action
            var count=res.data.length
            // res.data.forEach((val,index)=>{
            //     if(val.status==='finish'||val.status==='complete'||val.status==='cancelled'){
            //         count++
            //     }
            // })

            dispatch({type:'TOVERIFY',payload:{data:res.data,count:count}})
        }).catch((err)=>{
            console.log(err)
        })
    }
}