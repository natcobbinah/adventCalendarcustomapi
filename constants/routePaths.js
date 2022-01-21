const remoteURI =
  "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.xxxxx.mongodb.net/sms?authSource=admin";
//flutter app test
const addFlutterUser = "/addFlutterUser";
const getAllFlutterUsers = "/getFlutterUsers";
const loginFlutterUser = "/login";
const getadventUserCalendar = "/getAdventUserCalendar"

//signup user
const addsignupPaypal = "/signupPaypal";

module.exports = {
  ROUTE_remoteURI: remoteURI,
  ROUTE_addFlutterUser: addFlutterUser,
  ROUTE_getFlutterUser: getAllFlutterUsers,
  ROUTE_loginFlutterUser: loginFlutterUser,
  ROUTE_addsignupPaypal: addsignupPaypal,
  ROUTE_getAdventUserCalendar: getadventUserCalendar,
};
