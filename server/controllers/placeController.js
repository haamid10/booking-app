
// const Place = require('../models/Place');
const multer= require('multer');
const imageDownloader = require('image-downloader');
const fs = require('fs')




exports.uploadByLink =  async (req,res) => {
    const {link} = req.body;
    const newName= 'photo'+ Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname+ '\\uploads/'+ newName,
    });
    res.json(newName);
}
// app.post('/upload-by-link' ,
const photosMIddleware = multer({dest: 'uploads'})

exports.Upload = photosMIddleware.array('photos',100),(req,res)=>{
    const uploadedFiles = [];
   for (let i =0;i < req.files.length; i++){
    const {path, originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length-1];
    const newPath = path + '.' + ext ;
    fs.renameSync(path,newPath);
    uploadedFiles.push(newPath.replace("uploads",""));
    
   }
    console.log(uploadedFiles)
    res.json(uploadedFiles)
    
}
// app.post('/upload',
