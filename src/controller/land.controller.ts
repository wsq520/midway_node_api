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
import { LandService } from '../service/land.service';
import { Land } from '../entity/Land';
import {
  QueryLandDTO,
  CreateLandDTO,
  DeleteLandDTO,
  UpdateLandDTO
} from '../dto';

@Controller('/land')
export class LandController {
  @Inject()
  ctx: Context;

  @Inject()
  landService: LandService;

  @Get('/list')
  async landList(): Promise<Land[]> {
    const res = await this.landService.getLandList();
    return res;
  }

  @Get('/info')
  async landInfoById(@Query() parmas: QueryLandDTO): Promise<Land> {
    // const { id } = parmas;
    // console.log("id查询学", id);
    const res = await this.landService.getLandById(parmas);
    return res;
  }

  @Post('/create')
  async createLand(@Body() body: CreateLandDTO) {
    const l = new Land();
    const { address, status, picture_url } = body;
    l.address = address;
    l.status= status;
    l.picture_url = picture_url;

    const res = await this.landService.createLand(l);
    return res;
  }

  @Get('/delete')
  async deleteLand(@Query() parmas: DeleteLandDTO): Promise<any> {
    // const { id } = parmas;
    const res = await this.landService.deleteLand(parmas);
    return res;
  }

  @Post('/update')
  async updateLand(@Body() body: UpdateLandDTO) {
    const res = await this.landService.updateLand(body);
    return res;
  }
}
