const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');


const s3 = new aws.S3({
    accessKeyId: "AKIATDPBLE7GKEX52RWM",
    secretAccessKey: "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",
    Bucket: "slackclonetesting",
});

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "slackclonetesting",
        key: function (req, file, cb) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '__--__' + Date.now() + path.extname(file.originalname))
        }
    })
})

module.exports = (app) =>{

    app.post('/api/upload', upload.array('photos'), function (req, res, next) {

        let fileArray = req.files, fileLocation;
        const galleryImgLocationArray = [];
        for (let i = 0; i < fileArray.length; i++) {
            fileLocation = fileArray[i].location
            galleryImgLocationArray.push(fileLocation)
        }

        let response = {
            s3locationArray: galleryImgLocationArray
        }

        res.json(response)

    })

}
