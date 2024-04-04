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
import { ClubtypeService } from '../service/clubtype.service';
import { Clubtype } from '../entity/Clubtype';
import {
  QueryClubtypeDTO,
  CreateClubtypeDTO,
  DeleteClubtypeDTO,
  UpdateClubtypeDTO
} from '../dto';

@Controller('/clubtype')
export class ClubtypeController {
  @Inject()
  ctx: Context;

  @Inject()
  clubtypeService: ClubtypeService;

  @Get('/list')
  async clubtypeList(): Promise<Clubtype[]> {
    const res = await this.clubtypeService.getClubtypeList();
    return res;
  }

  @Get('/info')
  async clubtypeInfoById(@Query() parmas: QueryClubtypeDTO): Promise<Clubtype> {
    const res = await this.clubtypeService.getClubtypeById(parmas);
    return res;
  }

  @Post('/create')
  async createClubtype(@Body() body: CreateClubtypeDTO) {
    const c = new Clubtype();
    const { club_type } = body;
    c.club_type = club_type;

    const res = await this.clubtypeService.createClubtype(c);
    return res;
  }

  @Get('/delete')
  async deleteClubtype(@Query() parmas: DeleteClubtypeDTO): Promise<any> {
    // const { id } = parmas;
    const res = await this.clubtypeService.deleteClubtype(parmas);
    return res;
  }

  @Post('/update')
  async updateClubtype(@Body() body: UpdateClubtypeDTO) {
    const res = await this.clubtypeService.updateClubtype(body);
    return res;
  }
}
