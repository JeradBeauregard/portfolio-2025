const multer = require("multer");

const storage = multer.memoryStorage(); // store image in memory buffer
const upload = multer({ storage });

module.exports = upload;
