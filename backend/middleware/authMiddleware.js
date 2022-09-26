import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'

const protect = expressAsyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      console.log(decoded)

      next()
    } catch (error) {}
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized , No Token')
  }
  next()
})

export { protect }
