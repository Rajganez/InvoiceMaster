import { db } from "../DB/mongo-db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Distributor Collection
export const distributorCollection = db.collection("Distributor");
//Retailer Collection
export const retailerCollection = db.collection("Retailer");

//Cookie Token for both the Retailer and Distributor Login
const createToken = (email, userRole) => {
  return jwt.sign({ mail: email, Id: userRole }, process.env.JWT_KEY, {
    expiresIn: "1d",
  });
};
//Middleware to set the cookie token in the response
const cookieOptions = {
  httpOnly: true,
  secure: "production",
  sameSite: "None",
  expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
};
//Function to extract username from the email address
const userName = (mailId) => {
  return mailId.split("@")[0];
};

//--------------------Manual Login/Sign Up--------------------//

export const loginSignUp = async (req, res) => {
  const { email, password, Role } = req.body;
  try {
    const username = userName(email);
    //Hash the password if it is not gmailOauth Login
    const hashedPassword = await bcrypt.hash(
      password !== true ? password : "true",
      10
    );
    //If the Role is Distributor, Check the credentials and authenticate
    if (Role === "distributor") {
      const findDistributor = await distributorCollection.findOne({
        email: email,
      });
      //Insert the distributor data if the email not exsists
      if (!findDistributor) {
        await distributorCollection.insertOne({
          email: email,
          password: password === true ? true : hashedPassword,
          InvoiceLimit: 20,
        });
        const getId = await distributorCollection.findOne({ email: email });
        res.cookie("jwt", createToken(email, Role), cookieOptions);
        return res.status(201).json({
          msg: "Signed-Up successfully",
          user: username,
          id: getId._id.toString(),
        });
      } else if (findDistributor) {
        //If it is an gmail OAuth login then login with the boolean value
        if (findDistributor.password === true) {
          res.cookie("jwt", createToken(email, Role), cookieOptions);
          return res.status(200).json({
            msg: "Logged-In successfully",
            user: username,
            id: findDistributor._id.toString(),
          });
        }
        //If it is a manual login then compare the hashed password
        else {
          const isMatch = await bcrypt.compare(
            password,
            findDistributor.password
          );
          if (isMatch) {
            res.cookie("jwt", createToken(email, Role), cookieOptions);
            return res.status(200).json({
              msg: "Logged-In successfully",
              user: username,
              id: findDistributor._id.toString(),
            });
          } else {
            return res
              .status(401)
              .json({ msg: "Password Mismatch, Unauthorized" });
          }
        }
      }
    }
    //Retailer Condition to enter the data for the Retailer account
    else if (Role === "retailer") {
      const findRetailer = await retailerCollection.findOne({
        email: email,
      });
      //Insert the Retailer data if the email not exsists
      if (!findRetailer) {
        await retailerCollection.insertOne({
          email: email,
          password: password !== true ? hashedPassword : password,
          Invoice_Data: [],
          Issuer_Id: [],
        });
        const getId = await retailerCollection.findOne({ email: email });
        res.cookie("jwt", createToken(email, Role), cookieOptions);
        return res.status(201).json({
          msg: "Signed-Up successfully",
          user: username,
          id: getId._id.toString(),
        });
      } else if (findRetailer) {
        if (findRetailer.password === true) {
          res.cookie("jwt", createToken(email, Role), cookieOptions);
          return res.status(200).json({
            msg: "Logged-In successfully",
            user: username,
            id: findRetailer._id.toString(),
          });
        } else {
          const isMatch = await bcrypt.compare(password, findRetailer.password);
          if (isMatch) {
            res.cookie("jwt", createToken(email, Role), cookieOptions);
            return res
              .status(200)
              .json({
                msg: "Logged-In successfully",
                user: username,
                id: findRetailer._id.toString(),
              });
          } else {
            return res
              .status(401)
              .json({ msg: "Password Mismatch, Unauthorized" });
          }
        }
      }
    }
  } catch (error) {
    return res.status(500).send({ msg: "Error: " + error.message });
  }
};

//--------------------Get Retailer Details--------------------//

export const getRetailerDetails = async (req, res) => {
  try {
    const retailerData = await retailerCollection
      .find({}, { email: 1, _id: 1, password: 0 })
      .toArray();
    const retailer = [];
    for (const data of retailerData) {
      retailer.push({
        id: data._id.toString(),
        value: userName(data.email),
        label: userName(data.email).toUpperCase(),
      });
    }
    return res.status(200).json({ retailer });
  } catch (error) {
    return res.status(500).send({ msg: "Error: " + error.message });
  }
};

//-------------------Log Out function------------------------//

export const logout = (req, res) => {
  res.clearCookie("jwt");
  return res.status(200).json({ msg: "Logged-Out successfully" });
};
