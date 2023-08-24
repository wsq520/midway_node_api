import { InjectEntityModel } from '@midwayjs/typeorm';
import { Photo } from '../entity/Photo';
import { Repository } from 'typeorm';
import { Provide } from '@midwayjs/core';

@Provide()
export class PhotoService {
  @InjectEntityModel(Photo)
  photoModel: Repository<Photo>;

  async getAllPhotoById(id: string) {
    const res = await this.photoModel.find({
      where: {
        userId: id,
      },
    });
    return res;
  }
}
