const authService = require('../services/authService');

exports.signup = async (req, res) => {
  try {
    const user = await authService.createUser(req.body);
    res.status(201).json({
      message: "User created successfully",
      userId: user.id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await authService.validateUser(req.body.email, req.body.password);
    if (user) {
      res.json({
        message: "Authentication successful",
        userId: user.id
      });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
