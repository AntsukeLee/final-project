const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("./secrets");
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_ID,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.upload = (req, res, next) => {
    console.log("req.body in s3.js: ", req.body);
    console.log("req.file in s3.js", req.file);
    if (!req.file) {
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            // it worked!!!
            next();
            fs.unlink(path, () => {});
        })
        .catch((err) => {
            // uh oh
            res.sendStatus(500);
            console.log(err);
        });
};
