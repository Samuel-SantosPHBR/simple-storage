import { FileRepository } from "../../../repositories/fileRepository";
import { File } from "../../../entities";

export class RetriveFileUseCase {
  constructor(private readonly fileRepository: FileRepository) {}

  public async execute(userId: number): Promise<File[]> {
    try {
      return this.fileRepository.findByUserId(userId);
    } catch (error) {
      return [];
    }
  }
}
