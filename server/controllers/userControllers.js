const userDb = require("../Models/userModel")
const { createToken } = require("../Utilities/generateToken")
const {hashPassword,comparePassword} = require("../Utilities/passwordUtilities")
const register= async(req,res)=>{
    try {
        const body = req.body || {}
        const {name,email,phone,password,confirmpassword}= body
        
        

       

        if(!name || !email || !phone || !password || !confirmpassword){
            return res.status(400).json({error:"All fields are required"})
        }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            return res.status(400).json({error:"Enter a valid email address"})
        }
        if(!/^[6-9]\d{9}$/.test(String(phone))){
            return res.status(400).json({error:"Phone number must be 10 digits and start with 6-9"})
        }
        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password)){
            return res.status(400).json({error:"Password needs 8 characters, uppercase, lowercase, number, and special character"})
        }
       if(password !==confirmpassword){
        return res.status(400).json({error:'Password doest match'})

       }
       const userExit=await userDb.findOne({email})

       if (userExit){
        return res.status(400).json({error:'Email already exists'})
       }
       const hashedPassword= await hashPassword(password)
        const newUser= new userDb({
            name,email,phone,password:hashedPassword
        })
        const saved = await newUser.save()
        if(saved){
            res.clearCookie("token")
            return res.status(201).json({message:'User created'})
        }
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error:error.message  || "internal server error"})
        
    }

}

const login = async (req, res) => {
    try {

        const body = req.body || {}
        const { email, password } = body

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "All fields are required"
            })
        }

        // Find user
        const userExit = await userDb.findOne({ email })

        if (!userExit) {
            return res.status(400).json({
                success: false,
                error: "User not found"
            })
        }

        // Compare password
        const passwordMatch = await comparePassword(
            password,
            userExit.password
        )

        console.log(passwordMatch)

        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                error: "Password does not match"
            })
        }

        // Create token
        const token = await createToken(userExit._id)

        // Store token in cookie
        res.cookie("token", token)

        // Send response
        return res.status(200).json({
            success: true,
            message: "User login successfully",

            token: token,
            userExit

        })

    } catch (error) {

        console.log(error)

        return res.status(error.status || 500).json({
            success: false,
            error: error.message || "Internal server error"
        })
    }
}

const logout= (req,res)=>{
    try {
        res.clearCookie("token")
        res.status(200).json({message:"Logged out"})
        
    } catch (error) {
        console.log(error);
         res.status(error.status || 500).json({error:error.message  || "internal server error"})
        
    }
}

module.exports= {
    register,
    login,
    logout
}