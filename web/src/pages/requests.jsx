import React from 'react'
import { Segment, Button, Icon, Image, Item, Label, Header, Card, Divider, Message } from 'semantic-ui-react'
import { useEffect } from 'react'
import { ReloadRequests } from '../redux/actions'
import { connect } from 'react-redux'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import ScheduleCards from './../components/scheduleCards'
import Axios from 'axios'
import Status from '../components/statusLabel'
import { API_URL } from '../supports/ApiUrl'


const Requests=(props)=>{
    const [test,settest]=useState()
    
    useEffect(()=>{
        props.ReloadRequests(props.User.id)
    },[])


    // const onUpdateStatus=(id,status)=>{
    //     Axios.patch(`${API_URL}/schedules/${id}`,{status:status})
    //     .then((res)=>{
    //         // console.log('scheduled status changed')
    //         props.ReloadRequests(props.User.id)
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // }

    // const onCancelSchedule=(id,reason)=>{
    //     Axios.get(`${API_URL}/schedules/${id}`)
    //     .then((res)=>{
    //         Axios.put(`${API_URL}/schedules/${id}`,{...res.data,status:'cancelled',reason:reason})
    //         .then((res2)=>{
    //             props.ReloadRequests(props.User.id)
    //         })
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // }

    // const renderSchedules=()=>{

    //     return props.Schedules.requests.map((val,index)=>{

    //         var role
    //         if(props.User.role==='user'){
    //             role='trainer'
    //         }else if(props.User.role==='trainer'){
    //             role='user'
    //         }

    //         return (
    //             <Card key={index} style={{textAlign:'center'}}>
    //             <Card.Content>
    //                 <Image
    //                 floated='right'
    //                 size='mini'
    //                 src={val.user.image?val.user.image:'data:image/png;base64,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'}

    //             />
    //                 <Card.Header>{val.category} session</Card.Header>
    //                 <Card.Meta>{val.user.username}</Card.Meta>
    //                 <Divider/>
    //                 <Card.Description>
    //                 Steve wants to add you to the group <strong>best friends</strong>
    //                 </Card.Description>
    //                 <Card.Description>
    //                     Message: "{val.requestMessage}"
    //                 </Card.Description>
    //             </Card.Content>
    //             {/* <Card.Content extra>
    //                 <Card.Description>
    //                 <Header style={{color:'rgba(0,0,0,.6)'}} as='h2'>{val.status}</Header>
    //                 </Card.Description>
    //             </Card.Content> */}
    //             {/* <div> */}
    //             <Card.Content style={{borderTop:'0'}}>
    //                 <Divider clearing fitted horizontal style={{fontSize:'12px', letterSpacing:'5px'}}>Status</Divider>                    
    //             </Card.Content>
    //             {/* </div> */}

    //             {/* <Divider/> */}

    //             <Card.Meta style={{padding: '0em 1em 0'}}>
    //                 <Header style={{color:'rgba(0,0,0,.6)', letterSpacing:'8px'}} as='h2'>{val.status}</Header>
    //             </Card.Meta>

    //             <Card.Meta className='child-block' style={{display:'block',padding: '.75em 1em'}}>
    //             {
    //                 val.status==='requested'?
    //                 <div className='ui two buttons'>
    //                     <Button 
    //                         className='button-sign-sec' 
    //                         primary 
    //                         // floated='right'
    //                         onClick={()=>{onUpdateStatus(val.id,'onscheduled')}}
    //                     >
    //                             Accept
    //                     </Button>
    //                     <Button 
    //                         className='button-sign-sec' 
    //                         primary 
    //                         // floated='right'
    //                         onClick={()=>{onCancelSchedule(val.id,'cannot approve request')}}
    //                     >
    //                             Cancel
    //                     </Button>
                        
    //                 </div>
    //                 :val.status==='approved'?
    //                 <div className='ui two buttons'>
    //                     <Button 
    //                         className='button-sign-sec' 
    //                         primary 
    //                         // floated='right'
    //                         onClick={()=>{onUpdateStatus(val.id,'onprogress')}}
    //                     >
    //                             Start the session
    //                     </Button>
    //                     <Button 
    //                         className='button-sign-sec' 
    //                         primary 
    //                         // floated='right'
    //                         onClick={()=>{onCancelSchedule(val.id,'client does not show up to session')}}
    //                     >
    //                             Cancel
    //                     </Button>
    //                 </div>
    //                 : val.status==='onprogress'?
    //                 <div className='ui two buttons'>
    //                     <Button 
    //                         className='button-sign-sec' 
    //                         primary 
    //                         // floated='right'
    //                         onClick={()=>{onUpdateStatus(val.id,'finish')}}
    //                     >
    //                             Finish
    //                     </Button>
    //                     <Button 
    //                         className='button-sign-sec' 
    //                         primary 
    //                         // floated='right'
    //                         onClick={()=>{onCancelSchedule(val.id,'something happened in between the session')}}
    //                     >
    //                             Cancel
    //                     </Button>
    //                 </div>
    //                 : null
    //             }
    //             </Card.Meta>

    //             </Card>


                
    //         )
    //     })
    // }

    if(props.User.role==='trainer'){
        return (
            <div className='container-custom' style={{minHeight:'45vh'}}>
                <Header
                    as='h1'
                    content='Requests for you'
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
                    content='Here, requests from users. Trainer is required to respond whether to make the session or not'
                    style={{width:'40vw', margin:'10vh auto', textAlign:'center'}}
                    // list={[
                    //     '1. Approve after the status is complete',
                    //     '2. If the status is cancelled, analyse and decide to approve or cancel the session',
                    //     ' Approve means the user will be charged and the payment will be transfered to the trainer'
                    //     ]}
                    floating
                />

                {/* <Card.Group>
                    {renderSchedules()}
                </Card.Group> */}

                <ScheduleCards 
                    // data array
                    sessions={props.Schedules.requests}
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
        Schedules: state.Schedules
    }
}

export default connect(MapstatetoProps,{ReloadRequests}) (Requests)