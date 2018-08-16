const user = require('../models/user.js')
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const saltRounds = 10;


class Controller{

    static register(req,res){
        console.log(req.body)
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(req.body.password, salt);
        user.findOne({
            email:req.body.email
        })
        .then(function(mail){
            if(!mail){
                user.create({
                    first_name : req.body.first_name,
                    last_name : req.body.last_name,
                    email : req.body.email,
                    password : hash
                })
                .then(function(dataUser){
                    console.log(dataUser)
                    var token = jwt.sign({id:dataUser._id,name:dataUser.name,email:dataUser.email},process.env.secretKey)
                    res.status(200).json({
                        dataUser,token
                    })
                })
                .catch((err)=>{
                    res.json(err)
                    console.log(err)
                })
            }else{
                res.json("account sudah ada")
            }
        })  
     
    }

    static authentication(req,res,next){
        var decoded = jwt.verify(req.headers.token, process.env.secretKey)

        if(decoded){
            next()
        }else{
            res.status(400).json('error')
        }
    }

    static login(req,res){
        user.findOne({
            email : req.body.email
        })
        .then(function(dataUser){
            if(dataUser){
                let checkPassword = bcrypt.compareSync(req.body.password, dataUser.password)
                var token = jwt.sign({id:dataUser._id,name:dataUser.name,email:dataUser.email},process.env.secretKey)
                if(checkPassword){

                    res.json({dataUser,token})
                }else{
                    res.json(false)
                }
            }else{
                res.json('empty')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

}

module.exports = Controller