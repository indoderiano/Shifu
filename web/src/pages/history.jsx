import React from 'react'
import { Segment, Button, Icon, Image, Item, Label, Header, Message } from 'semantic-ui-react'
import { useEffect } from 'react'
import { ReloadSchedules } from './../redux/actions'
import ScheduleCards from './../components/scheduleCards'
import { connect } from 'react-redux'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import Status from './../components/statusLabel'
import { API_URL } from '../supports/ApiUrl'


const History=(props)=>{

    const [schedulesHistory,setschedules]=useState([])
    
    useEffect(()=>{
        // props.ReloadSchedules(props.User.role,props.User.id)
        // console.log('reload-page')

        if(props.User.role==='user'){
            // Axios.get(`${API_URL}/schedules?_expand=trainer&userId=${props.User.id}&status=finish&status=complete&status=cancelled&status=adminapproved&status=admincancelled`)
            Axios.get(`${API_URL}/schedules/card?userid=${props.User.id}&status=finish&status=complete&status=cancelled&status=adminapproved&status=admincancelled`)
            .then((res)=>{
                // console.log(res.data)
                // dispatch({type: 'RELOAD', payload: res.data})
                setschedules(res.data.reverse())
            }).catch((err)=>{
                console.log(err)
            })
        }else if(props.User.role==='trainer'){
            // Axios.get(`${API_URL}/schedules?_expand=user&trainerId=${props.User.id}&status=finish&status=complete&status=cancelled&status=adminapproved&status=admincancelled`)
            Axios.get(`${API_URL}/schedules/card?trainerid=${props.User.id}&status=finish&status=complete&status=cancelled&status=adminapproved&status=admincancelled`)
            .then((res)=>{
                console.log(res.data.reverse())
                // dispatch({type: 'RELOAD', payload: res.data})
                setschedules(res.data)
            }).catch((err)=>{
                console.log(err)
            })
        }
    },[])


    const renderSchedules=()=>{
        // console.log(schedulesHistory)
        return schedulesHistory.map((val,index)=>{

            // seperate role
            var role
            if(props.User.role==='user'){
                role='trainer'
            }else if(props.User.role==='trainer'){
                role='user'
            }

            return (
                <Segment key={index} style={{maxWidth:'800px'}}>
                    <Item.Group>
                        <Item>
                            {
                                val[role].image?
                                <Item.Image src={val[role].image} />
                                :
                                <Item.Image as={Icon} name='user' style={{fontSize:'106px', transform:'translate(0,50px)'}}/>
                            }
                            {/* <Item.Image as={Icon} name='tags' src={val[role].image} /> */}

                            <Item.Content>
                                <Item.Header as='h2'>Session {val.category}</Item.Header>
                                <Item.Description>With {props.User.role==='user'?val.trainer.username:val.user.username}</Item.Description>
                                <Item.Meta>
                                    {
                                        props.User.role==='user'?
                                        <span className='cinema'>Your message: "{val.requestMessage}"</span>
                                        :props.User.role==='trainer'?
                                        <span className='cinema'>Client's message: "{val.requestMessage}"</span>
                                        : null
                                    }
                                </Item.Meta>
                                {
                                    val.reason?
                                    <Item.Extra>
                                        Reason of {val.status}: "{val.reason}"
                                    </Item.Extra>
                                    : null
                                }
                                <Item.Extra>
                                <Label>Limited</Label>
                                </Item.Extra>
                            </Item.Content>
                            <Item.Content>
                                <div style={{textAlign:'right', marginBottom:'14px'}}>
                                    <Status status={val.status} role={props.User.role}/>
                                </div>
                                {/* {
                                    val.status==='requested'?
                                    <Button 
                                        className='bg-sign bg-sign-hvr' 
                                        primary 
                                        floated='right'
                                        onClick={()=>{onUpdateStatus(val.id,'approved')}}
                                    >
                                            Accept
                                    </Button>
                                    :val.status==='approved'?
                                    <Button 
                                        className='bg-sign bg-sign-hvr' 
                                        primary 
                                        floated='right'
                                        onClick={()=>{onUpdateStatus(val.id,'onprogress')}}
                                    >
                                            Start the session
                                    </Button>
                                    : val.status==='onprogress'?
                                    <Button 
                                        className='bg-sign bg-sign-hvr' 
                                        primary 
                                        floated='right'
                                        onClick={()=>{onUpdateStatus(val.id,'finish')}}
                                    >
                                            Finish
                                    </Button>
                                    : val.status==='finish'?
                                    <Button 
                                        className='bg-sign bg-sign-hvr' 
                                        primary 
                                        floated='right'
                                        onClick={()=>{onUpdateStatus(val.id,'complete')}}
                                    >
                                            OK
                                    </Button>
                                    : null

                                } */}

                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            )
        })
    }

    if(props.User.isLogin){
        return (
            <div className='container-custom' style={{minHeight:'45vh'}}>
                <Header
                    as='h1'
                    content='Your past activities'
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
                    content='All sessions that you have done in the past'
                    style={{width:'40vw', margin:'10vh auto', textAlign:'center'}}
                    floating
                />
                
                {/* {renderSchedules()} */}

                
                <ScheduleCards 
                    // data array
                    sessions={schedulesHistory}
                    // callback to its parent
                    // reloadParentSessions={this.reloadSessions}
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

export default connect(MapstatetoProps,{ReloadSchedules}) (History)