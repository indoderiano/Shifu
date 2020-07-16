const {db}=require('../connections')


module.exports={
    create:(req,res)=>{
        console.log(req.body)
        var sql=`insert into schedules set ?`
        db.query(sql,req.body,(err,result)=>{
            if(err) res.status(500).send(err)
            return res.status(200).send(result)
        })
    },
    carddetails:(req,res)=>{
        // console.log(req.query)
        const {userid,trainerid,status}=req.query
        if(Array.isArray(status)){
            // console.log('its array')
            var status_sql=status
            // console.log(status_sql)
        }else{
            // console.log('its not array')
            if(status){
                var status_sql=status.split(" ")
            }
            // console.log(status_sql)
        }
        if(userid&&!trainerid){ // for user
            var sql=`
                select u.username as clientname,
                t.username as trainername,t.image as trainerimage,s.*
                from schedules s
                join users u on s.userid=u.id
                join (select users.username,trainers.* from trainers join users on trainers.userid=users.id) t on s.trainerid=t.id
                where s.userid=${userid} and s.status in ('${status_sql.join("','")}')
            `
            // console.log(sql)
        }else if(trainerid&&!userid){ // for trainer
            var sql=`
                select u.username as clientname,
                t.username as trainername,t.image as trainerimage,s.*
                from schedules s
                join users u on s.userid=u.id
                join (select users.username,trainers.* from trainers join users on trainers.userid=users.id) t on s.trainerid=t.id
                where t.userid=${trainerid} and s.status in ('${status_sql.join("','")}')
            `
            // console.log(sql)
        }else if(!trainerid&&!userid&&status){ // for admin
            var sql=`
                select u.username as clientname,
                t.username as trainername,t.image as trainerimage,s.*
                from schedules s
                join users u on s.userid=u.id
                join (select users.username,trainers.* from trainers join users on trainers.userid=users.id) t on s.trainerid=t.id
                where s.status in ('${status_sql.join("','")}')
            `
        }else if(!trainerid&&!userid&&!status){
            var sql=`
            select u.username as clientname,
            t.username as trainername,t.image as trainerimage,s.*
            from schedules s
            join users u on s.userid=u.id
            join (select users.username,trainers.* from trainers join users on trainers.userid=users.id) t on s.trainerid=t.id
            `
        }
        db.query(sql,(err,result)=>{
            if(err) res.status(500).send(err)
            return res.status(200).send(result)
        })
    },
    updatestatus:(req,res)=>{
        // console.log(req.params)
        // console.log(req.body)
        const {id}=req.params
        var sql=`update schedules set ? where id=${id}`
        db.query(sql,req.body,(err,result)=>{
            if(err) res.status(500).send(err)
            return res.status(200).send(result)
        })
    }
}

