import User from '../models/user';

const signUp = async (req,res) =>{
const newuser = new User(req.body);

    if (newuser.password != newuser.password2)
      return res.status(401).json({ message: 'password not match' });

    try {
      const user = await User.findOne({ email: newuser.email });

      if (user)
        return res.status(409).json({ auth: false, message: 'email exits' });

      const doc = await newuser.save();
      res.status(201).json({
        succes: true,
        user: {
          id: doc._id,
          email: doc.email,
          firstname: doc.firstname,
          lastname: doc.lastname,
        },
      });
    } catch (error) {
      if (error) {
        console.log(error);
        return res.status(400).json({ success: false });
      }
    }
}

const login = async (req, res)  =>{
  let token = req.cookies.auth;
   const isTokenValid = await User.findByToken(token);
    if (isTokenValid)
        return res.status(406).json({
          error: true,
          message: "You are already logged in",
        });
      else {
        try {
          const userProfile =  await User.findOne({ email: req.body.email });
          const isMatch = await userProfile.comparePassword(req.body.password);
            
           if (!userProfile || !isMatch)
            return res.status(401).json({
              isAuth: false,
              message: "Invalid Credentials",
            });     

        userProfile.generateToken();  
        return res.cookie("auth", userProfile.token).json({
                      isAuth: true,
                      user: {
                        id: userProfile._id,
                        email: userProfile.email,
                        firstname: userProfile.firstname,
                        lastname: userProfile.lastname,
                      },
                    });
        } catch (error) {
           res.status(400).send(error)
        }
      }
};

const logout =async (_req,res) => {
  try {
    await User.deleteToken();
    res.sendStatus(200);
  } catch (error) {
    res.status(400).send(error)
  }
}

const profile =async (req,res) => {
 res.json({
      isAuth: true,
      id: req.user._id,
      email: req.user.email,
      name: req.user.firstname + req.user.lastname,
  });
}

export const UserController = {
  signUp,
  login,
  logout,
  profile
}
