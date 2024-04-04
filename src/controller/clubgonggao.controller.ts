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
import { ClubGonggaoService } from '../service/club_gonggao.service';
import { ClubGonggao } from '../entity';
import {
  QueryClubGonggaoDTO,
  CreateClubGonggaoDTO,
  DeleteClubGonggaoDTO,
  UpdateClubGonggaoDTO,
  QueryClubGonggaoByClubIdDTO
} from '../dto';

@Controller('/club/gonggao')
export class GonggaoController {
  @Inject()
  ctx: Context;

  @Inject()
  clubGonggaoService: ClubGonggaoService;

  @Get('/list')
  async getClubGonggaoList(): Promise<ClubGonggao[]> {
    const res = await this.clubGonggaoService.getClubGonggaoList();
    return res;
  }

  @Get('/clubgonggaolist')
  async getClubGonggaoListByClubId(@Query() params: QueryClubGonggaoByClubIdDTO) {
    const res = await this.clubGonggaoService.getClubGonggaoListByClubId(params);
    return res;
  }

  @Get('/info')
  async getClubGonggaoInfoById(@Query() parmas: QueryClubGonggaoDTO): Promise<ClubGonggao> {
    const res = await this.clubGonggaoService.getClubGonggaoById(parmas);
    return res;
  }

  @Post('/create')
  async createClubGonggao(@Body() body: CreateClubGonggaoDTO) {
    const g = new ClubGonggao();
    const { club_id, content, picture_url, publishtime, status } = body;
    g.club_id = club_id;
    g.content = content;
    g.picture_url = picture_url;
    g.publishtime = publishtime;
    g.status = 0;
    const res = await this.clubGonggaoService.createClubGonggao(g);
    return res;
  }

  @Get('/delete')
  async deleteClubGonggao(@Query() parmas: DeleteClubGonggaoDTO): Promise<any> {
    // const { id } = parmas;
    const res = await this.clubGonggaoService.deleteClubGonggao(parmas);
    return res;
  }

  @Post('/update')
  async updateClubGonggao(@Body() body: UpdateClubGonggaoDTO) {
    const res = await this.clubGonggaoService.updateClubGonggao(body);
    return res;
  }
}
