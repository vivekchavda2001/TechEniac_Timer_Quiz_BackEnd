const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const AppService = {
  addUser: async (req) => {
    const userData = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hashedPassword;
    const newUser = new User(userData);
    try {
      const user = await newUser.save();
      return {
        message: "User added successfully",
        data: user
      };
    } catch (e) {
      return e;
    }
  },
  authenticateUser: async (req) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return {
          status: 404,
          message: "User not found",
        };
      }
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        return {
          status: 200,
          message: "User authenticated",
          data: user,
        };
      } else {
        return {
          status: 404,
          message: "Invalid password",
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        error: error.message,
      };
    }
  },
};

module.exports = AppService;
