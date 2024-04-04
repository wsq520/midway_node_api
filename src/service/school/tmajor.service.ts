import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { TMajor } from '../../entity/TMajor';
import { CreateTMajorDTO, DeleteTMajorDTO, UpdateTMajorDTO } from '../../dto/school/index';

@Provide()
export class TMajorService {
  @InjectEntityModel(TMajor)
  TMajorModel: Repository<TMajor>;

  async queryTMajorList() {
    const res = await this.TMajorModel.find();
    return res;
  }

  async createTMajor(params: CreateTMajorDTO) {
    const res = await this.TMajorModel.save(params);
    return res;
  }

  async deleteTMajor(params: DeleteTMajorDTO) {
    const { major_id } = params;
    const origin = await this.TMajorModel.findOne({
      where: {
        major_id
      }
    })
    if(!origin) {
      return {
        message: "该学院不存在,删除失败"
      }
    }
    const res = await this.TMajorModel.remove(origin);
    return res;
  }

  async updateTMajor(params: UpdateTMajorDTO) {
    const { major_id, major_name } = params;
    const origin = await this.TMajorModel.findOne({
      where: {
        major_id
      }
    })
    if(!origin) {
      return {
        message: "该专业不存在，修改失败"
      }
    }
    origin.major_name = major_name;
    const res = await this.TMajorModel.save(origin);
    return res;
  }

  async isExist(major_name, college_id) {
    const res = this.TMajorModel.findOne({
      where: {
        major_name,
        college_id,
      }
    })
    return res;
  }

}
