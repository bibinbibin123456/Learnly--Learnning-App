const jwt= require('jsonwebtoken')

const authAdmin= (req,res,next)=>{
    try {
       const {Admin_token} =req.cookies;
       
        if(!Admin_token){
            return res.status(401).json({error:"jwt not found"})
        }

        const verifiedToken= jwt.verify(Admin_token,process.env.JWT_SECRET)
        if(!verifiedToken){
            return res.status(401).json({error:"admin not authorized"})
        }

        if(verifiedToken.role !=="admin"){
            return res.status(401).json({error:"Acess denied"})

        }
        req.admin = verifiedToken.id || verifiedToken._id
        if (!req.admin) {
            return res.status(401).json({error:"Admin identity not found in token"})
        }
        next()
    } catch (error) {
        res.status(error.status || 401).json({error:error.message})
        
    }
}
module.exports= authAdmin