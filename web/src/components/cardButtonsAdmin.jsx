import React, {useState} from 'react'
import { Card, Header , Button, Form, TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { LoadSessionsToVerify } from './../redux/actions'
import Axios from 'axios'
import {API_URL} from './../supports/ApiUrl'




const AdminButtons=(props)=>{
    const[reason,setreason]=useState('')

    const onUpdateStatus=(id,status)=>{

        Axios.put(`${API_URL}/schedules/status/${id}`,{
            laststatus:status,
            updatedby:'admin',
            status:'adminapproved'
        }).then((res)=>{
            // redux
            props.LoadSessionsToVerify()
                
            //update data in grand parent page
            props.reloadGrandParentSessions()

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
        //         updatedby:'admin',
        //         status:status
        //     })
        //     .then((res2)=>{
        //         // redux
        //         props.LoadSessionsToVerify()
                
        //         //update data in grand parent page
        //         props.reloadGrandParentSessions()
    
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
            laststatus:status,
            updatedby:'admin',
            status:'admincancelled',
            reason:reason
        }).then((res)=>{
            // redux
            props.LoadSessionsToVerify()
            // this.setState({indexcancel:-1})

            //update data in parent page
            props.reloadGrandParentSessions()

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
        //         updatedby:'admin',
        //         status:'admincancelled',
        //         reason:reason
        //     })
        //     .then((res2)=>{
        //         // redux
        //         props.LoadSessionsToVerify()
        //         // this.setState({indexcancel:-1})

        //         //update data in parent page
        //         props.reloadGrandParentSessions()

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
            {/* <Card.Description>testt</Card.Description> */}
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
                        props.session.id===0?
                        null
                        :
                        <Button 
                            className='button-sign-sec' 
                            onClick={()=>{
                                props.setindexconfirm(props.index)
                                props.setindexcancel(-1)
                            }}
                            disabled={props.session.status==='adminapproved'||props.session.status==='admincancelled'}
                        >
                            {
                                props.session.status==='cancelled'?
                                'Proceed payment'
                                : 'Approve'
                            }
                        </Button>
                    }
                    {
                        props.cancel?
                        <Button
                            className='button-sign-third' 
                            onClick={()=>{onCancelSchedule(props.session.id,reason,props.session.status)}}
                        >
                            Submit
                        </Button>
                        :
                        <Button
                            className='button-sign-third' 
                            onClick={()=>{
                                props.setindexcancel(props.index)
                                props.setindexconfirm(-1)
                                setreason('')
                            }}
                            disabled={props.session.status==='adminapproved'||props.session.status==='admincancelled'}
                        >
                            {
                                props.session.status==='cancelled'?
                                'Cancel'
                                : 'Decline'
                            }
                        </Button>
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

        </Card.Meta>
    )
}

const MapstatetoProps=(state)=>{
    return {
        User: state.Auth
    }
}

export default connect (MapstatetoProps,{LoadSessionsToVerify}) (AdminButtons)