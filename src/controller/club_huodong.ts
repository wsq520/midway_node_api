import {
  Controller,
  Post,
  Query,
  Inject,
  Body,
  Get,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ClubHuodong } from '../entity'
import { ClubHuodongService } from '../service'
import { FuzzyQueryClubHuodongDTO, CreateClubHuodongDTO, DeleteClubHuodongDTO, UpdateClubhuodongDTO } from '../dto'

@Controller('/clubHuodong')
export class ClubHuodongController {
  @Inject()
  ctx: Context;

  @Inject()
  clubHuodongService: ClubHuodongService;

  @Get('/list')
  async getClubHuodongList(@Query() params: FuzzyQueryClubHuodongDTO) {
    const res = await this.clubHuodongService.getClubHuodongList(params);
    return res;
  }

  @Get('/delete')
  async deleteClubHuodong(@Query() params: DeleteClubHuodongDTO) {
   const res = await this.clubHuodongService.deleteClubHuodongById(params);
   return res;
  }

  @Post('/create')
  async createClubHuodong(@Body() body: CreateClubHuodongDTO) {
    const { club_id, club_name, club_type, title, content, picture_url, starttime, endtime } = body;

    const h = new ClubHuodong();
    h.club_id = club_id;
    h.club_type = club_type;
    h.club_name = club_name;
    h.title = title;
    h.content = content;
    h.picture_url = picture_url;
    h.starttime = starttime;
    h.endtime = endtime;
    // 创建默认是status=0即未审核状态
    h.status = 0
    const res = await this.clubHuodongService.createClubHuodong(h);
    return res;
  }

  @Post('/update')
  async updateClubHuodong(@Body() body: UpdateClubhuodongDTO) {
    const res = await this.clubHuodongService.updateClubHuodong(body);
    return res;
  }
}
