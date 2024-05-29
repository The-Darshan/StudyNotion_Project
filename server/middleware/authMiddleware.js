const jwt = require("jsonwebtoken")
require("dotenv").config()
// auth
exports.auth = (req,res,next) => {
    try{
        const token = req.cookies.token || req.header("Authorization").replace("Bearer ","")||req.body.token
        if(!token){
            return res.status(400).json({
                success:false,
                Message:"Invalid Token"
            })
        }
        try{
            const payload = jwt.verify(token,process.env.JWT_SECRET)

            req.user = payload

        }catch(err){
            return res.status(401).json({
                status:false,
                Error:err,
                Message:"Token is invlaid"
        })
    }
    next()
}catch(err){
        return res.status(500).json({
            status:false,
            Error:err,
            Message:"Something went wrong"
    })
}
}
// Student
exports.isStudent =  (req,res,next)=>{
    try{
        const{role} = req.user

        if(role!=="Student"){
            return res.status(401).json({
                status:false,
                Message:"Protected Route for Student"
        })
        }
     next()   
    }catch(err){
        return res.status(500).json({
            status:false,
            Error:err,
            Message:"Something went wrong in Student"
    })
} 
}
// Instructor


exports.isInstructor =  (req,res,next)=>{
    try{
        const{role} = req.user

        if(role!=="Instructor"){
            return res.status(401).json({
                status:false,
                Message:"Protected Route for Instructor"
        })
        }
     next() 

    }catch(err){
        return res.status(500).json({
            status:false,
            Error:err,
            Message:"Something went wrong in Instructor"
    })
} 
}

// isAdmin

exports.isAdmin =  (req,res,next)=>{
    try{
        const{role} = req.user

        if(role!=="Admin"){
            return res.status(401).json({
                status:false,
                Message:"Protected Route for Admin"
        })
        }
     next() 

    }catch(err){
        return res.status(500).json({
            status:false,
            Error:err,
            Message:"Something went wrong in Admin"
    })
} 
}


exports.isEligible =  (req,res,next)=>{
    try{
        const{role} = req.user

        if(role!=="Admin" && role!=="Instructor"){
            return res.status(401).json({
                status:false,
                Message:"Protected Route for Admin and Instructor"
        })
        }
     next() 

    }catch(err){
        return res.status(500).json({
            status:false,
            Error:err,
            Message:"Something went wrong in Admin and Instructor"
    })
} 
}