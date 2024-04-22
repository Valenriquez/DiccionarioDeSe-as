require('dotenv').config()
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3')

const AWS_BUCKET_NAME=process.env.AWS_BUCKET_NAME
const AWS_BUCKET_REGION=process.env.AWS_BUCKET_REGION
const AWS_PUBLIC_KEY=process.env.AWS_PUBLIC_KEY
const AWS_SECRET_KEY=process.env.AWS_SECRET_KEY

const client = new S3Client({ region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY,

    }

});

async function uploadFile(pathFile) {
    const stream = fs.createReadStrewam(pathFile);

    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: files,
        Body: stream
    };
    const command = new PutObjectCommand(uploadParams)
    return await client.send(command)
}

module.exports {
    uploadFile
}