import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Clubmember } from '../entity';
import { Repository } from 'typeorm';
import { QueryClubmemberDTO, CreateClubmemberDTO, UpdateClubmemberDTO, DeleteClubmemberDTO, QueryMemberListDTO, QueryStudentClubDTO } from '../dto';
import { StudentService } from './student.service';
import { ClubsService } from './clubs.service';

@Provide()
export class ClubmemberService {
  @InjectEntityModel(Clubmember)
  clubmemberModel: Repository<Clubmember>;

  @Inject()
  studentService: StudentService;

  @Inject()
  clubService: ClubsService;

  async getClubmemberList() {
    const list = await this.clubmemberModel.find();
    return list;
  }

  async getClubmemberById(params: QueryClubmemberDTO) {
    const { id } = params;
    const Clubmember = await this.clubmemberModel.findOne({
      where: {
        id: id,
      },
    });
    return Clubmember;
  }

  async createClubmember(s: CreateClubmemberDTO) {
    const { club_id, student_id } = s;
    const isExit = await this.isExit(club_id, student_id);
    // 如果已经存在 不要重复添加社团与该成员的信息
    if (isExit) return { message: "请勿重复加入本社团" };
    // 未存在 那就添加信息
    const res = await this.clubmemberModel.save(s)
    return res;
  }

  async deleteClubmember(params: DeleteClubmemberDTO) {
    const { student_id, club_id } = params;
    const clubmember = await this.clubmemberModel.findOne({
      where: {
        student_id,
        club_id
      }
    });
    console.log(clubmember);
    if (!clubmember) {
      // console.log("社团部门不存在该学生");
      return { message: "社团部门不存在该学生" };
    }
    const res = await this.clubmemberModel.remove(clubmember);
    return res;
  }

  async updateClubmember(parmas: UpdateClubmemberDTO) {
    const { id, club_id, student_id, ispresident } = parmas;
    const origin = await this.clubmemberModel.findOne({
      where: {
        id
      }
    })
    if (!origin) return { message: "该社团不存在该学生" };
    origin.club_id = club_id;
    origin.student_id = student_id;
    origin.ispresident = ispresident;
    const res = await this.clubmemberModel.save(origin);
    return res;
  }

  // 根据社团id获取其内部成员信息
  async getClubMemberListById(params: QueryMemberListDTO) {
    const { club_id } = params;
    const club_res = await this.clubService.getClubInfoById({ club_id })
    const stuIdList = await this.clubmemberModel.find({
      where: {
        club_id
      }
    })
    // console.log("stuList:", stuIdList);
    const list = [];
    for (const item of stuIdList) {
      const { student_id } = item;
      const res = await this.studentService.getStudentById({ student_id });
      list.push(res);
    }
    return {
      ...club_res,
      data: list,
      total: list.length
    };
  }

  // 查询所有社团及其内部成员信息
  async getAllClubMemberList() {
    const clubIdList = await this.clubmemberModel.find({
      select: ['club_id']
    })
    console.log(clubIdList);
    // 去除重复的id
    const idsList = Array.from(new Set(clubIdList.map(item => item.club_id)));
    // console.log(idsList);

    const resList = [];
    for (const item of idsList) {
      const res = await this.getClubMemberListById({
        club_id: item
      })
      // console.log(res);
      resList.push(res);
    }
    console.log(resList);
    return resList;
  }

  async isExit(club_id: number, student_id: number) {
    const isExit = await this.clubmemberModel.findOne({
      where: {
        club_id,
        student_id
      }
    })
    return !!isExit;
  }

  // 通过学生id查找他所加入的部门
  async getClubListByStudentId(params: QueryStudentClubDTO) {
    const { student_id } = params;
    const club_list = await this.clubmemberModel.find({
      where: {
        student_id
      }
    })
    const list = [];
    for (const item of club_list) {
      const { club_id } = item;
      const club_member_list = await this.getClubMemberListById({ club_id });
      list.push(club_member_list);
    }
    return {
      student_id,
      data: list
    }
  }
}
