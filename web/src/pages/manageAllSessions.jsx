import React, { Component } from 'react'
import { Button, Card, Image, Header, Message, Label, Divider, Form, TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux';
// import {LoadSessionsToVerify} from './../redux/actions'
import { Redirect } from 'react-router-dom'
import ScheduleCards from '../components/scheduleCards'
import Axios from 'axios'
import {API_URL} from './../supports/ApiUrl'


class ManageAllSessions extends Component {
    state = { 
        allSessions:[],
        indexcancel:-1,
        indexconfirm:-1
     }

    componentDidMount=()=>{
        this.reloadSessions()
    }
    
    reloadSessions=()=>{
        // Axios.get(`${API_URL}/schedules?_expand=trainer&_expand=user`)
        Axios.get(`${API_URL}/schedules/card`)
        .then((res)=>{
            this.setState({allSessions:res.data.reverse(),indexcancel:-1,indexconfirm:-1,reason:''})
        }).catch((err)=>{
            console.log(err)
        })
    }


    render() { 

        if(this.props.User.role==='admin'){

            return ( 
                <div className='container-custom' style={{textAlign: 'center'}}>
                    <Header
                        as='h1'
                        content='Manage sessions'
                        // inverted
                        style={{
                            fontSize: '4em',
                            fontWeight: 'normal',
                            margin: '10vh 0 6vh',
                        }}
                    />

                    <Message
                        // onDismiss={this.handleDismiss}
                        // header='Here, Admin will verify which session to be approved or not'
                        content='Here, Admin is able to edit the status reports, in case changes need to be made. '
                        style={{width:'40vw', margin:'10vh auto', textAlign:'center'}}
                        // list={[
                        //     '1. Approve after the status is complete',
                        //     '2. If the status is cancelled, analyse and decide to approve or cancel the session',
                        //     ' Approve means the user will be charged and the payment will be transfered to the trainer'
                        //   ]}
                        floating
                    />

                    <ScheduleCards 
                        // data array
                        sessions={this.state.allSessions}
                        // callback to its parent
                        reloadParentSessions={this.reloadSessions}
                    />

                
                </div>
            );
        
        } else {
             return <Redirect to='/'/>
        }
    }
}

const MapstatetoProps=(state)=>{
    return{
        User: state.Auth
    }
}
 
export default connect(MapstatetoProps) (ManageAllSessions);