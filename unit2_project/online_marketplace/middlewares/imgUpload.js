const multer = require("multer");

const diskStorage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, "./public/images");
        },

        filename: function (req, file, cb) {
            const uniqueSuffix = new Date(Date.now()).toISOString().slice(0, 10);
            cb(null, `${file.originalname} - ${uniqueSuffix}`);
        }
    }
);

const imgUpload = multer({ storage: diskStorage });

module.exports = imgUpload;