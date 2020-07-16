import React, {useState} from 'react'
import { Card, Header , Button, Form, TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { ReloadSchedules,ReloadRequests } from './../redux/actions'
import Axios from 'axios'
import {API_URL} from './../supports/ApiUrl'




const TrainerButtons=(props)=>{
    const[reason,setreason]=useState('')

    const onUpdateStatus=(id,status)=>{
        
        var newstatus
        switch(status){
            case 'requested':
                newstatus='onschedule'
                break;
            case 'approved':
                newstatus='onprogress'
                break;
            case 'onschedule':
                newstatus='onprogress'
                break;
            case 'onprogress':
                newstatus='finish'
                break;
            default:
                newstatus='finish'
                break;
        }

        Axios.put(`${API_URL}/schedules/status/${id}`,{
            laststatus:status,
            updatedby:'trainer',
            status:newstatus
        }).then((res)=>{
            // redux trainer
            props.ReloadSchedules(props.User.role,props.User.id)
            props.ReloadRequests(props.User.id)

            // set parent state to default
            props.setindexconfirm(-1)
        }).catch((err)=>{
            console.log(err)
        })

        // Axios.get(`${API_URL}/schedules/${id}`)
        // .then((res)=>{
        //     Axios.put(`${API_URL}/schedules/${id}`,{
        //         ...res.data,
        //         laststatus:res.data.status,
        //         updatedby:'trainer',
        //         status:newstatus
        //     })
        //     .then((res2)=>{
        //         // redux trainer
        //         props.ReloadSchedules(props.User.role,props.User.id)
        //         props.ReloadRequests(props.User.id)

    
        //         // set parent state to default
        //         props.setindexconfirm(-1)
    
        //     }).catch((err)=>{
        //         console.log(err)
        //     })

        // }).catch((err)=>{
        //     console.log(err)
        // })
    }

    const onCancelSchedule=(id,reason,status)=>{

        Axios.put(`${API_URL}/schedules/status/${id}`,{
            laststatus: status,
            updatedby:'trainer',
            status:'cancelled',
            reason:reason
        }).then((res)=>{
            // redux trainer
            props.ReloadSchedules(props.User.role,props.User.id)
            props.ReloadRequests(props.User.id)

            // set state to default
            props.setindexcancel(-1)
        }).catch((err)=>{
            console.log(err)
        })


        // Axios.get(`${API_URL}/schedules/${id}`)
        // .then((res)=>{
        //     Axios.put(`${API_URL}/schedules/${id}`,{
        //         ...res.data,
        //         laststatus: res.data.status,
        //         updatedby:'trainer',
        //         status:'cancelled',
        //         reason:reason
        //     })
        //     .then((res2)=>{
        //         // redux trainer
        //         props.ReloadSchedules(props.User.role,props.User.id)
        //         props.ReloadRequests(props.User.id)

        //         // set state to default
        //         props.setindexcancel(-1)
        //     })
        // }).catch((err)=>{
        //     console.log(err)
        // })
    }

    return (
        <Card.Meta style={{padding: '0'}}>
            {/* <Header style={{color:'rgba(0,0,0,.6)', letterSpacing:'6px', margin:'0 0 .5em'}} as='h2'>{props.session.status}</Header> */}
            
            {
                // props.session.status!=='finish'&&props.session.status!=='complete'&&props.session.status!=='cancelled'&&props.session.status!=='adminapproved'&&props.session.status!=='admincancelled'?
                props.session.status==='requested'||props.session.status==='onschedule'||props.session.status==='approved'||props.session.status==='onprogress'?
                <div>
                
                    <div 
                        className={
                            props.confirm?
                            'ui two buttons confirm-el'
                            :
                            'ui two buttons confirm-el cover'
                        }
                    >
                    <Button 
                        className='button-sign-sec' 
                        onClick={()=>{onUpdateStatus(props.session.id,props.session.status)}} 
                    >
                        Yes
                    </Button>
                    <Button
                        className='button-sign-third' 
                        onClick={()=>{props.setindexconfirm(-1)}}
                    >
                        No
                    </Button>
                    </div>
                    
                    <div 
                        className={
                            props.confirm?
                            'ui two buttons approve-el cover'
                            :
                            'ui two buttons approve-el'
                        }
                    >
                    {
                        props.session.status!=='finish'?
                        <Button 
                            className='button-sign-sec' 
                            onClick={()=>{
                                props.setindexconfirm(props.index)
                                props.setindexcancel(-1)
                            }}
                            disabled={props.session.status==='adminapproved'||props.session.status==='admincancelled'}
                        >
                            {
                                props.session.status==='requested'?
                                'Accept'
                                :props.session.status==='onschedule'||props.session.status==='approved'?
                                'Start the session'
                                :props.session.status==='onprogress'?
                                'Finish'
                                : 'Approve'
                            }
                        </Button>
                        : null
                    }
                    {   
                        props.cancel?
                        <Button
                            className='button-sign-third' 
                            onClick={()=>{onCancelSchedule(props.session.id,reason,props.session.status)}}
                        >
                            Submit
                        </Button>
                        :props.session.status==='requested'||props.session.status==='approved'||props.session.status==='onschedule'||props.session.status==='onprogress'?
                        <Button
                            className='button-sign-third' 
                            onClick={()=>{
                                props.setindexcancel(props.index)
                                props.setindexconfirm(-1)
                                setreason('')
                            }}
                            disabled={props.session.status==='adminapproved'||props.session.status==='admincancelled'}
                        >
                            Cancel
                        </Button>
                        : null
                    }
                    </div>

                    <div 
                        className={
                            props.cancel?
                            'cancel-el'
                            :
                            'cancel-el cover'
                        }
                        style={{margin:'0 0', textAlign:'left'}}
                    >
                        <Form style={{marginTop:'1em'}}>
                            <span className='color-sign-dark'>State your reason</span>
                            <TextArea value={reason} onChange={(e)=>{setreason(e.target.value)}} placeholder='Tell us more' />
                        </Form>
                    </div>


                </div>
                : null
            }

        </Card.Meta>
    )
}

const MatstatetoProps=(state)=>{
    return {
        User: state.Auth
    }
}

export default connect (MatstatetoProps,{ReloadSchedules,ReloadRequests}) (TrainerButtons)