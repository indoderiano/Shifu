import React, {useEffect, useState} from 'react'
import { Segment, Button, Form, Label, Item, Header, Image} from 'semantic-ui-react'
import Axios from 'axios'
import {API_URL} from './../supports/ApiUrl'
import {Login} from './../redux/actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


const Register=(props)=>{
    const [input,setinput]=useState({
        username: '',
        email:'',
        password: '',
        confirm: '',
        role: '',
        category: '',
        image: '',
        profile:''
    })
    const [categories,setcategories]=useState([])
    const [isTrainer,setisTrainer]=useState(false)
    const [message,setmessage]=useState('')
    const [loading,setloading]=useState(false)

    useEffect(()=>{
        // store 
        Axios.get(`${API_URL}/users/categories`)
        .then((res)=>{
            const arr=res.data.map((val,index)=>{
                return {
                    key: index,
                    name: val.name,
                    value: val.name,
                    text: val.name
                }
            })
            setcategories(arr)
            // console.log(arr)
        })

    },[])

    const handleKeyPress=(e)=>{
        if(e.key==='Enter'){
            onSubmit();
        }
    }

    const handleInput=(e)=>{
        // console.log(e.target.name)
        setinput({...input,[e.target.name]:e.target.value})
        // if(e.target.name==='category')
    }
    const handleCategory=(e,{value})=>{
        console.log(value)
        setinput({...input,category:value})
    }

    const onSubmit= async ()=>{
        setloading(true)
        const obj={
            username: input.username,
            email: input.email,
            password: input.password,
            role: isTrainer?'trainer':'user',
            category: input.category,
            image: input.image,
            profile: input.profile
        }
        // console.log(obj)

        if(input.username===''){
            setmessage('username belum diisi')
        }else if(input.password===''){
            setmessage('password belum diisi')
        }else if(input.confirm!==input.password){
            setmessage('confirm password tidak sama')
        }else if(isTrainer){
            if(input.category===''){
                setmessage('category belum diisi')
            }else if(input.profile===''){
                setmessage('profile harus diisi')
            }else{
                // register trainer
                try{
                    var res=await Axios.post(`${API_URL}/users/register`,obj)
                    if(res.data.status){
                        // register berhasil
                        props.Login(obj.username,obj.password)
                        console.log('register berhasil')
                    }else{
                        // register tidak berhasil di backend
                        setmessage(res.data.message)
                    }
                }catch(err){
                    console.log(err)
                }
                // .then((res)=>{
                // }).catch((err)=>{
                // })
            }
        }else{
            // register user
            try{
                var res=await Axios.post(`${API_URL}/users/register`,obj)
                if(res.data.status){
                    // register berhasil
                    props.Login(obj.username,obj.password)
                    // console.log('register berhasil')
                }else{
                    // register tidak berhasil di backend
                    setmessage(res.data.message)
                }
            }catch(err){
                console.log(err)
            }
                // .then((res)=>{
                // }).catch((err)=>{
                // })
        }
        setloading(false)
    }

    

    return (
        <div style={{minHeight:'80vh', position:'relative'}}>
            <Segment style={{width:'300px', margin:'10vh auto'}} className='color-dark'>
                <Form>
                    <Header>{isTrainer?'Trainer Registration':'Register'}</Header>
                    <Form.Field>
                    <label>Username</label>
                    <input 
                        placeholder='username...' 
                        onChange={handleInput}
                        name='username'
                        value={input.username}
                    />
                    </Form.Field>
                    <Form.Field>
                    <label>Email</label>
                    <input 
                        placeholder='email...' 
                        onChange={handleInput}
                        name='email'
                        value={input.email}
                    />
                    </Form.Field>
                    <Form.Field>
                    <label>Password</label>
                    <input 
                        placeholder='password...' 
                        type='password'
                        onChange={handleInput}
                        name='password'
                        value={input.password}
                    />
                    </Form.Field>
                    <Form.Field>
                    <label>Confirm password</label>
                    <input 
                        placeholder='password...' 
                        type='password'
                        onChange={handleInput}
                        onKeyPress={handleKeyPress}
                        name='confirm'
                        value={input.confirm}
                    />
                    </Form.Field>
                    {
                        isTrainer?
                        <Form.Field>
                            <Form.Group widths='equal'>
                            {/* <Form.Select
                                fluid
                                label='Role'
                                options={[
                                    { key: 'af', value: 'user', text: 'User' },
                                    { key: 'ax', value: 'trainer', text: 'Trainer' }
                                ]}
                                placeholder='role'
                            /> */}
                            {/* <Item label='role' fluid inverted>Trainer</Item> */}
                            <Form.Select
                                fluid
                                label='Category'
                                options={categories}
                                name='category'
                                onChange={handleCategory}
                                value={input.category}
                                placeholder='category'
                            />
                            </Form.Group>
                            <Form.Field>
                                <label>Profile image</label>
                                <input 
                                    placeholder='profile image url' 
                                    onChange={handleInput}
                                    name='image'
                                    value={input.image}
                                />
                                <img style={{width:'100%', marginTop:'3px'}} src={input.image}/>
                            </Form.Field>
                            <Form.TextArea 
                                label='about' 
                                placeholder='Tell the clients more about you...' 
                                onChange={handleInput}
                                name='profile'
                                value={input.profile}
                            />
                        </Form.Field>
                        : null
                    }
                    {
                        isTrainer?
                        null
                        :
                        <Button 
                            inverted 
                            color='red' 
                            style={{width:'100%', marginBottom:'.5em'}} 
                            type='reset'
                            onClick={()=>{setisTrainer(true)}}
                        >
                            To be a trainer
                        </Button>
                    }
                    
                    <Button 
                        color='red' 
                        style={{width:'100%'}} 
                        type='submit'
                        onClick={onSubmit}
                        disabled={loading}
                    >
                        {
                            isTrainer?
                            'Submit and Start coaching'
                            :
                            'Submit'
                        }
                    </Button>
                    {
                        message?
                        <p style={{color:'red'}}>{message}</p>
                        : null
                    }
                </Form>
            </Segment>
            {
                props.User.isLogin?
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

export default connect(MapstatetoProps,{Login})(Register)