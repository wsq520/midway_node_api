import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { ClubGonggao } from '../entity';
import { Repository } from 'typeorm';
import { QueryClubGonggaoDTO, QueryClubGonggaoByClubIdDTO,CreateClubGonggaoDTO, UpdateClubGonggaoDTO, DeleteClubGonggaoDTO } from '../dto';

@Provide()
export class ClubGonggaoService {
  @InjectEntityModel(ClubGonggao)
  clubGonggaoModel: Repository<ClubGonggao>;

  async getClubGonggaoList() {
    const list = await this.clubGonggaoModel.find();
    return list;
  }

  async getClubGonggaoListByClubId(params: QueryClubGonggaoByClubIdDTO) {
    // console.log(params);
    const { club_id } = params;
    // console.log(`社团id:${club_id}发布的公告如下`);
    const res = await this.clubGonggaoModel.find({
      where: {
        club_id
      }
    })
    // console.log("本社团发的公告", res);
    return res;
  }

  async getClubGonggaoById(params: QueryClubGonggaoDTO) {
    const { id } = params;
    const res = await this.clubGonggaoModel.findOne({
      where: {
        id: id,
      },
    });
    return res;
  }

  async createClubGonggao(s: CreateClubGonggaoDTO) {
    const res = await this.clubGonggaoModel.save(s)
    return res;
  }

  async deleteClubGonggao(params: DeleteClubGonggaoDTO) {
    const { id } = params;
    const g = await this.clubGonggaoModel.findOne({
      where: {
        id
      }
    });
    if (!g) {
      // console.log("公告信息不存在");
      return {
        message: "公告信息不存在！"
      }
    }
    if (g.status !== 1) {
      return {
        message: "公告未来审核，先别删除噢！"
      }
    }
    const res = await this.clubGonggaoModel.remove(g);
    return res;
  }

  async updateClubGonggao(parmas: UpdateClubGonggaoDTO) {
    const { id, club_id, content, picture_url, publishtime, status } = parmas;
    // console.log("url:", picture_url);
    const origin = await this.clubGonggaoModel.findOne({
      where: {
        id
      }
    })
    if (!origin) return null;
    origin.club_id = club_id;
    origin.content = content;
    origin.picture_url = picture_url;
    origin.publishtime = publishtime;
    origin.status = status;
    // console.log(origin)
    const res = await this.clubGonggaoModel.save(origin);
    return res;
  }
}
