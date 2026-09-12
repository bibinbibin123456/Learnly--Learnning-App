const cloudinary= require('../config/cloudinaryConfig')

const uploadToCloudinary =(filepath)=>{
    return new Promise((resolve,reject)=>{
        cloudinary.uploader.upload(
            filepath,
            {
                folder:"courses",
                resource_type:"image",
                quality:"auto:best",
                fetch_format:"auto",
                use_filename:true,
                unique_filename:true
            },
            (error,result)=>{
                if(error) return reject(error)
                    resolve({url:result.secure_url, publicId:result.public_id})
            } 
        );
            }
        )
    }

const deleteFromCloudinary = (publicId) => {
    if (!publicId) return Promise.resolve()
    return cloudinary.uploader.destroy(publicId, {resource_type:"image"})
}

const publicIdFromUrl = (imageUrl) => {
    if (!imageUrl) return null
    const uploadPart = imageUrl.split('/upload/')[1]
    if (!uploadPart) return null
    return uploadPart.replace(/^v\d+\//, '').replace(/\.[^/.]+$/, '')
}

module.exports = { uploadToCloudinary, deleteFromCloudinary, publicIdFromUrl }