import {
  Controller,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  // ParseFilePipe,
  // MaxFileSizeValidator,
  // FileTypeValidator,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decoratos';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { join } from 'path';

@Controller('image')
@ApiTags('image')
@Auth()
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('/one')
  @ApiOperation({ summary: 'Create a new image' })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile()
    file: Express.Multer.File,
    // new ParseFilePipe({
    //   validators: [
    //     new MaxFileSizeValidator({ maxSize: 1000 }),
    //     new FileTypeValidator({ fileType: 'image/jpeg' }),
    //   ],
    // }),
    //
    //
    // validate: ParseFilePipe
    // @UploadedFile(
    // new ParseFilePipe({
    //   validators: [
    //     new MaxFileSizeValidator({ maxSize: 1000 }),
    //     new FileTypeValidator({ fileType: 'image/jpeg' }),
    //   ],
    // }),
    // ) file: Express.Multer.File
  ) {
    const name = file.originalname.split('.')[0] + Date.now();
    const image = await this.imageService.create(file, name);

    const fullPath = join(__dirname, '../../', file.path);

    fs.unlinkSync(fullPath);

    return image;
  }

  @Post('/many')
  @ApiOperation({ summary: 'Create multiple images' })
  @UseInterceptors(FilesInterceptor('files'))
  async createMany(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
    const images = await this.imageService.createMany(files);

    files.forEach((file) => {
      const fullPath = join(__dirname, '../../', file.path);
      fs.unlinkSync(fullPath);
    });

    return images;
    // return this.imageService.create(createImageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an image' })
  remove(@Param('id') id: string) {
    return this.imageService.remove(id);
  }
}
