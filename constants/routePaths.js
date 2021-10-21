const remoteURI =
  "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.1ljd7.mongodb.net/sms?authSource=admin";
//flutter app test
const addFlutterUser = "/addFlutterUser";
const getAllFlutterUsers = "/getFlutterUsers";
const loginFlutterUser = "/login";

module.exports = {
  ROUTE_remoteURI: remoteURI,
  ROUTE_addFlutterUser: addFlutterUser,
  ROUTE_getFlutterUser: getAllFlutterUsers,
  ROUTE_loginFlutterUser: loginFlutterUser,
};
