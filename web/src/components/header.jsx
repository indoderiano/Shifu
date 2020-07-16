import React, { Component } from 'react'
import {
    Button,
    Container,
    Divider,
    Grid,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    Input,
    Label,
    Dropdown,
    Form
  } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { Login, Logout,ReloadSchedules } from './../redux/actions'



class Header extends Component {
    state = { 
        login: false,
        input: {
            username: '',
            password: ''
        }
     }

     handleClick=(e)=>{
         this.setState({[e.target.name]: true})
     }
     handleInput=(e)=>{
         this.setState({input:{...this.state.input,[e.target.name]:e.target.value}})
     }
     handleKey=(e)=>{
         if(e.key==='Enter'){
            this.props.Login(this.state.input.username,this.state.input.password)

            // at this point, redux user is not yet updated
            // console.log(this.props.User)

            // setTimeout(()=>{
            //     this.props.ReloadSchedules(this.props.User.role,this.props.User.id)

            // },2000)
         }
     }

    render() { 
        return ( 

            <Responsive 
                // getWidth={getWidth} 
                // minWidth={Responsive.onlyTablet.minWidth}
            >
                <Visibility
                once={false}
                // onBottomPassed={this.showFixedMenu}
                // onBottomPassedReverse={this.hideFixedMenu}
                >
                <Segment
                    inverted
                    textAlign='center'
                    style={{ minHeight:'', padding: '1em 0em' }}
                    vertical
                >
                    <Menu
                        fixed={false ? 'top' : null}
                        inverted={!false}
                        pointing={!false}
                        secondary={!false}
                        size='large'
                    >
                    <Container>
                        <Menu.Item as={Link} to='/' active={false}>Home</Menu.Item>
                        {/* <Menu.Item as='a'>Training Schedule</Menu.Item>
                        <Menu.Item as='a'>Coaching Schedule</Menu.Item>
                        <Menu.Item as='a'>Messages</Menu.Item> */}
                        {
                            this.props.User.role==='user'?
                            <Menu.Item as={Link} to='/sessions'>Sessions</Menu.Item>
                            : null
                        }
                        
                        {
                            this.props.User.role==='admin'?
                            <Menu.Item style={{marginRight:'5px'}} as={Link} to='/manage'>
                                Manage sessions
                                {
                                    this.props.Schedules.count?
                                    <Label 
                                        className='bg-sign'
                                        style={{
                                            position:'absolute',
                                            top:'21px',
                                            right:'5px', 
                                            transform:'translate(50%,-50%) scale(.9)',
                                            padding: '2px',
                                            fontSize:'12px'
                                        }} 
                                        // color='red' 
                                        circular
                                    >
                                        {this.props.Schedules.count}
                                    </Label>
                                    : null
                                }
                            </Menu.Item>
                            : null
                        }
                        {
                            this.props.User.role==='admin'?
                            <Menu.Item as={Link} to='/manageall'>Manage all</Menu.Item>
                            : null
                        }
                        {
                            this.props.User.role==='trainer'?
                            <Menu.Item style={{marginRight:'5px'}} as={Link} to='/requests'>
                                Requests
                                {
                                    this.props.Schedules.countrequest?
                                    <Label 
                                        className='bg-sign'
                                        style={{
                                            position:'absolute',
                                            top:'21px',
                                            right:'5px', 
                                            transform:'translate(50%,-50%) scale(.9)',
                                            padding: '2px',
                                            fontSize:'12px'
                                        }} 
                                        // color='red' 
                                        circular
                                    >
                                        {this.props.Schedules.countrequest}
                                    </Label>
                                    : null
                                }
                            </Menu.Item>
                            : null
                        }

                        {
                            this.props.User.role==='user'||this.props.User.role==='trainer'?
                            <Menu.Item style={{marginRight:'5px'}} as={Link} to='/schedules'>
                                Schedules
                                {
                                    this.props.Schedules.count?
                                    <Label 
                                        className='bg-sign'
                                        style={{
                                            position:'absolute',
                                            top:'21px',
                                            right:'5px', 
                                            transform:'translate(50%,-50%) scale(.9)',
                                            padding: '2px',
                                            fontSize:'12px'
                                        }} 
                                        // color='red' 
                                        circular
                                    >
                                        {this.props.Schedules.count}
                                    </Label>
                                    : null
                                }
                            </Menu.Item>
                            : null
                        }
                        {
                            this.props.User.role==='user'||this.props.User.role==='trainer'?
                            <Menu.Item as={Link} to='/history'>History</Menu.Item>
                            : null
                        }
                        <Menu.Item style={{padding: '0em'}} position='right'>
                            {/* <Form> */}
                            {
                                this.props.User.isLogin?
                                null
                                :this.state.login?
                                <div style={{paddingRight:'17px'}}>
                                    <span style={{marginRight:'.5em'}}>Username</span>
                                    <Input 
                                        name='username' 
                                        onChange={this.handleInput} 
                                        // onKeyPress={handleKeypress}
                                        value={this.state.input.username} 
                                        style={{display:'inline'}} 
                                        size='mini' 
                                        icon='user' 
                                        placeholder='username...' 
                                    />
                                </div>
                                : null
                            }
                            {
                                this.props.User.isLogin?
                                null
                                :this.state.login?
                                <div style={{paddingRight:'17px', position:'relative'}}>
                                    <span style={{marginRight:'.5em'}}>Password</span>
                                    <Input 
                                        name='password' 
                                        onChange={this.handleInput} 
                                        value={this.state.input.password} 
                                        size='mini' 
                                        icon='lock' 
                                        placeholder='password...' 
                                        type='password'
                                        onKeyPress={this.handleKey}
                                    />
                                    {
                                        this.props.User.message?
                                        <Label 
                                            style={{
                                                position:'absolute',
                                                top: '100%',
                                                left:'59%',
                                                transform: 'translate(-50%,0)',
                                                color:'red',
                                                fontWeight:'100',
                                                whiteSpace:'nowrap'
                                            }} 
                                            pointing
                                            basic
                                            color='red'
                                        >
                                            {this.props.User.message}
                                        </Label>
                                        : null
                                    }
                                </div>
                                : null
                            }
                            {/* </Form> */}
                            {   this.props.User.isLogin?
                                <Dropdown
                                className='simple'
                                icon={<img alt={this.props.User.role} 
                                    style={{
                                        float:'left', 
                                        verticalAlign:'-16px', 
                                        borderRadius:'20px', 
                                        marginRight: '5px', 
                                        width: '27px', 
                                        height: 'auto',
                                        transform: 'translate(0,15%)'
                                    }} 
                                src='https://react.semantic-ui.com/images/avatar/small/joe.jpg'/>}
                                text={'Good Day, '+this.props.User.username}
                                style={{lineHeight:'38px'}}
                            >
                                <Dropdown.Menu style={{marginTop:'0px'}}>
                                    <Dropdown.Item as={Link} to='/settings' className='bg-white-hvr color-sign-dark'>Change Password</Dropdown.Item>
                                    <Dropdown.Item
                                        className='bg-white-hvr'
                                        as='a' 
                                        // style={{ margin: 'auto 0 0 1em' }}
                                        onClick={
                                            ()=>{
                                                this.props.Logout()
                                                this.setState({input:{username:'',password:''},login:false})
                                            }
                                        }
                                    >
                                        Sign Out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                                // <span>Hello {this.props.User.role}, {this.props.User.username}</span>
                                :this.state.login?
                                null
                                :
                                <Button name='login' onClick={this.handleClick} style={{margin:'auto'}} as='a' inverted={!false}>
                                    Log in
                                </Button>
                            }
                            {
                                this.props.User.isLogin?
                                <Button 
                                    as='a' 
                                    inverted={!false} 
                                    primary={false} 
                                    style={{ margin: 'auto 0 0 1em' ,display:'none'}}
                                    onClick={
                                        ()=>{
                                            this.props.Logout()
                                            this.setState({input:{username:'',password:''},login:false})
                                        }
                                    }
                                >
                                    Sign Out
                                </Button>
                                :
                                <Button as={Link} to='/register' inverted={!false} primary={false} style={{ margin: 'auto 0 0 0.5em' }}>
                                    Sign Up
                                </Button>
                            }
                        </Menu.Item>
                    </Container>
                    </Menu>
                </Segment>
                </Visibility>

            </Responsive>

         );
    }
}

const MapstatetoProps=(state)=>{
    return{
        User:state.Auth,
        Schedules: state.Schedules
    }
}
 
export default connect(MapstatetoProps,{Login,Logout,ReloadSchedules})(Header);