import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { College } from '../entity';
import { Repository } from 'typeorm';
import { CreateCollegeDTO, UpdateCollegeDTO, QueryCollegeDTO, DeleteCollegeDTO } from '../dto';

@Provide()
export class CollegeService {
  @InjectEntityModel(College)
  collegeModel: Repository<College>;


  async getCollegeList() {
    const list = await this.collegeModel.find();
    return list;
  }

  async getCollegeById(params: QueryCollegeDTO) {
    const { id } = params;
    const college = await this.collegeModel.findOne({
      where: {
        id: id,
      },
    });
    return college;
  }

  async createCollege(s: CreateCollegeDTO) {
    const res = await this.collegeModel.save(s)
    return res;
  }

  async deleteCollege(params: DeleteCollegeDTO) {
    const {id} = params;
    const college = await this.collegeModel.findOne({
      where: {
        id
      }
    });
    if(!college) {
      console.log("学院不存在");
      return;
    }
    const res = await this.collegeModel.remove(college);
    return res;
  }

  async updateCollege(parmas: UpdateCollegeDTO) {
    const { id, college } = parmas;
    const origin = await this.collegeModel.findOne({
      where: {
        id
      }
    })
    if(!origin) return null;
    origin.college = college;
    const res = await this.collegeModel.save(origin);
    return res;
  }
}
