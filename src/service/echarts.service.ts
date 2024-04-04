import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Clubs, Clubtype, Clubmember,Student, AdminGonggao, ClubGonggao } from '../entity';
import { Repository } from 'typeorm';
import { feildUnique } from '../utils'
import { QueryClubEchartDTO } from '../dto';

@Provide()
export class EchartsService {
  @InjectEntityModel(Clubtype)
  clubTypeModel: Repository<Clubtype>;

  @InjectEntityModel(Clubs)
  clubsModel: Repository<Clubs>;

  @InjectEntityModel(Clubmember)
  clubMemberModel: Repository<Clubmember>;

  @InjectEntityModel(Student)
  studentModel: Repository<Student>;

  @InjectEntityModel(AdminGonggao)
  adminGonggaoModel: Repository<AdminGonggao>;

  @InjectEntityModel(ClubGonggao)
  clubGonggaoListModel: Repository<ClubGonggao>;

  async getClubType() {
    const type_list = await this.clubTypeModel.find();
    const clubs_list = await this.clubsModel.find();
    // console.log(clubs_list);
    const res = [];
    for (const type of type_list) {
      const { club_type, id } = type;
      const list = [];
      for (const item of clubs_list) {
        if (item.club_type === club_type) {
          list.push(item)
        }
      }
      res.push({
        club_type,
        club_id: id,
        clubTotal: list.length,
        data: list
      });
    }
    return res;
  }

  async getUserData() {
    const stu_list = await this.studentModel.find();

    const gradeArr = await this.studentModel.find({
      select: ["grade"]
    })
    const grade_list = feildUnique(gradeArr, "grade");

    const collegeArr = await this.studentModel.find({
      select: ["college"]
    });
    const college_list = feildUnique(collegeArr, "college");

    // console.log(grade_list, college_list);

    const res = {
      gradeData: [],
      collegeData: []
    }

    res.gradeData.push(this.handleList(grade_list, "grade", stu_list));
    res.collegeData.push(this.handleList(college_list, "college", stu_list));

    // for (const g of grade_list) {
    //   const obj = { grade: g, count: 0 }
    //   for (const stu of stu_list) {
    //     if (g === stu.grade) {
    //       obj.count++
    //     }
    //   }
    //   res.gradeData.push(obj);
    // }

    // for (const c of college_list) {
    //   const obj = { college: c, count: 0 }
    //   for (const stu of stu_list) {
    //     if (c === stu.college) {
    //       obj.count++
    //     }
    //   }
    //   // console.log(obj);
    //   res.collegeData.push(obj);
    // }
    // console.log(res);
    return res;
  }

  handleList(list: any, key: string, stu_list: any) {
    const arr = [];
    for (const item of list) {
      const obj = { [key]: item, count: 0 }
      for (const stu of stu_list) {
        if (item === stu[key]) {
          obj.count++
        }
      }
      arr.push(obj);
    }
    return arr;
  }

  async getClubEhart(params: QueryClubEchartDTO) {
    const { club_id } = params;

  }

  async getSystemTotal() {
    const clubsList = await this.clubsModel.find();
    const studentList = await this.studentModel.find();
    const club_typeList = await this.clubTypeModel.find();
    const adminGonggaoList = await this.adminGonggaoModel.find();
    const clubGonggaoList = await this.clubGonggaoListModel.find({
      where: {
        status: 1
      }
    })

    return {
      clubsTotal: clubsList.length,
      studentTotal: studentList.length,
      clubTypeTotal: club_typeList.length,
      adminGonggaoTotal: adminGonggaoList.length,
      clubGonggaoTotal: clubGonggaoList.length,
    }
  }
}
