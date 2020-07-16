import React, {Component} from 'react'
import Axios from 'axios'
import { API_URL } from '../supports/ApiUrl'
import {Item, Image, Form, Button, Icon} from 'semantic-ui-react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {ReloadSchedules} from './../redux/actions'




class Profile extends Component {
    state = { 
        profiledata: {},
        requestmessage:'',
        step:1
     }

    componentDidMount=()=>{
        Axios.get(`${API_URL}/trainers/get/${this.props.match.params.trainerid}`)
        .then((res)=>{
            this.setState({profiledata:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    submitRequest=()=>{
        var obj={
            status: 'requested',
            category: this.state.profiledata.category,
            userId: this.props.User.id,
            trainerId: this.props.match.params.trainerid,
            requestMessage: this.state.requestmessage
        }

        Axios.post(`${API_URL}/schedules/create`,obj)
        .then((res)=>{
            this.setState({step:3})
            this.props.ReloadSchedules(this.props.User.role,this.props.User.id)
        }).catch((err)=>{
            console.log(err)
        })
    }



    render() { 
        return ( 
            <div style={{padding:'70px 20vw'}}>
            
            <Item.Group>
            <Item>
            <Item.Image size='large' src={this.state.profiledata.image} />

            <Item.Content style={{fontSize:'120%'}}>
                <Item.Header as='h3'>{this.state.profiledata.username}</Item.Header>
                <Item.Meta>{this.state.profiledata.category}</Item.Meta>
                <Item.Description style={{fontSize:'15px'}}>
                {this.state.profiledata.profile}
                </Item.Description>
                <Item.Extra>Additional Details</Item.Extra>

                {
                    this.props.User.role==='user'?
                    <Form className='session-textarea' style={{margin:'2em 0', position:'relative', overflow:'hidden'}}>
                        
                        <div className={
                            this.state.step===1?
                            'session-step'
                            :this.state.step===2?
                            'session-step previous'
                            :this.state.step===3?
                            'session-step previous'
                            : 'session-step previous'
                        }>
                        <Button 
                            disabled={this.state.submitloading}
                            style={{width:'100%'}} 
                            className='bg-sign bg-sign-hvr'
                            onClick={()=>{this.setState({step:2})}}
                        >
                            Send Request
                        </Button>
                        </div>
                        
                        <div className={
                                this.state.step===1?
                                'session-step-highest-el next'
                                :this.state.step===2?
                                'session-step-highest-el'
                                :this.state.step===3?
                                'session-step-highest-el previous'
                                : 'session-step-highest-el previous'
                            }
                            style={{padding:'0'}}
                        >
                        <Form.TextArea 
                            style={{maxWidth:'unset', width:'100%'}} 
                            label='Message' 
                            placeholder='Message to trainer...' 
                            onChange={(e)=>{this.setState({requestmessage:e.target.value})}}
                            value={this.state.requestmessage}
                        />
                        <Form.Field>
                            <Button 
                                disabled={this.state.submitloading}
                                style={{width:'100%'}} 
                                className='bg-sign bg-sign-hvr'
                                onClick={this.submitRequest}
                            >
                                Submit Request
                            </Button>
                        </Form.Field>
                        </div>

                        <div 
                            style={{
                                textAlign:'center'
                            }}
                            className={
                                this.state.step===1?
                                'session-step next'
                                :this.state.step===2?
                                'session-step next'
                                :this.state.step===3?
                                'session-step'
                                : 'session-step previous'
                            }
                        >
                            <div style={{marginBottom:'14px'}}>
                                <Icon className='color-sign' name='checkmark'/>
                                Request has been submitted, wait for the trainer to respond
                            </div>
                            <Button as={Link} to='/schedules' basic color='red'>OK</Button>
                        </div>
                    </Form>
                    : null
                }
            </Item.Content>
            


            </Item>
            </Item.Group>

            </div>
         );
    }
}

const MapstatetoProps=(state)=>{
    return {
        User: state.Auth
    }
}
 
export default connect(MapstatetoProps,{ReloadSchedules}) (Profile);