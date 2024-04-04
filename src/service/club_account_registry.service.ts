import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { ClubAccountRegistry, Clubs } from '../entity';
import { Repository } from 'typeorm';
import {
  QueryClubAccountRegistryDTO,
  CreateClubAccountRegistryDTO,
  DeleteClubAccountRegistryDTO,
  UpdateClubAccountRegistryDTO,
  LoginClubAccountRegistryDTO,
  CreateClubsDTO,
  CreateClubmemberDTO
} from '../dto';
import { ClubsService } from './clubs.service';
import { ClubmemberService } from './clubmember.service';

@Provide()
export class ClubaccountregistryService {
  @InjectEntityModel(ClubAccountRegistry)
  clubAccountRegistryModel: Repository<ClubAccountRegistry>;

  @Inject()
  clubsService: ClubsService;

  @Inject()
  clubMemberService: ClubmemberService;

  async getClubAccountRegistryList() {
    const list = await this.clubAccountRegistryModel.find();
    return list;
  }

  async getClubAccountRegistryById(params: QueryClubAccountRegistryDTO) {
    const { id } = params;
    const Clubaccountregistry = await this.clubAccountRegistryModel.findOne({
      where: {
        id: id,
      },
    });
    return Clubaccountregistry;
  }

  async createClubAccountRegistry(s: CreateClubAccountRegistryDTO) {
    const { club_name } = s;
    const clubList = await this.clubsService.getClubsList();
    // 记录该申请创建的社团名字是否已经存在
    let isRepeat = false;
    for (const item of clubList) {
      const { club_name: name } = item;
      if (name === club_name) {
        isRepeat = true;
      }
    }
    if (isRepeat) return {
      message: "该社团名字已经存在，请更改"
    }
    const res = await this.clubAccountRegistryModel.save(s)
    return res;
  }

  async deleteClubAccountRegistry(params: DeleteClubAccountRegistryDTO) {
    const { id } = params;
    const c = await this.clubAccountRegistryModel.findOne({
      where: {
        id
      }
    });
    // if(!Clubaccountregistry) {
    //   console.log("社团部门不存在该学生");
    //   return;
    // }
    const res = await this.clubAccountRegistryModel.remove(c);
    return res;
  }

  async updateClubAccountRegistry(parmas: UpdateClubAccountRegistryDTO) {
    const { id, student_id, club_name, club_type, status } = parmas;
    const origin = await this.clubAccountRegistryModel.findOne({
      where: {
        id
      }
    })
    if (!origin) return null;
    origin.student_id = student_id;
    origin.club_name = club_name;
    origin.club_type = club_type;
    origin.status = status;
    const res = await this.clubAccountRegistryModel.save(origin);
    // 如果审核通过 status为1
    if (res.status === 1) {
      // 创建一个部门
      const { student_id, club_name, club_type } = res;
      const obj: CreateClubsDTO = {
        student_id,
        club_name,
        club_type,
        introduction: "暂未编辑简介",
        views: 0,
        avatar: "avatar"
      }
      const createClubRes = await this.clubsService.createClubs(obj);
      console.log("创建部门结果：", createClubRes);
      const o: CreateClubmemberDTO = {
        club_id: createClubRes.club_id,
        student_id: createClubRes.student_id,
        ispresident: 1
      }
      // 将创建好的部门和用户信息存储到指定的社团-成员信息表
      const cm_res = await this.clubMemberService.createClubmember(o);
      console.log("cm_res:", cm_res);
    }
    return res;
  }

  // 审核通过的账号才能登录
  async loginClubAccountRegistry(parmas: LoginClubAccountRegistryDTO) {
    const { account, password } = parmas;
    // const res = await this.clubAccountRegistryModel.findOne({
    //   where: {
    //     password
    //   }
    // })
    // if (!res) {
    //   return {
    //     message: "该社团账号不存在"
    //   }
    // }
    // if (res.status !== 1) {
    //   return {
    //     message: "该账号未通过审核"
    //   }
    // }
    // return { ...res, message: "登录成功" };
    return { message: "社长权限检验，待开发！" }
  }
}
