const adminDb = require("../Models/adminModel")
const { createToken } = require("../Utilities/generateToken")
const { hashPassword, comparePassword } = require("../Utilities/passwordUtilities")

const register= async(req,res)=>{
    try {
        const body= req.body
        const {email,password}= body

        if(!email || !password){
            return res.status(400).json({error:"All fields are required"})
        }

        const alreadyExit= await adminDb.findOne({email})
        if(alreadyExit){
            return res.status(400).json({error:"Email already exists"})
        }
       const hashedPassword=await hashPassword(password)
        const newAdmin= new adminDb({
            email,
            password:  hashedPassword
        })
        const saved= await newAdmin.save()
        if(saved){
            return res.status(200).json({
                message:"Admin created",saved
            })
        }


        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error:error.message  || "internal server error"})
        
    }

}
 const login= async(req,res)=>{
    try{ 

    const body= req.body
    const {email,password}= body
    if(!email || !password){
        return res.status(400).json({error:"All fields are required"})
    }
    const adminExist= await adminDb.findOne({email})
    if(!adminExist){
        return res.status(400).json({error:"Admin not found"})
    }
 
 const passwordMatch= await comparePassword(password,adminExist.password)
 if(!passwordMatch){
    return res.status(400).json({error:"Password does not match"})
 }
  const token= await createToken(adminExist._id,"admin")
            res.cookie("Admin_token",token,{
                    httpOnly: true

            })
                    

            
        res.status(200).json({message:"Admin login succesfully",adminExist})

 
        } catch (error) {
         console.log(error);
        res.status(error.status || 500).json({error:error.message  || "internal server error"})
        
    }

 }
 const logout=  async(req,res)=>{
    try {
        res.clearCookie("Admin_token")
        res.status(200).json({message:"Logout succesfully"})
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error:error.message  || "internal server error"})
        
    }
 }
module.exports= {register,login,logout}