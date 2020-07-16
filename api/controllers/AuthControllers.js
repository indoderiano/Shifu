const {db}=require('../connections')
const encrypt=require('../helper/crypto')
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')


module.exports={
    getCategories:(req,res)=>{
        var sql='select * from categories'
        db.query(sql,(err,result)=>{
            if(err) res.status(500).send(err)
            return res.status(200).send(result)
        })
    },
    register:(req,res)=>{
        const {username,email,password,role,category,image,profile}=req.body
        // check if username already exist
        console.log(req.body)
        var sql=`select * from users where username='${username}'`
        db.query(sql,(err,checkusername)=>{
            if(err) res.status(500).send(err)
            if(checkusername.length){
                return res.status(200).send({status:false,message:'Username already exist'})
            }
            // username not exist
            // then create one
            sql=`insert into users set ?`
            var newuser={
                username,
                email,
                password:encrypt(password),
                role
            }
            db.query(sql,newuser,(err,result)=>{
                if(err) res.status(500).send(err)
                // send email verification
                var transporter=nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'mde50526@gmail.com',
                        pass: 'vfpnnmqzyowxabag'
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                })
                var token=jwt.sign({id:result.insertId},"shifu",{expiresIn:'24h'})
                var verificationlink=`http://localhost:3000/verification/${token}`
                var maildata={
                    from: 'Hokage <mde50526@gmail.com>',
                    to: email,
                    subject: 'E-Trainer Verification Account',
                    html: `hai ${username}, klik untuk verifikasi account, link ini kadaluarsa dalam 24 jam 
                    <a href=${verificationlink}>verify</a>
                    `
                }
                transporter.sendMail(maildata,(err,result3)=>{
                    if(err) res.status(500).send(err)
                    // if trainer, register data
                    if(role==='trainer'){
                        console.log('register trainer')
                        sql=`insert into trainers set ?`
                        var newtrainer={
                            userid:result.insertId,
                            category,
                            image,
                            profile
                        }
                        db.query(sql,newtrainer,(err,result2)=>{
                            if(err) res.status(500).send(err)
                            return res.status(200).send({status:true})
                        })
                    }else{
                        return res.status(200).send({status:true})
                    }
                })
                
            })
        })
    },
    login:(req,res)=>{
        const {username,password}=req.params
        // console.log(req.params)
        var sql=`select * from users where username = ? and password = ?`
        db.query(sql,[username,encrypt(password)],(err,result)=>{
            if(err) res.status(500).send(err)
            if(result?result.length:false){
                var token=jwt.sign({id:result[0].id},"shifu",{expiresIn: '12h'})
                var user={
                    id:result[0].id,
                    username,
                    email:result[0].email,
                    role:result[0].role,
                    isverified:result[0].isverified,
                    token
                }
                // console.log('return user data')
                // console.log(user)
                return res.status(200).send({status:true,user})
            }else{
                return res.status(200).send({status:false,message:'Username atau password salah'})
            }
        })
    },
    keeplogin:(req,res)=>{
        // console.log('keeplogin')
        // console.log(req.tokenuserdata)
        const {id}=req.tokenuserdata
        // const {id}=req.params
        var sql=`select * from users where id=${id}`
        db.query(sql,(err,result)=>{
            if(err) res.status(500).send(err)
            var token=jwt.sign({id:id},"shifu",{expiresIn:'2h'})
            var user={
                id:result[0].id,
                username:result[0].username,
                email:result[0].email,
                role:result[0].role,
                isverified:result[0].isverified,
                token
            }
            // need to keeplogin with token
            return res.status(200).send({status:true,user})
        })
    },
    changepassword:(req,res)=>{
        console.log('ganti password')
        const {id}=req.params
        const {password}=req.body
        var update={
            password: encrypt(password)
        }
        var sql=`update users set ? where id=${id}`
        db.query(sql,update,(err,result)=>{
            if(err) res.status(500).send(err)
            return res.status(200).send(result)
        })
    },
    emailverification:(req,res)=>{
        const {id,username,email}=req.body
        console.log(req.body)
        
        // if these parameters are undefined, api will collapse
        // note that, no internet can also cause api to collapse
        // not sure which caused the collapse
        // this to prevent api collapse
        if(!id||!username||!email){
            return res.status(500).send({message:'params are not complete'})
        }

        // send email verification
        var transporter=nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mde50526@gmail.com',
                pass: 'vfpnnmqzyowxabag'
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        console.log('test')
        var token=jwt.sign({id:id},"shifu",{expiresIn:'24h'})
        var verificationlink=`http://localhost:3000/verification/${token}`
        var maildata={
            from: 'Hokage <mde50526@gmail.com>',
            to: email,
            subject: 'E-Trainer Verification Account',
            html: `hai ${username}, klik untuk verifikasi account, link ini kadaluarsa dalam 24 jam 
            <a href=${verificationlink}>verify</a>
            `
        }
        console.log('test2')
        transporter.sendMail(maildata,(err,result3)=>{
            if(err) res.status(500).send(err)
            res.status(200).send({status:true})
        })

    },
    accountverify:(req,res)=>{
        const {tokenid}=req.body
        if(!tokenid){
            console.log('tokenid')
            return res.status(200).send({status:false,message:'Your account has not been verified'})
        }
        console.log(tokenid)
        jwt.verify(tokenid,"shifu",(err,decoded)=>{
            if(err) return res.status(200).send({status:false,message:'Token kadaluarsa'})
            
            console.log(decoded)
            var sql=`update users set ? where id=${decoded.id}`
            db.query(sql,{isverified:true},(err,result)=>{
                if(err) res.status(500).send(err)
                sql=`select id,username from users where id=${decoded.id}`
                db.query(sql,(err,result2)=>{
                    console.log(result2)
                    if(err) res.status(500).send(err)
                    var user={
                        id: result2[0].id,
                        username: result2[0].username
                    }
                    return res.status(200).send({status:true,user})
                })
            })

        })
    }
}



