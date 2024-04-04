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
import { ClubsService } from '../service/clubs.service';
import { Clubs } from '../entity/Clubs';
import {
  QueryClubsDTO,
  CreateClubsDTO,
  DeleteClubsDTO,
  UpdateClubsDTO
} from '../dto';

@Controller('/clubs')
export class ClubsController {
  @Inject()
  ctx: Context;

  @Inject()
  clubsService: ClubsService;

  @Get('/list')
  async ClubsList(): Promise<Clubs[]> {
    const res = await this.clubsService.getClubsList();
    return res;
  }

  @Get('/info')
  async ClubsInfoById(@Query() parmas: QueryClubsDTO): Promise<Clubs> {
    const res = await this.clubsService.getClubInfoById(parmas);
    return res;
  }

  @Post('/create')
  async createClubs(@Body() body: CreateClubsDTO) {
    const c = new Clubs();
    const { club_name, club_type, student_id, introduction, views, avatar } = body;
    c.club_name = club_name;
    c.club_type = club_type;
    c.student_id = student_id;
    c.introduction = introduction;
    c.views = views;
    c.avatar = avatar;
    const res = await this.clubsService.createClubs(c);
    return res;
  }

  @Get('/delete')
  async deleteStduent(@Query() parmas: DeleteClubsDTO): Promise<any> {
    const res = await this.clubsService.deleteClubs(parmas);
    return res;
  }

  @Post('/update')
  async updateClubs(@Body() body: UpdateClubsDTO) {
    const res = await this.clubsService.updateClubs(body);
    return res;
  }
}
