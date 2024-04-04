import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Grade } from '../entity';
import { Repository } from 'typeorm';
import { QueryGradeDTO, CreateGradeDTO, UpdateGradeDTO, DeleteGradeDTO } from '../dto';

@Provide()
export class GradeService {
  @InjectEntityModel(Grade)
  gradeModel: Repository<Grade>;


  async getGradeList() {
    const list = await this.gradeModel.find();
    return list;
  }

  async getGradeById(params: QueryGradeDTO) {
    const { id } = params;
    const Grade = await this.gradeModel.findOne({
      where: {
        id: id,
      },
    });
    return Grade;
  }

  async createGrade(s: CreateGradeDTO) {
    const res = await this.gradeModel.save(s)
    return res;
  }

  async deleteGrade(params: DeleteGradeDTO) {
    const {id} = params;
    const Grade = await this.gradeModel.findOne({
      where: {
        id
      }
    });
    if(!Grade) {
      console.log("年级不存在");
      return;
    }
    const res = await this.gradeModel.remove(Grade);
    return res;
  }

  async updateGrade(parmas: UpdateGradeDTO) {
    const { id, grade } = parmas;
    const origin = await this.gradeModel.findOne({
      where: {
        id
      }
    })
    if(!origin) return null;
    origin.grade = grade;
    const res = await this.gradeModel.save(origin);
    return res;
  }
}
