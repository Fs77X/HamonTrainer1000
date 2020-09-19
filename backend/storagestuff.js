const AWS = require('aws-sdk')
const fs = require("fs")
var s3
const bucket = 'jojoaudio'
const path = require('path');
const initS3 = function () {
    const awsConfig = {
        "region": "us-east-1",
        "accessKeyId": process.env.ACC_Key, "secretAccessKey": process.env.SEC_Key

    }
    console.log(awsConfig)
    AWS.config.update(awsConfig)
    s3 = new AWS.S3({ apiVersion: '2006-03-01' });


}

initS3()


const upload_file = async function (req, res) {
    try {
        if (!req.files) {
            res.status(400).send({
                status: false,
                message: "Bad request"
            })
        }
        let uploadParams = {Bucket: bucket, Key: '', Body: ''};
        let avatar = req.files.avatar
        const fileLoc = './sound/' + avatar.name
        await avatar.mv('./sound/' + avatar.name)
        let fileStream = fs.createReadStream(fileLoc);
        fileStream.on('error', function (err) {
            console.log('File Error', err);
            res.status(500).send({
                status: false,
                message: err
            })
        });
        uploadParams.Body = fileStream;
        
        uploadParams.Key = path.basename(fileLoc);

        // call S3 to retrieve upload file to specified bucket
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                console.log("Error", err);
                res.status(400).send({
                    status: false,
                    message: err
                })
            } if (data) {
                console.log("Upload Success", data.Location);
                res.send({ message: 'good job' })
            }
        });
        

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err })
    }
}

module.exports = {
    upload_file
}