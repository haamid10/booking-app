const user = require('../MODELS/user'); 
const bcrypt= require('bcrypt')
// Update the import statement to use lowercase 'user'

exports.register = async (req,res) => {
    const {name,password,email} =req.body;
    try{
        const sec=bcrypt.genSaltSync(10);
        const userDoc= await user.create({
             name,
             email,
             password:bcrypt.hashSync(password,sec),
     
         })
         res.json(userDoc)
    }catch (e) {
        res.status(422).json(e)
    }
}

exports.login = async (req,res) => {
    const {email,password}= req.body;
    if(!email || !password){
        res.status(422).json({error:"please add email or password"})
    }   
    else{   
        // console.log("here")
        try{
            const userDoc= await user.findOne({email})
            if(userDoc){
                if(bcrypt.compareSync(password,userDoc.password)){
                    res.json({message:"successfully signed in"})
                }
                else{
                    res.status(422).json({error:"invalid email or password"})
                }
            }
            else{
                res.status(422).json({error:"invalid email or password"})
            }
        }
        catch(e){
            res.status(422).json({error:"invalid email or password"})
        }
    }
}
   
