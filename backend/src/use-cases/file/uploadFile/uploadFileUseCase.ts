import { getConstants } from "../../../constants";
import { File } from "../../../entities";
import { ApplicationError } from "../../../errors/applicationError";
import { FileRepository } from "../../../repositories/fileRepository";
import { UploadFileRequestDto } from "./uploadFileRequest.dto";

export class UploadFileUseCase {
  constructor(private readonly fileRepository: FileRepository) {}

  execute(data: UploadFileRequestDto): Promise<File> {
    try {
      return this.fileRepository.save(data);
    } catch (error) {
      throw new ApplicationError(getConstants().ERROR_TO_SAVE_FILE);
    }
  }
}
