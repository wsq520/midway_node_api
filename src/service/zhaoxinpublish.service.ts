import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { ZhaoxinPublish } from '../entity';
import { Repository } from 'typeorm';
import { FuzzyQueryZhaoxinPublishDTO, QueryZhaoxinPublishDTO, CreateZhaoxinPublishDTO, UpdateZhaoxinPublishDTO, DeleteZhaoxinPublishDTO, QueryClubZhaoxinPublishDTO } from '../dto';
import { ClubsService, UtilService } from './index';
import { likeQueryHandler, isInStatusList } from '../utils';

@Provide()
export class ZhaoxinPublishService {
  @InjectEntityModel(ZhaoxinPublish)
  zhaoxinpublishModel: Repository<ZhaoxinPublish>;

  @Inject()
  clubsService: ClubsService;

  @Inject()
  utilService: UtilService;

  async getZhaoxinPublishList(params: FuzzyQueryZhaoxinPublishDTO) {
    // 实现模糊查询
    const { club_name, club_type, status, title } = params;
    const club_id_list = await this.clubsService.fuzzyQueryClubIdList({ club_name, club_type });
    // console.log(club_id_list);

    let res = [];
    for (const item of club_id_list) {
      const { club_id } = item;
      const club_info = await this.utilService.queryClubAndClubMemberByClubId({ club_id });
      const club_zhao_info = await this.zhaoxinpublishModel.find({
        where: {
          club_id,
          ...likeQueryHandler("title", title)
        }
      })
      for (const zhao of club_zhao_info) {
        res.push({
          ...club_info,
          ...zhao,
        })
      }
    }

    // console.log("过滤前的res", res);
    console.log("status:", status, typeof status, isInStatusList(status));

    if (isInStatusList(status)) {
      res = res.filter(item => item.status === Number(status))
    }

    return res;
  }

  async getZhaoxinPublishById(params: QueryZhaoxinPublishDTO) {
    const { id } = params;
    const Zhaoxinpublish = await this.zhaoxinpublishModel.findOne({
      where: {
        id: id,
      },
    });
    return Zhaoxinpublish;
  }

  async getClubZhaoxinListById(params: QueryClubZhaoxinPublishDTO) {
    const { club_id } = params;
    const club_info = await this.clubsService.getClubInfoById({ club_id });
    const res = await this.zhaoxinpublishModel.find({
      where: {
        club_id
      }
    })
    return {
      ...club_info,
      total: res?.length,
      data: res,
    };
  }

  async createZhaoxinpublish(s: CreateZhaoxinPublishDTO) {
    const res = await this.zhaoxinpublishModel.save(s)
    return res;
  }

  async deleteZhaoxinpublish(params: DeleteZhaoxinPublishDTO) {
    const { id } = params;
    const z = await this.zhaoxinpublishModel.findOne({
      where: {
        id
      }
    });
    if (!z) {
      return {
        message: "该公告不存在！"
      };
    }
    const res = await this.zhaoxinpublishModel.remove(z);
    return res;
  }

  async updateZhaoxinpublish(parmas: UpdateZhaoxinPublishDTO) {
    const { id, title, content, picture_url, status, starttime, endtime, club_id } = parmas;
    const origin = await this.zhaoxinpublishModel.findOne({
      where: {
        id
      }
    })
    if (!origin) return {
      message: "该公告不存在，操作失败！"
    };
    origin.club_id = club_id;
    origin.title = title;
    origin.content = content;
    origin.picture_url = picture_url;
    origin.status = status;
    origin.starttime = starttime;
    origin.endtime = endtime;
    const res = await this.zhaoxinpublishModel.save(origin);
    return res;
  }
}
