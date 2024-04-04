import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ZhaoxinPublishService } from '../service/zhaoxinpublish.service';
import { ZhaoxinPublish } from '../entity';
import {
  FuzzyQueryZhaoxinPublishDTO,
  QueryZhaoxinPublishDTO,
  CreateZhaoxinPublishDTO,
  DeleteZhaoxinPublishDTO,
  UpdateZhaoxinPublishDTO,
  QueryClubZhaoxinPublishDTO
} from '../dto';

@Controller('/zhaoxin')
export class ZhaoxinpublishController {
  @Inject()
  ctx: Context;

  @Inject()
  zhaoxinpublishService: ZhaoxinPublishService;

  @Get('/list')
  async zhaoxinPublishList(@Query() params: FuzzyQueryZhaoxinPublishDTO): Promise<ZhaoxinPublish[]> {
    const res = await this.zhaoxinpublishService.getZhaoxinPublishList(params);
    return res;
  }

  @Get('/info')
  async getZhaoxinPublishInfoById(@Query() parmas: QueryZhaoxinPublishDTO) {
    const res = await this.zhaoxinpublishService.getZhaoxinPublishById(parmas);
    return res;
  }

  // 获取某部门发布的所有的招新信息
  @Get('/clubzhaoxinInfo')
  async getClubzhaoxinById(@Query() parmas: QueryClubZhaoxinPublishDTO) {
    const res = await this.zhaoxinpublishService.getClubZhaoxinListById(parmas);
    return res;
  }

  @Post('/create')
  async createZhaoxinpublish(@Body() body: CreateZhaoxinPublishDTO) {
    const z = new ZhaoxinPublish();
    const { club_id, content, picture_url, starttime, endtime, title } = body;
    z.club_id = club_id;
    z.title = title;
    z.content = content;
    z.picture_url = picture_url;
    z.status = 0;
    z.starttime = starttime;
    z.endtime = endtime;
    const res = await this.zhaoxinpublishService.createZhaoxinpublish(z);
    return res;
  }

  @Get('/delete')
  async deleteZhaoxinpublish(@Query() parmas: DeleteZhaoxinPublishDTO): Promise<any> {
    // const { id } = parmas;
    const res = await this.zhaoxinpublishService.deleteZhaoxinpublish(parmas);
    return res;
  }

  @Post('/update')
  async updateZhaoxinpublish(@Body() body: UpdateZhaoxinPublishDTO) {
    const res = await this.zhaoxinpublishService.updateZhaoxinpublish(body);
    return res;
  }
}
