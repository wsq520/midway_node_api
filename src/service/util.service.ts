import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Clubs, Clubmember, ClubGonggao, Student, ClubAccountRegistry } from '../entity';
import { Repository } from 'typeorm';
import { QueryClubAndClubMemeberDTO, FuzzyQueryClubAndClubMemeberDTO, FuzzyQueryClubGonggaoDTO, FuzzyQueryClubAccountRegistryDTO } from '../dto';
import { likeQueryHandler, isInStatusList } from '../utils'

@Provide()
export class UtilService {
  @InjectEntityModel(Clubs)
  clubsModel: Repository<Clubs>;

  @InjectEntityModel(ClubAccountRegistry)
  clubAccountRegistryModel: Repository<ClubAccountRegistry>;

  @InjectEntityModel(Clubmember)
  clubmemberModel: Repository<Clubmember>;

  @InjectEntityModel(ClubGonggao)
  clubGonggaoModel: Repository<ClubGonggao>

  @InjectEntityModel(Student)
  studentModel: Repository<Student>;

  async queryClubAndClubMemberByClubId(params: QueryClubAndClubMemeberDTO) {
    const { club_id } = params;
    const club_info = await this.clubsModel.findOne({
      where: {
        club_id
      }
    })

    const club_student_idList = await this.clubmemberModel.find({
      where: {
        club_id
      },
      select: ['student_id']
    })


    const stu_list = [];
    for (const stu of club_student_idList) {
      const { student_id } = stu;
      const res = await this.studentModel.findOne({
        where: {
          student_id
        }
      });
      stu_list.push(res);
    }

    const president_info = await this.studentModel.findOne({
      where: {
        student_id: club_info.student_id
      }
    })

    return {
      ...club_info,
      president_id: club_info.student_id,
      president_name: president_info.name,
      clubMemberList: [...stu_list],
      count: stu_list.length
    };
  }

  async queryClubAndCluMemberList(params: FuzzyQueryClubAndClubMemeberDTO) {
    // 获取模糊查询的参数
    const { club_name, club_type } = params;

    const whereConditions = {
      ...likeQueryHandler("club_name", club_name),
      ...likeQueryHandler("club_type", club_type)
    }

    const club_id_list = await this.clubsModel.find({
      where: whereConditions,
      select: ['club_id']
    })
    const res = [];
    for (const club of club_id_list) {
      const { club_id } = club;
      const r = await this.queryClubAndClubMemberByClubId({ club_id });
      res.push(r);
    }
    return res;
  }

  // async fuzzyQueryClubAndCluMemberListByClubName(params: FuzzyQueryClubAndClubMemeberDTO) {
  //   const club_id_list = await this.clubsModel.find({
  //     select: ['club_id']
  //   })

  //   const res = [];
  //   for(const club of club_id_list) {
  //     const { club_id } = club;
  //     const r = await this.queryClubAndClubMemberByClubId({club_id});
  //     res.push(r);
  //   }

  //   return res;
  // }

  async queryClubGonggaoList(params: FuzzyQueryClubGonggaoDTO) {
    const { club_name, club_type, title, status } = params;
    const whereConditions = {
      ...likeQueryHandler("club_name", club_name),
      ...likeQueryHandler("club_type", club_type),
    }

    const club_id_list = await this.clubsModel.find({
      where: whereConditions,
      select: ['club_id']
    })

    let res = [];
    for (const club of club_id_list) {
      const { club_id } = club;
      const club_info = await this.queryClubAndClubMemberByClubId({ club_id });

      const club_gonggao_list = await this.clubGonggaoModel.find({
        where: {
          club_id,
          ...likeQueryHandler("title", title)
        }
      })

      for (const gonggao of club_gonggao_list) {
        res.push({
          ...club_info,
          ...gonggao
        })
      }
    }

    if (isInStatusList(status)) {
      res = res.filter(item => item.status === Number(status));
    }

    return res;
  }

  async queryClubAccountRegistryList(params: FuzzyQueryClubAccountRegistryDTO) {
    const { club_name, club_type, xuehao, status } = params;

    const whereConditions = {
      ...likeQueryHandler("club_name", club_name),
      ...likeQueryHandler("club_type", club_type),
    }

    // 查找匹配社团名字、社团类型的注册信息
    const registry_list = await this.clubAccountRegistryModel.find({
      where: whereConditions
    })
    // console.log("registry_list：", registry_list);

    const student_id_list = await this.studentModel.find({
      where: {
        ...likeQueryHandler("xuehao", xuehao)
      },
      select: ['student_id']
    })
    // console.log("student_id_list:", student_id_list);

    let res = [];
    for (const s of student_id_list) {
      const { student_id } = s;
      const student_info = await this.studentModel.findOne({
        where: {
          student_id
        }
      })
      for (const r of registry_list) {
        const { student_id: r_student_id } = r;
        if (student_id === r_student_id) {
          res.push({
            ...student_info,
            ...r
          })
        }
      }
    }

    if (isInStatusList(status)) {
      res = res.filter(item => item.status === Number(status));
    }

    return res;
  }
}
