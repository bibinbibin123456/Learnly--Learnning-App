const jwt= require('jsonwebtoken')

const authUser= (req,res,next)=>{
    try {
       const cookieToken = req.cookies?.token
       const authorization = req.headers.authorization
       const headerToken = authorization?.startsWith("Bearer ")
           ? authorization.slice(7)
           : null
       const token = cookieToken || headerToken
       
        if(!token){
            return res.status(401).json({error:"jwt not found"})
        }

        const verifiedToken= jwt.verify(token,process.env.JWT_SECRET)
        if(!verifiedToken){
            return res.status(401).json({error:"User not authorized"})
        }

        if(verifiedToken.role !=="user"){
            return res.status(401).json({error:"Acess denied"})

        }

        req.user = verifiedToken.id || verifiedToken._id
        if (!req.user) {
            return res.status(401).json({error:"User identity not found in token"})
        }

        next()
    } catch (error) {
        res.status(error.status || 401).json({error:error.message})
        
    }
}
module.exports= authUser