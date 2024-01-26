const multer = require('multer');
const path = require('node:path');

const storageConfig = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, file, res) => {
    const filename = 'image_' + Date.now().toString().slice(0, 10) + '.' + file.mimetype.slice(6)
      res(null, filename);
  },
});

const fileFilterConfig = function(req, file, cb) {
  if (file.mimetype === "image/png") {
      cb(null, true);
  } else {
      cb(null, false); 
  }
};

const upload = multer({ storage: storageConfig, fileFilter: fileFilterConfig });

module.exports = upload;