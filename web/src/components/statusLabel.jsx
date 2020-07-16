import React from 'react'
import { Header } from 'semantic-ui-react'



const Status=({status,role})=>{
    

    if(role==='user'){
        if(status==='requested'){
            return (
                <Header 
                    className='color-sign' 
                >
                        Awaiting Response
                </Header>
            )
        }else if(status==='approved'){
            return (
                <Header 
                    className='color-sign' 
                >
                        On Schedule
                </Header>
            )
        }else if(status==='onprogress'){
            return (
                <Header 
                    className='color-sign' 
                >
                        On Going
                </Header>
            )
        }else if(status==='finish'){
            return (
                <Header
                    className='color-sign'
                >
                        Session Finished
                </Header>
            )
        }else if(status==='complete'){
            return (
                <Header 
                    className='color-sign-dark'
                >
                        Completed
                </Header>
            )
        }else if(status==='adminapproved'){
            return (
                <Header 
                    className='color-sign-dark'
                >
                        Completed
                </Header>
            )
        }else{
            return (
                <Header 
                    className='color-sign-dark'
                >
                        {status}
                </Header>
            )
        }
    }

    if(role==='trainer'){
        if(status==='requested'){
            return (
                <Header 
                    className='color-sign' 
                >
                        Request
                </Header>
            )
        }else if(status==='approved'){
            return (
                <Header 
                    className='color-sign' 
                >
                        On Schedule
                </Header>
            )
        }else if(status==='onprogress'){
            return (
                <Header 
                    className='color-sign' 
                >
                        On Progress
                </Header>
            )
        }else if(status==='finish'){
            return (
                <Header
                    className='color-sign' 
                >
                        Finished
                </Header>
            )
        }else if(status==='complete'){
            return (
                <Header 
                    className='color-sign-dark' 
                >
                        Completed
                </Header>
            )
        }else if(status==='adminapproved'){
            return (
                <Header 
                    className='color-sign-dark' 
                >
                        Completed
                </Header>
            )
        }else{
            return (
                <Header 
                    className='color-sign-dark'
                >
                        {status}
                </Header>
            )
        }
    }



}

export default Status