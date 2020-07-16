import React, { useEffect, useState, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Switch, Route } from 'react-router-dom'
import Header from './components/header'
import Register from './pages/register'
import Verification from './pages/verification'
import Settings from './pages/settings'
import Home from './pages/home'
import Session from './pages/sessions'
import Requests from './pages/requests'
import Schedules from './pages/schedules'
import ManageSessions from './pages/manageSessions'
import ManageAllSessions from './pages/manageAllSessions'
import History from './pages/history'
import Profile from './pages/profile'
import Footer from './components/footer'
import Axios from 'axios';
import { API_URL } from './supports/ApiUrl';
import { KeepLogin, ReloadSchedules, ReloadRequests, LoadSessionsToVerify } from './redux/actions'
import { connect } from 'react-redux';


function App(props) {

  const [loading,setloading]=useState(true)

  useEffect(()=>{
    const tokenid=localStorage.getItem('e-trainer_token')
    
    if(tokenid){
      var auth={
        headers:{
          'Authorization':`Bearer ${tokenid}`
        }
      }
      console.log('keeplogin')
      Axios.get(`${API_URL}/users/keeplogin`,auth)
      .then((res)=>{
        if(res.data.status){
          const {id,username,email,role,isverified,token}=res.data.user
          // console.log('keeplogin')
          // console.log(res.data.user)
          props.KeepLogin(id,username,email,role,isverified,token)

          if(role==='user'||role==='trainer'){
            props.ReloadSchedules(role,id)
            if(role==='trainer'){
              props.ReloadRequests(id)
            }
          }else if(role==='admin'){
            // console.log('test')
            props.LoadSessionsToVerify()
          }
        }else{
          console.log('keeplogin tidak berhasil')
        }
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>{
        setloading(false)
      })

        // Axios.get(`${API_URL}/${role}s/${id}`)
        // .then((res)=>{
        //     if(res){
        //       props.KeepLogin(id,res.data.username,res.data.role)
        //       console.log(role)
              
        //       if(role==='user'||role==='trainer'){
        //         props.ReloadSchedules(res.data.role,id)
        //         if(role==='trainer'){
        //           props.ReloadRequests(id)
        //         }
        //       }else if(role==='admin'){
        //         console.log('test')
        //         props.LoadSessionsToVerify()
        //       }

        //     }else{
        //       console.log('jangan kesini')
        //     }
        // }).catch((err)=>{
        //   console.log(err)
        // }).finally(()=>{
        //   setloading(false)
        // })
    }else{
      setloading(false)
    }

    // redux schedule here

  },[])


  return (
    <div>
      <Header/>
      {
        loading?
        <div 
          style={{minHeight:'45vh', transition: 'all .5s ease'}}
        >
          Loading...
        </div>
        :
        <div style={{minHeight:'45vh', transition: 'all .5s ease'}}>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/register' exact component={Register}/>
            <Route path='/verification/:tokenid' exact component={Verification}/>
            <Route path='/verification*' component={Verification}/>

            {
              props.User.isverified?
              <Fragment>
                <Route path='/manageall' exact component={ManageAllSessions}/>
                <Route path='/manage' exact component={ManageSessions}/>
                <Route path='/requests' exact component={Requests}/>
                <Route path='/schedules' exact component={Schedules}/>
                <Route path='/history' exact component={History}/>
                <Route path='/sessions' exact component={Session}/>
                <Route path='/profile/:trainerid' exact component={Profile}/>
                <Route path='/settings' exact component={Settings}/>
              </Fragment>
              :props.User.isLogin?
              <Fragment>
                {/* <Route path='/verification' component={Verification}/> */}
                {/* <Route path='/verification/:tokenid' exact component={Verification}/> */}
                <Route path='/*' exact component={Verification}/>
              </Fragment>
              :
              <Route path='/*' component={Home}/>
            }
          </Switch>
        </div>
      }
      <Footer/>
    </div>
  )

  // if(loading){
  //   return <div>Loading...</div>
  // }else{
  //   return (
  //     <div>
  //       <Header/>
  //       <Switch>
  //         <Route path='/' exact component={Home}/>
  //         <Route path='/register' exact component={Register}/>
  //         <Route path='/sessions' exact component={Session}/>
  //         <Route path='/requests' exact component={Request}/>
  //         <Route path='/schedules' exact component={Schedules}/>
  //       </Switch>
  //       <Footer/>
        
  //     </div>
  //   );

  // }

}

const MapstatetoProps=(state)=>{
  return {
    User: state.Auth
  }
}

export default connect(MapstatetoProps,{KeepLogin,ReloadSchedules,ReloadRequests,LoadSessionsToVerify})(App);




// MAIN PROBLEM IS 
// ON PAGE SCHEDULE, AFTER LOGIN, THE PAGE IS SUPPOSED TO LOAD THE SCHEDULES LIST
// BUT IS UNABLE TO DO THAT, BECAUSE AFTER LOGIN IS FINISHED, 
// THERE IS NO TRIGGER TO RELOAD THE SCHEDULES LIST
// SOLUTION
// CHANGE THE REDUX USER TO NOT USING THUNK
// BETTER SOLUTION
// FOUND A WAY TO TRIGGER ACTION AFTER LOGIN
// INSIDE DISPATCH, PUT CALLBACK ACTION TO RELOAD SCHEDULES

