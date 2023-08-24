import { Controller, Get, Inject, Param } from '@midwayjs/core';
import { PhotoService } from '../service/photo.service';

@Controller('/')
export class PhotoController {
  @Inject()
  photoService: PhotoService;

  @Get('/photo/all/:id')
  async getAllPhotoById(@Param('id') id: string) {
    // const { id } = params;
    console.log(id);
    const res = await this.photoService.getAllPhotoById(id);
    return res;
  }
}
