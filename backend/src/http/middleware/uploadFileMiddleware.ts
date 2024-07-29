import md5 from "md5";
import multer from "multer";

class UploadFileMiddleware {
  public execute() {
    const storage = this.createStorage();

    const upload = multer({ storage: storage });

    return upload.single("file");
  }

  private createStorage() {
    return multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./uploads");
      },
      filename: function (req, file, cb) {
        const fileName =
          md5(`${Date.now()}`) +
          md5(`${req.user}`) +
          "------" +
          file.originalname;

        req.headers.fileName = fileName;
        cb(null, fileName);
      },
    });
  }
}

export const uploadFileMiddleware = new UploadFileMiddleware();
