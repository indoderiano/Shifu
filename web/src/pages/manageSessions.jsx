import React, { Component } from 'react'
import { Button, Card, Image, Header, Message, Label, Divider, Form, TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux';
// import {LoadSessionsToVerify} from './../redux/actions'
import ScheduleCards from '../components/scheduleCards'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import {API_URL} from './../supports/ApiUrl'


class ManageSessions extends Component {
    state = { 
        indexcancel:-1,
        indexconfirm:-1
     }

    componentDidMount=()=>{
    }

    // inputChange=(e)=>{
    //     this.setState({reason: e.target.value})
    // }

    // onDefaultState=()=>{
    //     this.setState({indexcancel:-1,indexconfirm:-1,reason:''})
    // }

    // onCancelClick=(index)=>{
    //     this.setState({indexcancel:index, reason:'',indexconfirm:-1})
    // }


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
                        header='Here, Admin will verify which session to be approved or not'
                        // content='Here, Admin will verify which session to be approved or not'
                        style={{width:'40vw', margin:'10vh auto', textAlign:'center'}}
                        list={[
                            '1. Approve after the status is complete',
                            '2. If the status is cancelled, analyse and decide to approve or cancel the session',
                            ' Approve means the user will be charged and the payment will be transfered to the trainer'
                          ]}
                        floating
                    />

                    <ScheduleCards
                        // data array
                        sessions={this.props.SessionsAdminToDo.data}
                        // callback to its parent
                        reloadParentSessions={()=>{console.log('tes')}}
                        test={this.nothing} //testing //no collapes
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
        User: state.Auth,
        SessionsAdminToDo:state.Schedules
    }
}
 
export default connect(MapstatetoProps) (ManageSessions);