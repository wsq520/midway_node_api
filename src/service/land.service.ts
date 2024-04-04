import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Land } from '../entity';
import { Repository } from 'typeorm';
import { QueryLandDTO, CreateLandDTO, UpdateLandDTO, DeleteLandDTO } from '../dto';

@Provide()
export class LandService {
  @InjectEntityModel(Land)
  landModel: Repository<Land>;


  async getLandList() {
    const list = await this.landModel.find();
    return list;
  }

  async getLandById(params: QueryLandDTO) {
    const { id } = params;
    const Land = await this.landModel.findOne({
      where: {
        id: id,
      },
    });
    return Land;
  }

  async createLand(s: CreateLandDTO) {
    const res = await this.landModel.save(s)
    return res;
  }

  async deleteLand(params: DeleteLandDTO) {
    const {id} = params;
    const l = await this.landModel.findOne({
      where: {
        id
      }
    });
    if(!l) {
      console.log("地址不存在");
      return;
    }
    const res = await this.landModel.remove(l);
    return res;
  }

  async updateLand(parmas: UpdateLandDTO) {
    const { id, address, status, picture_url } = parmas;
    const origin = await this.landModel.findOne({
      where: {
        id
      }
    })
    if(!origin) return null;
    origin.address = address;
    origin.status = status;
    origin.picture_url = picture_url;
    const res = await this.landModel.save(origin);
    return res;
  }
}
