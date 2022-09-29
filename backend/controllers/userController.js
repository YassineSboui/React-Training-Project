import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generatToken from '../utils/generateToken.js'

//@desc Auth user & get token
//@route POST /api/users/login
//@acess Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generatToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }
})

//@desc Get user profile
//@route POST /api/users/profile
//@acess Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('Inalid email or passowrd')
  }
})

export { authUser, getUserProfile }
