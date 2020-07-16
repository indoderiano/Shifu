import React, { Component } from 'react'
import { Card, Image, Button, Icon, Divider, Header, TextArea, Message, Label } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {LoadSessionsToVerify} from '../redux/actions'
import Axios from 'axios'
import AdminButtons from './cardButtonsAdmin'
import UserButtons from './cardButtonsUser'
import TrainerButtons from './cardButtonsTrainer'
import {API_URL} from '../supports/ApiUrl'




class ScheduleCards extends Component {
    state = { 
        indexconfirm:-1,
        indexcancel:-1,
        reason:''
     }


    setCardDescription=(val)=>{
        if(this.props.User.role==='admin'){

            return (
                val.status==='requested'?
                'User has requested a schedule to the trainer'
                :val.status==='approved'?
                'Trainer has accepted and the schedule is on'
                :val.status==='onschedule'?
                'Trainer has accepted and the schedule is on'
                :val.status==='onprogress'?
                'The session is on going'
                :val.status==='finish'?
                'Trainer has closed the session'
                :val.status==='complete'?
                'User has attended the session'
                :val.status==='cancelled'?
                `${val.updatedby} cannot attend`
                :val.status==='adminapproved'?
                'Admin has approved the session'
                :val.status==='admincancelled'?
                'Admin has cancelled the session'
                : 'You have no schedules'

            )
        }else if(this.props.User.role==='user'){
            return (
                val.status==='requested'?
                'Wait for the trainer to respond'
                :val.status==='approved'?
                'Trainer has accepted and the schedule is on, please attend to the session on time'
                :val.status==='onschedule'?
                'Trainer has accepted and the schedule is on, please attend to the session on time'
                :val.status==='onprogress'?
                'The session is on going'
                :val.status==='finish'?
                'Trainer has closed the session'
                :val.status==='complete'?
                'You have attended the session, and the payment will be charged from your account'
                :val.status==='cancelled'?
                `${val.updatedby} cannot attend the session`
                :val.status==='adminapproved'?
                'You have attended the session, and the payment will be charged from your account'
                :val.status==='admincancelled'?
                'Admin has cancelled the session'
                : 'You have no schedules'
            )
        }else if(this.props.User.role==='trainer'){
            return (
                val.status==='requested'&&val.clientname?
                `${val.clientname} has requested a session with you`
                :val.status==='approved'?
                'You have accepted and the schedule is on'
                :val.status==='onschedule'?
                'You have accepted and the schedule is on, please attend the session on time'
                :val.status==='onprogress'?
                'The session is on going'
                :val.status==='finish'?
                'You have closed the session'
                :val.status==='complete'?
                `Client have attended the session`
                :val.status==='cancelled'?
                `This session is cancelled because ${val.updatedby} cannot attend the session`
                :val.status==='adminapproved'?
                'Admin have approved the session and the payment will be transfered to your account'
                :val.status==='admincancelled'?
                'Admin has cancelled the session'
                : 'You have no schedules'
            )
        }
    }


