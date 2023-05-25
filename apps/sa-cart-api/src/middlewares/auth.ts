import User from ".././models/user";

export const auth = async (req, res, next) =>{
 let token = req.cookies.auth;
 try {
  const user = await User.findByToken(token);
   if (!user)
      return res.json({
        error: true,
      });
       req.token = token;
    req.user = user;
    next();
 } catch (error) {
   throw error;
 }
}

