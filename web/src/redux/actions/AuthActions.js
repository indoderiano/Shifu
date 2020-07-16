import Axios from 'axios'
import {API_URL} from './../../supports/ApiUrl'
import { ReloadSchedules, LoadSessionsToVerify, ReloadRequests } from './SchedulesActions'


export const Login=(username,password)=>{
    return (dispatch)=>{
        dispatch({type:'LOADING'})
        if(username===''){
            dispatch({type: 'LOGIN_FAIL',payload:'Username belum diisi'})
        }else if(password===''){
            dispatch({type:'LOGIN_FAIL',payload:'Password belum diisi'})
        }else{

            Axios.get(`${API_URL}/users/login/${username}/${password}`)
            .then((res)=>{
                if(res.data.status){
                    const {id,username,email,role,isverified,token}=res.data.user
                    dispatch({
                        type:'LOGIN_SUCCESS',
                        payload:{
                            id,
                            username,
                            email,
                            role,
                            isverified
                        }
                    })
                    localStorage.setItem('e-trainer_token',token)
                    if(role==='user'){
                        dispatch(ReloadSchedules(role,id))
                    }else if(role==='trainer'){
                        dispatch(ReloadSchedules(role,id))
                        dispatch(ReloadRequests(id))
                    }else if(role==='admin'){
                        dispatch(LoadSessionsToVerify())
                    }
                }else{
                    dispatch({type:'LOGIN_FAIL',payload:res.data.message})
                }
            }).catch((err)=>{
                console.log(err)
            })

            
            // Axios.get(`${API_URL}/users?username=${username}&&password=${password}`)
            // .then((res)=>{
            //     if(res.data.length){
            //         dispatch({
            //             type:'LOGIN_SUCCESS',
            //             payload:{
            //                 id: res.data[0].id,
            //                 username:username,
            //                 // password:password,
            //                 role:res.data[0].role
            //             }
            //         })
            //         dispatch(ReloadSchedules(res.data[0].role,res.data[0].id))
            //         localStorage.setItem('iduser',res.data[0].id)
            //         localStorage.setItem('roleuser',res.data[0].role)
            //     }else{
            //         // now try search for trainers
            //         Axios.get(`${API_URL}/trainers?username=${username}&&password=${password}`)
            //         .then((res)=>{
            //             if(res.data.length){
            //                 dispatch({
            //                     type:'LOGIN_SUCCESS',
            //                     payload:{
            //                         id: res.data[0].id,
            //                         username:username,
            //                         // password:password,
            //                         role:res.data[0].role
            //                     }
            //                 })
            //                 console.log(res.data[0].role+res.data[0].id)
            //                 // after login, reload data pull from backend
            //                 dispatch(ReloadSchedules(res.data[0].role,res.data[0].id))
            //                 dispatch(ReloadRequests(res.data[0].id))


            //                 localStorage.setItem('iduser',res.data[0].id)
            //                 localStorage.setItem('roleuser',res.data[0].role)
            //             }else{
            //                 // now try search for admin
            //                 Axios.get(`${API_URL}/admins?username=${username}&&password=${password}`)
            //                 .then((res)=>{
            //                     if(res.data.length){
            //                         dispatch({
            //                             type:'LOGIN_SUCCESS',
            //                             payload:{
            //                                 id: res.data[0].id,
            //                                 username:username,
            //                                 // password:password,
            //                                 role:res.data[0].role
            //                             }
            //                         })
            //                         console.log(res.data[0].role+res.data[0].id)
            //                         dispatch(LoadSessionsToVerify())
            //                         localStorage.setItem('iduser',res.data[0].id)
            //                         localStorage.setItem('roleuser',res.data[0].role)
            //                     }else{
            //                         // after all username not found
            //                         dispatch({type:'LOGIN_FAIL',payload:'Username atau password salah'})
            //                     }
            //                 }).catch((err)=>{
            //                     console.log(err)
            //                 })
            //             }
            //         }).catch((err)=>{
            //             console.log(err)
            //         })
            //     }
            // }).catch((err)=>{
            //     console.log(err)
            // })
        }
    }
}

export const KeepLogin=(id, username, email, role, isverified, token)=>{
    console.log('action keeplogin')
    localStorage.setItem('e-trainer_token',token)
    return {
        type: 'LOGIN_SUCCESS',
        payload:{
            id: id,
            username: username,
            email: email,
            role: role,
            isverified: isverified
        }
    }
}

export const Logout=()=>{
    localStorage.removeItem('e-trainer_token')
    return {
        type: 'LOGOUT'
    }
}