    renderCards=()=>{
        // console.log('rendercards')
        // console.log(this.props.sessions)
        if(this.props.sessions.length===0){
            var sessionsList=[{id:0}]
        }else{
            var sessionsList=this.props.sessions
        }

        return sessionsList.map((val,index)=>{
            return (
                <Card 
                    key={index} 
                    style={{
                        overflow:'hidden',
                        animationDelay:`${Math.random()}s`
                    }}
                    className={
                        val.status==='onprogress'?
                        'card-zoom'
                        : null
                    }
                >
                <Card.Content>
                    <Image
                    floated='right'
                    size='tiny'
                    src={
                        // NOTE THAT to render older object with no object, need render protection
                        (this.props.User.role==='admin'||this.props.User.role==='user')&&val.trainerimage?
                        val.trainerimage
                        :this.props.User.role==='admin'||this.props.User.role==='user'?
                        'data:image/png;base64,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'
                        :this.props.User.role==='trainer'?
                        'data:image/png;base64,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'
                        : 
                        'data:image/png;base64,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'

                        }
                    />
                    <Card.Header>{val.category} session</Card.Header>
                    <Card.Meta>{
                        (this.props.User.role==='admin'||this.props.User.role==='user')&&val.trainername?
                        'Coach '+val.trainername
                        :this.props.User.role==='trainer'?
                        val.clientname
                        :  null
                        }
                    </Card.Meta>
                    {
                        (this.props.User.role==='admin'||this.props.User.role==='user')&&val.trainerid?
                        <Card.Meta as={Link} to={`/profile/${val.trainerid}`} className='color-sign color-sign-hvr'>
                            see profile<Icon name='angle double right' style={{verticalAlign:'-1px'}}/>
                        </Card.Meta>
                        : null
                    }
                    {
                        this.props.User.role==='admin'?
                        <Card.Meta style={{marginTop:'1em'}}>{
                            <span>with user <span className='color-sign-dark'>{val.clientname}</span></span>
                        }
                        </Card.Meta>
                        : null
                    }



                </Card.Content>
                
                {/* situation explanation */}
                <Card.Description style={{padding:'0em 1em 1em'}}>
                    <Card.Description style={{marginBottom:'.5em'}}>
                        {this.setCardDescription(val)}  
                    </Card.Description>
                    {
                        val.status==='cancelled'||val.status==='admincancelled'?
                        <Message compact style={{marginBottom:'.5em', margin:'0 0 .5em',opacity:'.7'}}>
                            {
                                val.reason?
                                `Reason: "${val.reason}"`
                                :
                                `Reason: ${val.updatedby} said nothing`
                            }
                        </Message>
                        : null
                    }
                    {
                        val.status==='cancelled'&&this.props.User.role==='admin'?
                        <Label basic style={{fontWeight:'100'}}>
                            last status
                            <Label.Detail>{val.laststatus}</Label.Detail>
                        </Label>
                        : null
                    }
                </Card.Description> 


                {
                    val.status?
                    <Card.Meta style={{padding:'0 1em'}}>
                        <Divider clearing fitted horizontal style={{fontSize:'12px', letterSpacing:'5px'}}>Status</Divider>                    
                    </Card.Meta>
                    : null
                }

                <Card.Meta style={{padding: '.75em 1.2em .75em 1em'}}>
                <Header 
                    style={{color:'rgba(0,0,0,.6)', letterSpacing:'6px', margin:'0 0 .5em'}} 
                    as='h2'
                    className={val.status==='onprogress'?'color-sign':null}
                >
                    {val.status}
                </Header>

                {/* buttons */}
                {
                    this.props.User.role==='admin'?
                    <AdminButtons 
                        session={val}
                        index={index}
                        confirm={index===this.state.indexconfirm}
                        cancel={index===this.state.indexcancel}
                        setindexconfirm={(i)=>{this.setState({indexconfirm:i})}}
                        setindexcancel={(i)=>{this.setState({indexcancel:i})}}
                        reloadGrandParentSessions={this.props.reloadParentSessions}
                    />
                    :this.props.User.role==='user'?
                    <UserButtons 
                        session={val}
                        index={index}
                        confirm={index===this.state.indexconfirm}
                        cancel={index===this.state.indexcancel}
                        setindexconfirm={(i)=>{this.setState({indexconfirm:i})}}
                        setindexcancel={(i)=>{this.setState({indexcancel:i})}}
                        reloadGrandParentSessions={this.props.reloadParentSessions}
                    />
                    :this.props.User.role==='trainer'?
                    <TrainerButtons 
                        session={val}
                        index={index}
                        confirm={index===this.state.indexconfirm}
                        cancel={index===this.state.indexcancel}
                        setindexconfirm={(i)=>{this.setState({indexconfirm:i})}}
                        setindexcancel={(i)=>{this.setState({indexcancel:i})}}
                        reloadGrandParentSessions={this.props.reloadParentSessions}
                    />
                    : null

                }

                </Card.Meta>

                
                </Card>
            )
        
        })
    }

    render() { 
        return (

            <Card.Group style={{padding: '0 0vw 10vh',textAlign:'center'}}>
                {this.renderCards()}
            </Card.Group>

            )
        
    }
}

const MapstatetoProps=(state)=>{
    return {
        User: state.Auth
    }
}
 
export default connect(MapstatetoProps,{LoadSessionsToVerify}) (ScheduleCards);