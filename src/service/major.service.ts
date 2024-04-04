import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Major } from '../entity';
import { Repository } from 'typeorm';
import { QueryMajorDTO, CreateMajorDTO, UpdateMajorDTO, DeleteMajorDTO } from '../dto';

@Provide()
export class MajorService {
  @InjectEntityModel(Major)
  MajorModel: Repository<Major>;


  async getMajorList() {
    const list = await this.MajorModel.find();
    return list;
  }

  async getMajorById(params: QueryMajorDTO) {
    const { id } = params;
    const major = await this.MajorModel.findOne({
      where: {
        id: id,
      },
    });
    return major;
  }

  async createMajor(s: CreateMajorDTO) {
    const { major } = s;
    const isExist = await this.MajorModel.findOne({
      where: {
        major
      }
    })
    if(isExist) {
      return {
        message: `专业：${major}已存在，操作失败！`
      }
    }
    const res = await this.MajorModel.save(s)
    return res;
  }

  async deleteMajor(params: DeleteMajorDTO) {
    const { id } = params;
    const major = await this.MajorModel.findOne({
      where: {
        id
      }
    });
    if (!Major) {
      console.log("专业不存在");
      return;
    }
    const res = await this.MajorModel.remove(major);
    return res;
  }

  async updateMajor(parmas: UpdateMajorDTO) {
    const { id, major, college_id } = parmas;
    const origin = await this.MajorModel.findOne({
      where: {
        id
      }
    })
    if (!origin) return null;
    origin.major = major;
    const res = await this.MajorModel.save(origin);
    return res;
  }
}
