import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

@Injectable()
export class ImageService {
  create(file: Express.Multer.File, name: string) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    return new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload(
        file.path,
        {
          folder: 'nest',
          public_id: name,
          resource_type: 'auto',
        },
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) {
            console.log('error', error);
            reject(error);
          }
          resolve(result);
        },
      );
    });
  }

  createMany(files: Express.Multer.File[]) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const promises = files.map((file) => {
      return new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload(
          file.path,
          {
            folder: 'nest',
            public_id: file.originalname.split('.')[0] + Date.now(),
            resource_type: 'auto',
          },
          (error: UploadApiErrorResponse, result: UploadApiResponse) => {
            if (error) {
              console.log('first error', error);
              reject(error);
            }
            resolve(result);
          },
        );
      });
    });

    return Promise.all(promises);
  }

  remove(id: string) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(id, (error, result) => {
        if (error) {
          console.log('error', error);
          reject(error);
        }
        resolve(result);
      });
    });
  }
}
