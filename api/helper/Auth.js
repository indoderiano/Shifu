const jwt=require('jsonwebtoken')

module.exports={
    Auth: (req,res,next)=>{
        console.log('Token Verifying')
        console.log(next)
        console.log(req.method)
        // console.log(req.params)
        // console.log(req.token)

        jwt.verify(req.token,"shifu",(err,decoded)=>{
            if(err) return res.status(401).json({ message: "User not authorized.", error: "User not authorized." })
            req.tokenuserdata=decoded
            console.log(decoded)
            next()
        })
        // return res.status(200).send({status:false})
        
    }
}




// const jwt = require ('jsonwebtoken');
// module.exports = {

//     Auth : (req, res, next) => {

//         // console.log(req.method)
//         if (req.method !== "OPTIONS") {

//             // let success = true
//             jwt.verify(req.token, "puripuriprisoner", (error, decoded) => {
//                 if (error) {
//                     return res.status(401).json({ message: "User not authorized.", error: "User not authorized." });
//                 }

//                 req.user = decoded;
//                 next();
//             });
//         } else {
//            next();
//         }

//     }

// }

