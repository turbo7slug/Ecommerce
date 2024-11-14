const cloudinary = require("cloudinary");

cloudinary.config({ 
    cloud_name: 'dlfdg4gil', 
    api_key: '679341145166464', 
    api_secret: 'BTXUVu90j9818omAcAhWTS-ieGo' 
  });

  const  cloudinaryUploadImg = async(fileToUpload) => {
    try{
      return await new Promise((resolve)=>{
        cloudinary.uploader.upload(fileToUpload,(result)=>{
            resolve(
                {
                    url : result.secure_url,
                    asset_id : result.asset_id,
                    public_id : result.public_id
                },{
                    resource_type : "auto"
                }
            )
        })
    })
    
    }
   catch(err){
    throw new Error(err)
   }
  }
  const  cloudinaryDeleteImg = async(fileToDelete) => {
    try{
      return await new Promise((resolve)=>{
        cloudinary.uploader.destroy(fileToDelete,(result)=>{
            resolve(
                {
                    url : result.secure_url,
                    asset_id : result.asset_id,
                    public_id : result.public_id
                },{
                    resource_type : "auto"
                }
            )
        })
    })
    
    }
   catch(err){
    throw new Error(err)
   }
  }

  module.exports = {cloudinaryUploadImg, cloudinaryDeleteImg}