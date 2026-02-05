const CreateUserModel = require("../models/user-model")

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//@desc Create User
const create = async (req, res) => {
  try {
    const { email, mobileNumber, password, ...otherFields } = req.body;

    // Check if user with email already exists
    const userEmailExist = await CreateUserModel.findOne({ email });
    if (userEmailExist) {
      return res.status(400).json({
        statusCode: 1002,
        message: "User email already exists",
        data: {},
      });
    }

    // Check if mobile number already exists
    const mobileNumberExist = await CreateUserModel.findOne({ mobileNumber });
    if (mobileNumberExist) {
      return res.status(400).json({
        statusCode: 1002,
        message: "Mobile number already exists",
        data: {},
      });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document with hashed password
    const createUserData = new CreateUserModel({
      email,
      mobileNumber,
      password: hashedPassword,
      ...otherFields
    });

    // Save user to DB
    const savedUser = await createUserData.save();

    // 🔐 Generate token (same payload as login)
    const accessToken = jwt.sign(
      {
        user: {
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          mobileNumber: savedUser.mobileNumber,
          email: savedUser.email,
          id: savedUser._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );

    return res.status(201).json({
      statusCode: 1000,
      message: "User created successfully",
      data: {
        accessToken,
      },
    });

  } catch (error) {
    return res.status(400).json({ message: "Validation failed", details: error.message });
  }
};


//@desc Login User
async function handleLoginUser(req, res) {
  try {

    const { email, password } = req.body;

    // Find user by email
    const user = await CreateUserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        statusCode: 1003,
        message: "Invalid email",
        data: {},
      });
    }

    // Compare hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        statusCode: 1003,
        message: "Invalid email or password",
        data: {},
      });
    }

    // Login success
    const accessToken = jwt.sign({
      user:{
        firstName:user.firstName,
        lastName:user.lastName,
        mobileNumber:user.mobileNumber,
        email:user.email,
        id:user._id
      }
    }, process.env.ACCESS_TOKEN_SECRET,{
      expiresIn:"59m"
    })
    return res.status(200).json({
      statusCode: 1000,
      message: "Login successful",
      data: {
        accessToken,
      },
    });

  } catch (error) {
    return res.status(500).json({
      statusCode: 1001,
      message: "Internal server error",
      data: {},
    });
  }
}


module.exports = {
  create,handleLoginUser
};