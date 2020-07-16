import React from 'react'
import { Segment, Button, Icon, Image, Item, Label, Header, Message } from 'semantic-ui-react'
import { useEffect } from 'react'
import { ReloadSchedules } from './../redux/actions'
import ScheduleCards from '../components/scheduleCards'
import { connect } from 'react-redux'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import Status from './../components/statusLabel'
import { API_URL } from '../supports/ApiUrl'


const Schedules=(props)=>{
    const [test,settest]=useState()
    const [indexconfirm,setindexconfirm]=useState(-1)
    const [indexcancel,setindexcancel]=useState(-1)
    
    useEffect(()=>{
        // console.log(props.User)
        props.ReloadSchedules(props.User.role,props.User.id)
        // console.log(props.SchedulesList)
    },[])

    const reloadSessions=()=>{

    }


    if(props.User.role==='user'||props.User.role==='trainer'){
        return (
            <div className='container-custom' style={{minHeight:'45vh',textAlign:'center'}}>
                <Header
                    as='h1'
                    content='Your schedules'
                    // inverted
                    style={{
                        fontSize: '4em',
                        fontWeight: 'normal',
                        margin: '10vh 0 6vh',
                    }}
                />

                <Message
                    // onDismiss={this.handleDismiss}
                    // header='Welcome user!'
                    content='All schedules that has been set up for you. User and trainer are required to prepare for the sessions'
                    style={{width:'40vw', margin:'10vh auto'}}
                    floating
                />

                <ScheduleCards 
                    // data array
                    sessions={props.SchedulesList.data}
                    // callback to its parent
                    // reloadParentSessions={reloadSessions} // in react component function, this must be declared
                />
                
    
            </div>
        )
    }else{
        return <Redirect to='/'/>
    }
}

const MapstatetoProps=(state)=>{
    return {
        User: state.Auth,
        SchedulesList: state.Schedules
    }
}

export default connect(MapstatetoProps,{ReloadSchedules}) (Schedules)