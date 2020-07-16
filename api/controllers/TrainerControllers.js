const {db}=require('../connections')


module.exports={
    trainersbycategory:(req,res)=>{
        const {category}=req.query
        console.log(typeof category)
        // when req.query object is undefined, it returns string 'undefined'
        console.log(category)

        if(category&&category!=='undefined'&&category!=='null'){
            var sql=`
                select u.username,t.* from trainers t
                join users u on t.userid=u.id
                where t.category='${category}'
            `
        }else{
            var sql=`
                select u.username,t.* from trainers t
                join users u on t.userid=u.id
            `
        }
        // console.log(sql)
        db.query(sql,(err,result)=>{
            if(err) res.status(500).send(err)
            return res.status(200).send(result)
        })
    },
    gettrainer:(req,res)=>{
        const {id}=req.params
        console.log(req.params)
        var sql=`
            select u.username,t.* from trainers t
            join users u on t.userid=u.id
            where t.id=${id}
        `
        db.query(sql,(err,result)=>{
            if(err) res.status(500).send(err)
            return res.status(200).send(result[0])
        })
    }
}

