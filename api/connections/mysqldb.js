// LOCAL
// const mysql=require('mysql')
// const db=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'maungapain',
//     database:'etrainerdb',
//     port:'3306'
// })

// DB4FREE
const mysql=require('mysql')
const db=mysql.createConnection({
    host:'db4free.net',
    user:'mde50526shifu',
    password:'leathershoes',
    database:'shifu_database',
    port:'3306'
})


db.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log('connected to mysql etrainerdb')
})

module.exports=db