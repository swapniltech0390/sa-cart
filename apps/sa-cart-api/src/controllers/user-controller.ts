import User, { IUser } from '../models/user';

const signUp = async (req,res) =>{
const newuser = new User(req.body);

    if (newuser.password != newuser.password2)
      return res.status(401).json({ error: 'password not match' });

    try {
      const user = await User.findOne({ email: newuser.email });

      if (user)
        return res.status(409).json({ isAuth: false, error: 'email exits' });

      const userProfile: IUser = await newuser.save();
      res.status(201).json({
        isAuth: true,
        user: {
          id: userProfile._id,
          email: userProfile.email,
          firstname: userProfile.firstname,
          lastname: userProfile.lastname,
          role: userProfile.role
        },
      });
    } catch (error) {
      if (error) {
        console.log(error);
        return res.status(400).json({error:error});
      }
    }
}

const login = async (req, res)  =>{
  let token = req.cookies.auth;
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4000')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, application/json; charset=utf-8')
   const isTokenValid = await User.findByToken(token);
    if (isTokenValid)
        return res.status(406).json({
          isAuth: false,
          error: "You are already logged in",
        });
      else {
        try {
          const userProfile =  await User.findOne({ email: req.body.email });
          const isMatch = await userProfile.comparePassword(req.body.password);
            
           if (!userProfile || !isMatch)
            return res.status(401).json({
              isAuth: false,
              error: "Invalid Credentials",
            });     

        userProfile.generateToken();  
        return res.cookie("auth", userProfile.token).json({
                      isAuth: true,
                      user: {
                        id: userProfile._id,
                        email: userProfile.email,
                        firstname: userProfile.firstname,
                        lastname: userProfile.lastname,
                        role: userProfile.role,
                      },
                    });
        } catch (error) {
           res.status(400).send({error:error})
        }
      }
};

const logout =async (_req,res) => {
  try {
    await User.deleteToken();
    res.status(200).send('OK');
  } catch (error) {
    res.status(400).send({error:error})
  }
}

const profile =async ({user},res) => {
 res.json({
      isAuth: true,
      id: user._id,
      email: user.email,
      name: `${user.firstname} ${user.lastname}`,
      role:user.role
  });
}

export const UserController = {
  signUp,
  login,
  logout,
  profile
}
