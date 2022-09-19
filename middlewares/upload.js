
let imageFile, uploadPath, fileName;

const upload = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  console.log("req:::", req.files);
  imageFile = req.files.avatar;
  fileName = req.files.avatar.name;
  uploadPath = "uploads/" + fileName;
  console.log("uploadPath:::", uploadPath);
  
  imageFile.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(`Upload failure ${err}`);
      res.send(uploadPath);
  })
  return uploadPath

}

export default upload;

