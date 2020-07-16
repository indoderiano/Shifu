import React, { Component } from 'react'
import { Header, Button, Icon, Segment, Grid, Image, Container, Divider} from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {KeepLogin,Logout} from '../redux/actions'
import Axios from 'axios'
import { API_URL } from '../supports/ApiUrl'


class Verification extends Component {
    state = { 
        loading: true,
        message: 'wait...',
        message_resend: '',
        isverified: false

     }


     // NOTE
     // after clicking link from email, this page should automatically sign in that id
     // not the id logged in on the page, but the id from the email link
     // DONE


    componentDidMount=()=>{
        // it should allow another id to be verified
        // if(this.props.match.params.tokenid){
        //     console.log('ini berhasil')
        // console.log(this.props.match.params.tokenid)
        // if(this.props.User.isverified){
        //     console.log('already verified')
        //     this.setState({loading:false})
        // }else{

            var obj={
                tokenid: this.props.match.params.tokenid
            }
            // problem is
            // any email link verification will return status true
            // but the id logged in, might not be the one verified
            // DONE
            Axios.put(`${API_URL}/users/verification`,obj)
            .then((res)=>{
                console.log(res.data)
                if(res.data.status){
                    // check if account verified is the same with the one logged in this page
                    var {id,username}=res.data.user
                    if(this.props.User.id===id){
                        // do keeplogin function to reload isverified prop
                        // console.log('verification, keeplogin')
                        this.keeplogin()

                        // in case keeplogin failed
                        this.setState({message: `Hai ${username}, your account is verified`, message_resend:'Please login to enter'})

                    }else{
                        // if different id logged in
                        // logout current id
                        console.log('verification, logout new user')
                        this.props.Logout()
    
                        this.setState({message: `Hai ${username}, your account is verified`, message_resend:'Please login to enter'})
    
                    }
        
                    // this.props.actionVerify()
                }else{
                    console.log(res.data.message)
                    if(this.props.User.isLogin){
                        this.setState({message: res.data.message, message_resend:'Click here to resend email verification'})
                    }else{
                        this.setState({message: 'Sign up to continue'})
                    }
                }
            }).catch((err)=>{
                console.log(err)
            }).finally(()=>{
                console.log('finally')
                this.setState({loading:false})
            })
        
        

    }



    keeplogin=()=>{
        const tokenid=localStorage.getItem('e-trainer_token')
    
        if(tokenid){

            Axios.get(`${API_URL}/users/keeplogin/${tokenid}`)
            .then((res)=>{
                if(res.data.status){
                    const {id,username,email,role,isverified,token}=res.data.user
                    // console.log('keeplogin')
                    // console.log(res.data.user)
                    console.log('verification, keeplogin')
                    this.props.KeepLogin(id,username,email,role,isverified,token)

                    // if(role==='user'||role==='trainer'){
                    //     props.ReloadSchedules(role,id)
                    //     if(role==='trainer'){
                    //     props.ReloadRequests(id)
                    //     }
                    // }else if(role==='admin'){
                    //     // console.log('test')
                    //     props.LoadSessionsToVerify()
                    // }
                }else{
                    console.log('keeplogin tidak berhasil')
                }
            }).catch((err)=>{
                console.log(err)
            })

        }else{
            // setloading(false)
        }
    }


    onResendEmail=()=>{
        this.setState({loading:true})
        var data={
            id: this.props.User.id,
            username: this.props.User.username,
            email: this.props.User.email
        }
        Axios.post(`${API_URL}/users/verification`,data)
        .then((res)=>{
            this.setState({message_resend: 'Email has been sent to your email',message:''})
        }).catch((err)=>{
            console.log(err)
            this.setState({message_resend: 'System error, please wait a moment and resend again',message:''})
        }).finally(()=>{
            this.setState({loading:false})
        })
    }

    render() { 
        // if(!this.props.User.isLogin){
        //     return <Redirect to='/'/>
        // }
        return ( 
            <div style={{minHeight: '90vh'}}>
                <div className='bg-sign-dark' style={{textAlign:'center', padding: '10vh 0', marginBottom: '50vh'}}>
                    {/* <Header
                        as='h1'
                        content='Shifu'
                        inverted
                        style={{
                            fontSize: false ? '2em' : '4em',
                            fontWeight: 'normal',
                            marginBottom: 0,
                            // marginTop: false ? '1.5em' : '3em',
                        }}
                    /> */}

                    {
                        this.props.User.isverified?
                        <Header
                            as='h2'
                            content={`Welcome ${this.props.User.username}`}
                            inverted
                            style={{
                                fontSize: '1.7em',
                                fontWeight: 'normal',
                                margin: '1em 0',
                            }}
                        />
                        :this.state.loading?
                        null
                        : 
                        <Header
                            as='h2'
                            content={this.state.message}
                            inverted
                            style={{
                                fontSize: '1.7em',
                                fontWeight: 'normal',
                                margin: '1em 0',
                            }}
                        />
                    }




                    {
                        this.props.User.isverified?
                        <Header
                            as='h2'
                            content='Your account has been verified'
                            inverted
                            style={{
                                fontSize: '1.7em',
                                fontWeight: 'normal',
                                margin: '1em 0',
                            }}
                        />
                        :
                        this.state.loading?
                        <Header
                            as='h2'
                            content='wait...'
                            inverted
                            style={{
                                fontSize: '1.7em',
                                fontWeight: 'normal',
                                margin: '1em 0',
                            }}
                        />
                        :
                        <Header
                            as='h2'
                            content={this.state.message_resend}
                            inverted
                            style={{
                                fontSize: '1.7em',
                                fontWeight: 'normal',
                                margin: '1em 0',
                            }}
                        />

                    }
                    {/* button */}
                    {   !this.props.User.isLogin?
                        null
                        :this.props.User.isverified?
                        <Button 
                            as={Link} 
                            to={
                                this.props.User.role==='user'?
                                '/sessions'
                                :this.props.User.role==='trainer'?
                                '/requests'
                                :this.props.User.role==='admin'?
                                '/manage'
                                :
                                '/register'
                            }
                            className='bg-sign bg-sign-hvr' 
                            size='huge'
                            disabled={this.state.loading}
                        >
                            Get Started
                            <Icon name='right arrow' />
                        </Button>
                        :
                        <Button 
                            className='bg-sign bg-sign-hvr' 
                            size='huge'
                            onClick={this.onResendEmail}
                            disabled={this.state.loading}
                        >
                            Resend Email
                            <Icon name='right arrow' />
                        </Button>
                    }
                    
                </div>


            </div>
         );
    }
}

// const mapDispatchToProps=(dispatch)=>{
//     return {
//         actionVerify: ()=>{
//             console.log('dispatch')
//             dispatch({type:'LOGIN_SUCCESS',payload:{isverified:true}})
//         },
//         KeepLogin,
//         Logout
//     }
// }

const MapstatetoProps=(state)=>{
    return {
        User: state.Auth
    }
}
 
export default connect (MapstatetoProps,{KeepLogin,Logout}) (Verification);