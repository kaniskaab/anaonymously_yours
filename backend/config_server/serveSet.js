const express = require("express");
const router = express.Router();

const {postData,getData} = require('../controllers/control_encrypt');

router.route("/post").post(postData);
router.route("/:id").get(getData);



module.exports= router