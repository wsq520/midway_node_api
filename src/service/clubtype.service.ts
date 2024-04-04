import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Clubtype } from '../entity';
import { Repository } from 'typeorm';
import { QueryClubtypeDTO, CreateClubtypeDTO, UpdateClubtypeDTO, DeleteClubtypeDTO } from '../dto';

@Provide()
export class ClubtypeService {
  @InjectEntityModel(Clubtype)
  clubtypeModel: Repository<Clubtype>;


  async getClubtypeList() {
    const list = await this.clubtypeModel.find();
    return list;
  }

  async getClubtypeById(params: QueryClubtypeDTO) {
    const { id } = params;
    const clubtype = await this.clubtypeModel.findOne({
      where: {
        id: id,
      },
    });
    return clubtype;
  }

  async createClubtype(s: CreateClubtypeDTO) {
    const { club_type } = s;
    const isExist = await this.clubtypeModel.findOne({
      where: {
        club_type
      }
    })
    if (isExist) {
      return {
        message: `社团类型：${club_type}已存在，操作失败`
      }
    }
    const res = await this.clubtypeModel.save(s)
    return res;
  }

  async deleteClubtype(params: DeleteClubtypeDTO) {
    const { id } = params;
    const Clubtype = await this.clubtypeModel.findOne({
      where: {
        id
      }
    });
    if (!Clubtype) {
      console.log("类型不存在");
      return;
    }
    const res = await this.clubtypeModel.remove(Clubtype);
    return res;
  }

  async updateClubtype(parmas: UpdateClubtypeDTO) {
    const { id, club_type } = parmas;
    const origin = await this.clubtypeModel.findOne({
      where: {
        id
      }
    })
    if (!origin) return null;
    origin.club_type = club_type;
    const res = await this.clubtypeModel.save(origin);
    return res;
  }

  async isExit(id: number) {
    const res = await this.clubtypeModel.findOne({
      where: {
        id
      }
    })
    return res;
  }
}
