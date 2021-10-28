const express = require("express");
const router = express.Router();
require("dotenv").config();
const signupUserPaypal = require("../models/signupUserPaypal");
const {
  ROUTE_addsignupPaypal,
  ROUTE_remoteURI,
} = require("../constants/routePaths");
const { MongoClient } = require("mongodb");

//initialize db connectivity options
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

/**
 * @swagger
 * /signup/signupPaypal:
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
 *                  - firstName
 *                  - lastName
 *                  - totalAmount
 *                  - amountPerDoor
 *                  - transactionId
 *                  - consent
 *                  - subscription
 *              properties:
 *                   email:
 *                      type: string
 *                   firstName:
 *                      type: string
 *                   lastName:
 *                      type: string
 *                   totalAmount:
 *                      type: number
 *                   amountPerDoor:
 *                      type: number
 *                   transactionId:
 *                      type: string
 *                   consent:
 *                      type: boolean
 *                   subscription:
 *                      type: boolean
 *    responses:
 *        200:
 *           description: 'user created with paypal  Successfully'
 */
router.post(ROUTE_addsignupPaypal, async (req, res) => {
  const newUserObj = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    totalAmount: req.body.totalAmount,
    amountPerDoor: req.body.amountPerDoor,
    transactionId: req.body.transactionId,
    consent: req.body.consent,
    subscription: req.body.subscription,
  };
  const client = new MongoClient(ROUTE_remoteURI, options);
  try {
    await client.connect();
    const database = client.db("adventCalendar");
    const collection = database.collection("paypalSignup");
    const newUser = await collection.insertOne(newUserObj);
    return res.json(newUser);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

module.exports = router;
