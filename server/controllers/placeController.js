// const user = require('../MODELS/user'); 
// const bcrypt= require('bcrypt')
// const jwt = require('jsonwebtoken');
// const imageDownloader= require('image-downloader')

// exports.images = async (req,res) => {
//     const {link} = req.body;
//     const newName= Date.now() + '.jpg'
//     await imageDownloader.image({
//         url: link,
//         dest: __dirname+'../uploads',
//     });
//     res.json(__dirname + '../uploads'+newName);

// }