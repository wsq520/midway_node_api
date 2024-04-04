import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { TGrade } from '../../entity/TGrade';
import { FuzzyQueryTGradeDTO, CreateTGradeDTO, DeleteTGradeDTO, UpdateTGradeDTO, QueryGradeIdByGradeNameDTO } from '../../dto/school/index';
import { likeQueryHandler } from '../../utils';

@Provide()
export class TGradeService {
  @InjectEntityModel(TGrade)
  tGradeModel: Repository<TGrade>;

  async queryTGradeList() {
    const res = await this.tGradeModel.find();
    return res;
  }

  async fuzzyQueryTGradeList(params: FuzzyQueryTGradeDTO) {
    const { grade_name } = params;
    console.log(grade_name);
    const res = await this.tGradeModel.find({
      where: {
        ...likeQueryHandler("grade_name", grade_name)
      }
    })
    return res;
  }

  async getTGradeIdByGradeName(params: QueryGradeIdByGradeNameDTO) {
    const { grade_name } = params;
    const res = await this.tGradeModel.findOne({
      where: {
        grade_name
      }
    })
    return res;
  }

  async createTGrade(params: CreateTGradeDTO) {
    const res = await this.tGradeModel.save(params);
    return res;
  }

  async deleteTGrade(params: DeleteTGradeDTO) {
    const { grade_id } = params;
    const origin = await this.tGradeModel.findOne({
      where: {
        grade_id
      }
    })
    if (!origin) {
      return {
        message: "该年级不存在,删除失败"
      }
    }
    const res = await this.tGradeModel.remove(origin);
    return res;
  }

  async updateTGrade(params: UpdateTGradeDTO) {
    const { grade_id, grade_name } = params;
    const origin = await this.tGradeModel.findOne({
      where: {
        grade_id
      }
    })
    if (!origin) {
      return {
        message: "该年级不存在，修改失败"
      }
    }
    origin.grade_name = grade_name;
    const res = await this.tGradeModel.save(origin);
    return res;
  }

  async isExist(grade_name) {
    const res = this.tGradeModel.findOne({
      where: {
        grade_name: grade_name
      }
    })
    return res;
  }

}
