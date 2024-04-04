import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Clubs } from '../entity/Clubs';
import { Repository } from 'typeorm';
import { QueryClubsDTO } from '../dto';
import { ServiceError } from '../error/serviceError';
import { CreateClubsDTO, DeleteClubsDTO, UpdateClubsDTO, FuzzyQueryClubIdListDTO } from '../dto';
import { likeQueryHandler } from '../utils'
// import { ClubmemberService } from './clubmember.service';

@Provide()
export class ClubsService {
  @InjectEntityModel(Clubs)
  clubsModel: Repository<Clubs>;

  // @Inject()
  // clubMemberService: ClubmemberService;

  async getClubsList() {
    const ClubsList = await this.clubsModel.find();
    // await this.cache_service.setCache(key, userList);
    return ClubsList;
  }

  // 获取某个部门信息
  async getClubInfoById(params: QueryClubsDTO) {
    const { club_id } = params;
    const club_info = await this.clubsModel.findOne({
      where: {
        club_id
      },
    });
    // const club_memeber_list = await this.clubMemberService.getClubMemberListById({ club_id });
    return {
      ...club_info,
      // ...club_memeber_list
    };
  }

  async createClubs(s: CreateClubsDTO) {
    const res = await this.clubsModel.save(s)
    console.log(res);
    return res;
  }

  async deleteClubs(params: DeleteClubsDTO) {
    const { club_id } = params;
    const club = await this.clubsModel.findOne({
      where: {
        club_id
      }
    });
    if (!club) {
      console.log("社团不存在");
      return;
    }
    const res = await this.clubsModel.remove(club);
    return res;
  }

  async updateClubs(parmas: UpdateClubsDTO) {
    const { club_id, club_name, club_type, student_id, introduction, views, avatar } = parmas;
    const origin = await this.clubsModel.findOne({
      where: {
        club_id
      }
    })
    if (!origin) return null;
    origin.club_name = club_name;
    origin.club_type = club_type;
    origin.student_id = student_id;
    origin.introduction = introduction;
    origin.views = views;
    origin.avatar = avatar;
    const res = await this.clubsModel.save(origin);
    return res;
  }

  async fuzzyQueryClubIdList(params: FuzzyQueryClubIdListDTO) {
    const { club_name, club_type } = params;

    const whereConditions: any = {
      ...likeQueryHandler("club_name", club_name),
      ...likeQueryHandler("club_type", club_type)
    };

    const club_id_list = await this.clubsModel.find({
      where: whereConditions,
      select: ['club_id']
    })

    return club_id_list;
  }
}
