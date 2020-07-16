import React, { Component } from 'react'
import { Header, Card, Image, Icon, Form, Button, Step, Segment, Grid, Message, TextArea, Item, Label } from 'semantic-ui-react'
import Axios from 'axios'
import { API_URL } from '../supports/ApiUrl'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { ReloadSchedules } from './../redux/actions'



class Session extends Component {
    state = { 
        step: 1,
        disable: {
            step2: true,
            step3: true
        },
        categories: [],
        coaches: [],
        thecoach: {},
        requestmessage: '',
        submitloading: false,
        category: '' // category picked from step 1
     }

    componentDidMount(){
        // get categories
        Axios.get(`${API_URL}/users/categories`)
        .then((res)=>{
            this.setState({categories: res.data})
        }).catch((err)=>{
            console.log(err)
        })
     }

    searchCoaches=(category)=>{
        this.setState({category: category})
        // if(category){
            Axios.get(`${API_URL}/trainers/find?category=${category}`)
            .then((res)=>{
                this.setState({coaches:res.data})
            }).catch((err)=>{
                console.log(err)
            })
        // }else{
        //     Axios.get(`${API_URL}/trainers`)
        //     .then((res)=>{
        //         this.setState({coaches:res.data})
        //     }).catch((err)=>{
        //         console.log(err)
        //     })
        // }
    }

