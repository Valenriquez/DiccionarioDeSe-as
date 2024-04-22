  import AWS from "aws-sdk";
  import { useState, useEffect } from "react";

  function Upload({ onChange }) {
    //const [myLink, setMyLink] = useState(null);
    const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      uploadFile();
    }
  }, [file]);
    
    const uploadFile = async () => {
      if (!file) {
        console.error("No file selected.");
        return;
      }
      // S3 Bucket Name
      const S3_BUCKET = "signolingotest";

      // S3 Region
      const REGION = "us-east-2";

      // S3 Credentials
      AWS.config.update({
        accessKeyId: "AKIAQSCODBAFQ5A7HQGV",
        secretAccessKey: "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",
      });
      const s3 = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
      });

      // Files Parameters

      const params = {
        Bucket: S3_BUCKET,
        Key: file.name,
        Body: file,
      };

      // Uploading file to s3

      var upload = s3
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          console.log(
            "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
          );
        })
        .promise();

      await upload.then((err, data) => {
        console.log(err);
        // Fille successfully uploaded
       // const encodedFileName = encodeURIComponent(file.name);
       // const fileUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${encodedFileName}`;
       // setMyLink(fileUrl);        
      });
    };
    // Function to handle file and store it to file state
    const handleFileChange = (e) => {
      // Uploaded file
      const selectedFile = e.target.files[0];
      // Changing file state
      setFile(selectedFile); 
      onChange(selectedFile)
    };
    return (
      <div>
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={uploadFile}>Upload</button>
        </div>
      </div>
    );
  }

  export default Upload;