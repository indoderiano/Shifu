import React, { Component } from 'react'
import { Header, Button, Icon, Segment, Grid, Image, Container, Divider} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'


class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div className='bg-sign-dark' style={{textAlign:'center', padding: '10vh 0'}}>
                    <Header
                        as='h1'
                        content='Shifu'
                        inverted
                        style={{
                            fontSize: false ? '2em' : '4em',
                            fontWeight: 'normal',
                            marginBottom: 0,
                            // marginTop: false ? '1.5em' : '3em',
                        }}
                    />
                    <Header
                        as='h2'
                        content='Easy way to find your coach'
                        inverted
                        style={{
                            fontSize: false ? '1.5em' : '1.7em',
                            fontWeight: 'normal',
                            marginTop: false ? '0.5em' : '1.5em',
                        }}
                    />
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
                        size='huge'>
                        Get Started
                        <Icon name='right arrow' />
                    </Button>
                    
                    {/* <ul style={{paddingTop:'10vh'}} className='image-flex'>
                    <li>
                        <img src='https://cdn.pixabay.com/photo/2015/01/21/00/56/football-606235_1280.jpg'/>
                        <span>Football</span>
                    </li>
                    <li>
                        <img src='https://images.unsplash.com/photo-1503318759574-b9dc482cdf36?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80'/>
                        <span>Rugby</span>
                    </li>
                    <li>
                        <img src='https://images.pexels.com/photos/3562117/pexels-photo-3562117.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'/>
                        <span>Boxing</span>
                    </li>
                    <li>
                        <img src='https://images.pexels.com/photos/703012/pexels-photo-703012.jpeg'/>
                        <span>Fitness</span>
                    </li>
                    <li>
                        <img src='https://images.pexels.com/photos/892682/pexels-photo-892682.jpeg'/>
                        <span>Yoga</span>
                    </li>
                    <li>
                        <img src='https://media.istockphoto.com/photos/muay-thai-workout-motivational-training-at-the-gym-facility-picture-id641018364?k=6&m=641018364&s=612x612&w=0&h=FWCoM33CKAV2BVGA1UcemwqXKmhU_cloivyre4CSXJ4='/>
                        <span>Muay Thai</span>
                    </li>
                </ul> */}

                </div>

                

                <Segment style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                    <Grid.Column width={8}>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                        About
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                        This is an app to help users to find trainers for their activities. It helps users and trainers to connect and have sessions together.
                        </p>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                        3 roles
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                        There are users and trainers who can use this app, but admin role will also help to solve problems should there be any
                        </p>
                    </Grid.Column>
                    <Grid.Column floated='right' width={6}>
                        <Image bordered rounded size='large' src='https://as1.ftcdn.net/jpg/02/01/39/44/500_F_201394482_gzmyhIkrbP1dhCoUpbTHPtaVvNCaSz6y.jpg' />
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    <Grid.Column textAlign='center'>
                        <Button disabled size='huge'>Check Them Out</Button>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Segment>

                <Segment style={{ padding: '0em' }} vertical>
                <Grid celled='internally' columns='equal' stackable>
                    <Grid.Row textAlign='center'>
                    <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                        "What a Company"
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
                    </Grid.Column>
                    <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                        "I shouldn't have gone with their competitor."
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                        <Image avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                        <b>Nan</b> Chief Fun Officer Acme Toys
                        </p>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Segment>

                <Segment style={{ padding: '8em 0em' }} vertical>
                <Container text>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                    Breaking The Grid, Grabs Your Attention
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                    Instead of focusing on content creation and hard work, we have learned how to master the
                    art of doing nothing by providing massive amounts of whitespace and generic content that
                    can seem massive, monolithic and worth your attention.
                    </p>
                    <Button disabled as='a' size='large'>
                    Read More
                    </Button>

                    <Divider
                    as='h4'
                    className='header'
                    horizontal
                    style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                    >
                    <p disabled href='#'>Case Studies</p>
                    </Divider>

                    <Header as='h3' style={{ fontSize: '2em' }}>
                    Did We Tell You About Our Bananas?
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                    Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
                    it's really true. It took years of gene splicing and combinatory DNA research, but our
                    bananas can really dance.
                    </p>
                    <Button disabled as='a' size='large'>
                    I'm Still Quite Interested
                    </Button>
                </Container>
                </Segment>

            </div>
         );
    }
}

const MapstatetoProps=(state)=>{
    return {
        User: state.Auth
    }
}
 
export default connect (MapstatetoProps) (Home);