    submitRequest=()=>{
        this.setState({submitloading:true})
        var obj={
            status: 'requested',
            category: this.state.thecoach.category,
            userId: this.props.User.id,
            trainerId: this.state.thecoach.id,
            requestMessage: this.state.requestmessage
        }
        console.log(obj)

        Axios.post(`${API_URL}/schedules/create`,obj)
        .then((res)=>{
            this.setState({step:4})
            this.props.ReloadSchedules(this.props.User.role,this.props.User.id)
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderCategories=()=>{
        return this.state.categories.map((val,index)=>{
            return (
                <li 
                    key={index} 
                    onClick={
                            ()=>{
                                this.searchCoaches(val.name)
                                this.setState({step:2,disable:{step2:false,step3:true}})
                            }
                        }
                    >
                    <img src={val.image}/>
                    <span>{val.name}</span>
                </li>
            )
        })
    }

    renderCoaches=()=>{
        return this.state.coaches.map((val,index)=>{
            return (
                <Card key={index} className='session-card'>
                    <Card.Content className='session-card-img' style={{position:'relative', overflow:'hidden', flexBasis:'350px'}}>
                        <Image src={val.image} wrapped ui={false} style={{maxHeight:'150px'}} />
                    </Card.Content>
                    {/* <Card.Content> */}
                    <Card.Content style={{padding:'1em 1em', flexBasis:'100px'}}>
                        <Card.Header>{val.username}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Joined in 2015</span>
                        </Card.Meta>
                        <Card.Meta as={Link} to={`/profile/${val.id}`} className='color-sign color-sign-hvr'>
                            see more<Icon name='angle double right' style={{verticalAlign:'-1.5px'}}/>
                        </Card.Meta>
                        <Card.Description>
                            {val.profile}
                        </Card.Description>
                    </Card.Content>
                    <Card.Meta style={{padding:'0em 1em 1em'}}>
                        <Button 
                            onClick={()=>{
                                this.setState({step:3,disable:{step2:false,step3:false},thecoach:val})
                                }
                            } 
                            style={{marginTop: '7px'}} 
                            className='bg-sign bg-sign-hvr' 
                            fluid
                        >
                            Schedule a training with {val.username}
                        </Button>
                    </Card.Meta>
                    {/* </Card.Content> */}
                    <Card.Content style={{color:'rgba(0,0,0,.6)'}} extra>
                        <h4>{val.category}</h4>
                    </Card.Content>
                </Card>
            )
        })
    }

    render() { 
        if(this.props.User.role==='user'){
            return ( 
                <div style={{textAlign: 'center'}}>
                    <Header
                        as='h1'
                        content={
                            this.state.step===1?
                            'Pick your category'
                            :this.state.step===2?
                            'Pick your coach'
                            :this.state.step===3?
                            'Send your request'
                            : 
                            'Complete'
                        }
                        // inverted
                        style={{
                            fontSize: '4em',
                            fontWeight: 'normal',
                            margin: '10vh 0 6vh',
                        }}
                    />

                    <Message
                        // onDismiss={this.handleDismiss}
                        header='Welcome user!'
                        content='Start by finding your coach'
                        style={{width:'40vw', margin:'10vh auto'}}
                        floating
                    />

    
                    
                    <Step.Group 
                        className={this.state.step===4?'color-sign-dark gone':'color-sign-dark'}
                        style={{opacity:'1'}}
                    >
                        <Step 
                            onClick={()=>{this.setState({step:1})}}
                            active={this.state.step===1?true:false}
                        >
                            <Icon name='check square outline' />
                            <Step.Content>
                                <Step.Title>Category</Step.Title>
                                <Step.Description>Choose your category</Step.Description>
                            </Step.Content>
                        </Step>
    
                        <Step 
                            onClick={()=>{this.setState({step:2})}} 
                            active={this.state.step===2?true:false}
                            disabled={this.state.disable.step2}
                        >
                            <Icon name='users' />
                            <Step.Content>
                                <Step.Title>Coaches</Step.Title>
                                <Step.Description>Pick your trainer</Step.Description>
                            </Step.Content>
                        </Step>
    
                        <Step 
                            onClick={()=>{this.setState({step:3})}} 
                            active={this.state.step===3?true:false}
                            disabled={this.state.disable.step3}
                        >
                        <Icon name='envelope' />
                        <Step.Content>
                            <Step.Title>Make request</Step.Title>
                        </Step.Content>
                        </Step>
                    </Step.Group>
    
                    
                    <div style={{position: 'relative', height: 'auto', overflow:'hidden', minHeight:'1000px'}}> 
    
                        <div className={
                                this.state.step===1?
                                'session-step'
                                :
                                'session-step previous'
                            }
                        >
                            <ul className='image-flex' style={{padding:'0'}}>
                                {this.renderCategories()}


                                {/* all categories */}
                                <li 
                                    key={'all'} 
                                    style={{height:'200px'}}
                                    onClick={
                                            ()=>{
                                                this.searchCoaches()
                                                this.setState({step:2,disable:{step2:false,step3:true}})
                                            }
                                        }
                                    >
                                    <img src='https://wallpapermemory.com/uploads/266/concert-wallpaper-hd-1680x1050-164893.jpg'/>
                                    <span>All Coaches</span>
                                </li>
                            </ul>
                        </div>
    
    
                        <div className={
                            this.state.step===1?
                            'session-step-highest-el next'
                            :this.state.step===2?
                            'session-step-highest-el'
                            :
                            'session-step-highest-el previous'
                            }
                            style={{minHeight: '80vh', display:'flex', flexWrap:'wrap'}}
                        >
    
                            {this.renderCoaches()}
    
                        </div>
    
                        
                        <div 
                            className={
                                    this.state.step===1?
                                    'session-step next'
                                    :this.state.step===2?
                                    'session-step next'
                                    :this.state.step===3?
                                    'session-step'
                                    :this.state.step===4?
                                    'session-step previous'
                                    : null
                                }
                                style={{padding:'0 15vw'}}
                        >
                            <Segment placeholder>
                                <Grid columns={2} stackable textAlign='left'>
    
                                <Grid.Row >
                                    <Grid.Column width={6}>
    
                                    <Card>
                                        <Image style={{overflow:'hidden', height: 'unset'}} src={this.state.thecoach.image} wrapped ui={false} />
                                        <Card.Content>
                                        <Card.Header>{this.state.thecoach.username}</Card.Header>
                                        <Card.Meta>
                                            <span className='date'>{this.state.thecoach.category} coach</span>
                                        </Card.Meta>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <h4>{this.state.thecoach.category}</h4>
                                        </Card.Content>
                                    </Card>
    
                                    {/* <div style={{width:'100%', textAlign:'center'}}>
                                        <Item.Image 
                                            size='big' 
                                            src={this.state.thecoach.image} 
                                            style={{marginBottom: '7px', width:'100%'}}
                                            className='session-request-img'
                                        />
                                        
                                        <h3 style={{margin: '3px 0 5px'}}>{this.state.thecoach.username}</h3>
                                        <span style={{rgba:'(0,0,0,.4)'}}>{this.state.thecoach.category} coach</span>
                                    </div> */}
                                    </Grid.Column>
    
                                    <Grid.Column width={10}>
                                    <div style={{width:'100%'}}>
                                        <Form className='session-textarea'>
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
                                        </Form>
    
                                    </div>
                                    </Grid.Column>
                                </Grid.Row>
                                </Grid>
                            </Segment>
                            
                        </div>
    
                        {/* // notif */}
    
                        <div 
                            className={
                                    this.state.step===1?
                                    'session-step next'
                                    :this.state.step===2?
                                    'session-step next'
                                    :this.state.step===3?
                                    'session-step next'
                                    :this.state.step===4?
                                    'session-step'
                                    : null
                                }
                                style={{padding:'0 15vw', fontSize:'24px', fontWeight:'100'}}
                        >
                            <div style={{marginBottom:'14px'}}>
                                <Icon name='checkmark'/>
                                Request has been submitted, wait for the trainer to respond
                            </div>
                            <Button as={Link} to='/schedules' className='oke'>OK</Button>
                        </div>
    
                    </div>
    
    
                </div>
             );
        }else{
            return <Redirect to='/'/>
        }
    }
}

const MapstatetoProps=(state)=>{
    return {
        User: state.Auth,
        Schedules: state.Schedules
    }
}
 
export default connect(MapstatetoProps, {ReloadSchedules}) (Session);






