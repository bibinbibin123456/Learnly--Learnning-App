const courseDb = require("../Models/courseModel")
const { uploadToCloudinary, deleteFromCloudinary, publicIdFromUrl } = require("../Utilities/imageUpload")

const create =async(req,res)=>{
    try {
        const body = req.body || {}
        const title = body.title ?? body.Title ?? body.TITLE ?? body.name
        const description = body.description ?? body.Description ?? body.DESCRIPTION
        const duration = body.duration ?? body.Duration ?? body.DURATION
        const price = body.price ?? body.Price ?? body.PRICE

        if(!title || !description || !duration || !price){
            return res.status(400).json({error:"All fields are required"})
        }
        if(!req.file && !req.files?.[0]){
            return res.status(400).json({error:'image not found'})
        }

        const uploadedFile = req.file || req.files?.[0]
        const cloudinaryRes= await uploadToCloudinary(uploadedFile.path)
        console.log(cloudinaryRes, "image uploaded by cloudinary");

       const newCourse= new courseDb({
        title: String(title).trim(),
        description: String(description).trim(),
        duration: String(duration).trim(),
        price: Number(price),
        image: cloudinaryRes.url,
        imagePublicId: cloudinaryRes.publicId
       })      
        
       let savedCourse = await newCourse.save()
       if(savedCourse){
        return res.status(200).json({message:"Course added",savedCourse})
       }
    } catch (error) {
        console.log(error);
        res.status(error.status  ||  500).json({error:error.message})
        
        
    }

}

const listCourse= async(req,res)=>{
    try {
        const courseList= await courseDb.find()

        res.status(200).json(courseList)

        
        
    } catch (error) {
        console.log(error);
        res.status(error.status  ||  500).json({error:error.message})
        
    }
}
    const courseDetails= async(req,res)=>{
            try {
                const {courseId} =req.params;

                const courseDetails= await courseDb.findById({_id:courseId})
                if(!courseDetails){
                    return res.status(400).json({error:"Course not found"})
                }
                return res.status(200).json(courseDetails)
            } catch (error) {
                console.log(error);
        res.status(error.status  ||  500).json({error:error.message})
                
            }
        }
const updateCourse=async(req,res)=>{
    try {
        const {courseId}=req.params
        const{title,description,duration,price}=req.body
        let imageUrl;
        let isCourseExist= await courseDb.findById(courseId)

        if(!isCourseExist){
            return res.status(400).json({error:"course not found"})
        }
        let imagePublicId = isCourseExist.imagePublicId
        if(req.file){
         const cloudinaryRes= await uploadToCloudinary(req.file.path)
        imageUrl= cloudinaryRes.url
        imagePublicId = cloudinaryRes.publicId
        await deleteFromCloudinary(isCourseExist.imagePublicId || publicIdFromUrl(isCourseExist.image))
        }
        const update = {title,description,duration,price}
        if (imageUrl) {
            update.image = imageUrl
            update.imagePublicId = imagePublicId
        }
        const courseUpdate= await courseDb.findByIdAndUpdate(courseId,update,{new:true})
    res.status(200).json({message:"course updated",courseUpdate})
    } catch (error) {
        console.log(error);
        res.status(error.status  ||  500).json({error:error.message})
        
    }
}
const deleteCourse= async(req,res)=>{
    try {
        const {courseId}= req.params;
        const deleteCourse=  await courseDb.findByIdAndDelete(courseId)
        if(!deleteCourse){
            return res.status(400).json({error:'course not found'})
        }
        await deleteFromCloudinary(deleteCourse.imagePublicId || publicIdFromUrl(deleteCourse.image))
        res.status(200).json({message:"Course deleted"})
    } catch (error) {
        console.log(error);
        res.status(error.status  ||  500).json({error:error.message})
    }
}

module.exports={
    create,
    listCourse,
    courseDetails,
    updateCourse,
    deleteCourse
}