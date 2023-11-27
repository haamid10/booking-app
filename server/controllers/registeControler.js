const user = require('../MODELS/user'); 
const bcrypt= require('bcrypt')
// Update the import statement to use lowercase 'user'

exports.register = async (req,res) => {
    const {name,password,email} =req.body;
    const sec=bcrypt.genSaltSync(10);
   const userDoc= await user.create({
        name,
        email,
        password:bcrypt.hashSync(password,sec),

    })
    res.json(userDoc)
    
}
