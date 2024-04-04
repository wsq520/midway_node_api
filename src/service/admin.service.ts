import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Admin, AdminGonggao } from '../entity';
import { Repository } from 'typeorm';
import { FuzzyQueryAdminGonggaoDTO, QueryAdminDTO, CreateAmidnGonggaoDTO, UpdateAmidnGonggaoDTO, DeleteAmidnGonggaoDTO } from '../dto';
import { QueryAdminGonggaoDTO } from '../dto/admin/index';
import { likeQueryHandler } from '../utils';

@Provide()
export class AdminService {
  @InjectEntityModel(Admin)
  adminModel: Repository<Admin>;

  @InjectEntityModel(AdminGonggao)
  adminGonggaoModel: Repository<AdminGonggao>;

  // @Inject()
  // cache_service: cacheService;

  async Adminlogin(params: QueryAdminDTO) {
    try {
      const { account, password } = params;
      const res = await this.adminModel.findOne({
        where: {
          account,
          password
        },
      });
      return res;
    } catch (error) {
      console.log("管理员登录失败");
    }
  }

  async getAdminGonggaoList(params: FuzzyQueryAdminGonggaoDTO) {
    const { title } = params;
    const res = await this.adminGonggaoModel.find({
      where: {
        ...likeQueryHandler("title", title)
      }
    })
    return res;
  }

  async getAdminGonggaoInfoById(params: QueryAdminGonggaoDTO) {
    const { id } = params;
    const res = await this.adminGonggaoModel.findOne({
      where: {
        id
      }
    })
    if (!res) return {
      message: "公告不存在"
    }
    return res;
  }

  async CreateGonggao(params: CreateAmidnGonggaoDTO) {
    const { title, content, publishtime, picture_url } = params;
    const obj = new AdminGonggao();
    obj.title = title;
    obj.content = content;
    obj.picture_url = picture_url;
    obj.publishtime = publishtime;
    const res = this.adminGonggaoModel.save(params);
    return res;
  }

  async UpdateGonggao(params: UpdateAmidnGonggaoDTO) {
    console.log("UpdateGonggao:", params);
    const { id, content, picture_url, publishtime } = params;
    const origin = await this.adminGonggaoModel.findOne({
      where: {
        id
      }
    })
    origin.content = content;
    origin.picture_url = picture_url;
    origin.publishtime = publishtime;
    const res = this.adminGonggaoModel.save(origin);
    return res;
  }

  async DeleteGonggao(params: DeleteAmidnGonggaoDTO) {
    const { id } = params;
    const origin = await this.adminGonggaoModel.findOne({
      where: {
        id
      }
    })
    if (!origin) return {
      message: "公告不存在,删除失败"
    }
    const res = await this.adminGonggaoModel.remove(origin);
    return res;
  }
}
