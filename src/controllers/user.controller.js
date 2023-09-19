const UserService = require("../services/user.service");
const AppController =  {
  addUser: async (req, res, next) => {
    try {
      const result = await UserService.addUser(req);
      res.status(201).json(result);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  login: async (req, res, next) => {
    try {
      const result = await UserService.authenticateUser(req);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
module.exports = AppController;
