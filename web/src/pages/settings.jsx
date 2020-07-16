import React, {useEffect, useState} from 'react'
import { Segment, Button, Form, Label, Item, Header, Image, Icon} from 'semantic-ui-react'
import Axios from 'axios'
import {API_URL} from './../supports/ApiUrl'
import {Login} from './../redux/actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


const Settings=(props)=>{
    const [input,setinput]=useState({
        oldpassword: '',
        newpassword: '',
        confirm: ''
    })
    const [message,setmessage]=useState('')
    const [succeed,setsucceed]=useState(false)

    useEffect(()=>{


    },[])

    const handleInput=(e)=>{
        setinput({...input,[e.target.name]:e.target.value})
    }

    const onUpdate=()=>{

        if(input.oldpassword===''){
            setmessage('old password belum diisi')
        }else if(input.newpassword===''){
            setmessage('new password belum diisi')
        }else if(input.confirm!==input.newpassword){
            setmessage('confirm password tidak sama')
        }else if(input.newpassword===input.oldpassword){
            setmessage('new password tidak boleh sama dengan old password')
        }else{
            // Axios.patch(`${API_URL}/${props.User.role}s/${props.User.id}`,{password: input.newpassword})
            Axios.put(`${API_URL}/users/password/${props.User.id}`,{password: input.newpassword})
            .then((res)=>{
                setmessage('succeed')
                setsucceed(true)
                setinput({oldpassword:'',newpassword:'',confirm:''})
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    

    return (
        <div style={{minHeight:'80vh', position:'relative'}}>
            {/* {props.User.isLogin?'true':null} */}
            <Segment style={{width:'300px', margin:'10vh auto'}} className='color-dark'>
                <Form>
                    <Header>Change Password</Header>
                    <Form.Field>
                    <label>Old password</label>
                    <input 
                        placeholder='old password...' 
                        type='password'
                        onChange={handleInput}
                        name='oldpassword'
                        value={input.oldpassword}
                    />
                    </Form.Field>
                    <Form.Field>
                    <label>New password</label>
                    <input 
                        placeholder='new password...' 
                        type='password'
                        onChange={handleInput}
                        name='newpassword'
                        value={input.newpassword}
                    />
                    </Form.Field>
                    <Form.Field>
                    <label>Confirm password</label>
                    <input 
                        placeholder='confirm password...' 
                        type='password'
                        onChange={handleInput}
                        name='confirm'
                        value={input.confirm}
                    />
                    </Form.Field>
                    
                    <Button 
                        color='red' 
                        style={{width:'100%'}} 
                        type='submit'
                        onClick={onUpdate}
                    >
                        Submit
                    </Button>
                    {
                        message?
                        <p style={succeed?{color:'green'}:{color:'red'}}>{succeed?<span><Icon name='check'></Icon> Succeed</span>:message}</p>
                        : null
                    }
                </Form>
            </Segment>
            {
                !props.User.isLogin?
                <Redirect to='/'/>
                : null
            }
        </div>
    )
}

const MapstatetoProps=(state)=>{
    return {
        User:state.Auth
    }
}

export default connect(MapstatetoProps,{Login})(Settings)