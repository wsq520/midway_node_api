import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { TCollege } from '../../entity/TCollege';
import { TGrade } from '../../entity/TGrade';
import { FuzzyQueryTCollegeDTO, CreateTCollegeDTO, DeleteTCollegeDTO, UpdateTCollegeDTO } from '../../dto/school/index';
import { likeQueryHandler } from '../../utils';

@Provide()
export class TCollegeService {
  @InjectEntityModel(TCollege)
  tCollegeModel: Repository<TCollege>;

  @InjectEntityModel(TGrade)
  tGradeModel: Repository<TGrade>;

  async queryTCollegeList() {
    const res = await this.tCollegeModel.find();
    return res;
  }

  async fuzzyQueryTCollegeList(params: FuzzyQueryTCollegeDTO) {
    const { grade_name, college_name } = params;
    // console.log("模糊查询参数：", params, grade_name, college_name);
    const grade_list = await this.tGradeModel.find({
      where: {
        ...likeQueryHandler("grade_name", grade_name)
      },
    })
    const college_list = await this.tCollegeModel.find({
      where: {
        ...likeQueryHandler("college_name", college_name),
      }
    })

    // console.log(grade_list, college_list);

    const res = [];
    for (const g of grade_list) {
      const { grade_id } = g;
      // console.log("g:", g);
      for (const c of college_list) {
        // console.log("c:", c);
        const { grade_id: c_grade_id } = c;
        if (grade_id === c_grade_id) {
          res.push({
            ...g,
            ...c
          })
        }
      }
    }
    console.log(res);
    return res;
  }

  async createTCollege(params: CreateTCollegeDTO) {
    const res = await this.tCollegeModel.save(params);
    return res;
  }

  async deleteTCollege(params: DeleteTCollegeDTO) {
    const { college_id } = params;
    const origin = await this.tCollegeModel.findOne({
      where: {
        college_id
      }
    })
    if (!origin) {
      return {
        message: "该学院不存在,删除失败"
      }
    }
    const res = await this.tCollegeModel.remove(origin);
    return res;
  }

  async updateTCollege(params: UpdateTCollegeDTO) {
    const { college_id, college_name } = params;
    const origin = await this.tCollegeModel.findOne({
      where: {
        college_id
      }
    })
    if (!origin) {
      return {
        message: "该年级不存在，修改失败"
      }
    }
    origin.college_name = college_name;
    const res = await this.tCollegeModel.save(origin);
    return res;
  }

  async isExist(college_name, grade_id) {
    const res = this.tCollegeModel.findOne({
      where: {
        college_name,
        grade_id,
      }
    })
    return res;
  }

}
