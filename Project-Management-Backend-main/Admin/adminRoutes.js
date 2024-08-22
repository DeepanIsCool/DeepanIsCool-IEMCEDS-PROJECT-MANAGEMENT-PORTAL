const express = require("express");
const router = express.Router();
const {
 signin,

} = require("../Admin/adminController");



router.route("/signin").post(signin);





module.exports = router;