const user = require('../MODELS/user'); 
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken');

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
                const passOK = bcrypt.compareSync(password,userDoc.password);
                if(passOK){
                    const token = jwt.sign({_id:userDoc._id, email: userDoc.email, name : userDoc.name},process.env.JWT_SECRET,{},
                        (err,token)=> {
                            if(err) throw err;
                            res.cookie('token', token) .json(userDoc)
                    })
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

exports.profile = (req, res) => {
    
   

        const {token} = req.cookies;
       
        if(token){
            jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData)=> {
                if (err) throw err;
                res.json(userData);
            })
        }
        else {
            res.json( null)
    }
   
}

exports.logOut = async (req,res) => {
    res.clearCookie('token').json({message:"Logged out"})
}