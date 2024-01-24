const multer = require('multer');
const path = require('node:path');

const storageConfig = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, file, res) => {
    const filename = 'image_' + req.body.id + '.' + file.mimetype.slice(6)
      res(null, filename);
  },
});

const fileFilterConfig = function(req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
  } else {
      cb(null, false);
  }
};

const upload = multer({ storage: storageConfig, fileFilter: fileFilterConfig });

module.exports = upload;