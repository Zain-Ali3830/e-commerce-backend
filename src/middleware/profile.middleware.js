export const profileMiddleware = (req, res, next) => {
    const {password,confirmPassword}=req.body;
    if(password!==confirmPassword){
        return res.status(400).json({
            message:"Password and confirm password do not match",
        })
    }
    next();
};