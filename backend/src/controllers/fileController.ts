import { Request, Response } from "express";
import { UploadFileUseCase } from "../use-cases/file/uploadFile/uploadFileUseCase";
import { FileRepository } from "../repositories/fileRepository";
import { RetriveFileUseCase } from "../use-cases/file/retrive/retriveFilesUseCase";

class FileController {
  constructor(
    private readonly uploadFileUseCase: UploadFileUseCase,
    private readonly retriveFileUseCase: RetriveFileUseCase
  ) {}

  public async upload(req: Request, res: Response) {
    try {
      const response = await this.uploadFileUseCase.execute({
        fileName: req.headers.fileName as string,
        userId: Number(req.headers.user),
      });

      res.status(200).send({ file: response });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  public async list(req: Request, res: Response) {
    const response = await this.retriveFileUseCase.execute(
      Number(req.headers.user)
    );

    res.status(200).send({ files: response });
  }
}

export const fileController = new FileController(
  new UploadFileUseCase(new FileRepository()),
  new RetriveFileUseCase(new FileRepository())
);
