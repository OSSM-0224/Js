let express = require("express");

const upload = require("../config/multer");
const sendFiles = require("../config/imagekit");

let router = express.Router();

router.post("/upload-files", upload.single("image"), async (req, res) => {
  console.log(req.file);

  let file = req.file;


  let uploadedFiles = await sendFiles(file.buffer, file.originalname);
  console.log("uploaded Files =>", uploadedFiles);

  res.send("Ok");
});
module.exports = router;
