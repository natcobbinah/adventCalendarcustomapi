const express = require("express");
const router = express.Router();
require("dotenv").config();
const FlutterUsers = require("../models/flutterUser");
const {
  ROUTE_addFlutterUser,
  ROUTE_getFlutterUser,
  ROUTE_loginFlutterUser,
  ROUTE_remoteURI,
  ROUTE_getAdventUserCalendar,
} = require("../constants/routePaths");
const { MongoClient } = require("mongodb");

//initialize db connectivity options
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

/**
 * @swagger
 * /flutter/getFlutterUsers:
 *  get:
 *    description: Retrieve all users in the system
 *    responses:
 *        200:
 *           description: 'All tickets retrieved successfully'
 */
router.get(ROUTE_getFlutterUser, async (req, res) => {
  const client = new MongoClient(ROUTE_remoteURI, options);
  try {
    await client.connect();
    const database = client.db("adventCalendar");
    const collection = database.collection("users");
    const users = await collection.find({}).toArray();
    res.json(users);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

/**
 * @swagger
 * /flutter/addFlutterUser:
 *  post:
 *    description: Add new User into the system
 *    produces:
 *          application/json
 *    parameters:
 *        - in: body
 *          name: Add new User into the system
 *          schema:
 *              type: object
 *              required:
 *                  - email
 *                  - pinCode
 *              properties:
 *                   email:
 *                      type: string
 *                   pinCode:
 *                      type: string
 *    responses:
 *        200:
 *           description: 'Flutter created Successfully'
 */
router.post(ROUTE_addFlutterUser, async (req, res) => {
  const newUserObj = {
    email: req.body.email,
    pinCode: req.body.pinCode,
  };
  const client = new MongoClient(ROUTE_remoteURI, options);
  try {
    await client.connect();
    const database = client.db("adventCalendar");
    const collection = database.collection("users");
    const newUser = await collection.insertOne(newUserObj);
    return res.json(newUser);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

/**
 * @swagger
 * /flutter/login:
 *  post:
 *    description: Login Users into the system
 *    produces:
 *          application/json
 *    parameters:
 *        - in: body
 *          name: Login registered user
 *          schema:
 *              type: object
 *              required:
 *                  - email
 *                  - pinCode
 *              properties:
 *                  email:
 *                    type: string
 *                  pinCode:
 *                    type: string
 *    responses:
 *        200:
 *           description: 'User loggedIn successfully'
 */
router.post(ROUTE_loginFlutterUser, async (req, res) => {
  const client = new MongoClient(ROUTE_remoteURI, options);
  try {
    await client.connect();
    const { email, pinCode } = req.body;

    const database = client.db("adventCalendar");
    const collection = database.collection("users");
    const foundUser = await collection.findOne(
      {},
      {
        _id: 0,
        email: email,
        pinCode: pinCode,
      }
    );
    return res.json(foundUser);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

/**
 * @swagger
 * /flutter/getAdventUserCalendar:
 *  get:
 *    description: Retrieve all user adventCalendar in the system
 *    responses:
 *        200:
 *           description: 'All adventUser Calendar retrieved successfully'
 */
router.get(ROUTE_getAdventUserCalendar, async (req, res) => {
  const client = new MongoClient(ROUTE_remoteURI, options);
  try {
    await client.connect();
    const database = client.db("adventCalendar");
    const collection = database.collection("adventUserCalendar");
    const userAdventCalendar = await collection.find({}).toArray();
    res.json(userAdventCalendar);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

module.exports = router;
