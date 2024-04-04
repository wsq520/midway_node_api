import {
  Controller,
  Post,
  Query,
  Inject,
  Body,
  Get,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

import {
  CreateTMajorDTO, DeleteTMajorDTO, UpdateTMajorDTO
} from '../../dto/school';
import { TMajorService } from '../../service/school/tmajor.service';
import { TMajor } from '../../entity/TMajor';


@Controller('/tmajor')
export class TMajorController {
  @Inject()
  ctx: Context;

  @Inject()
  TMajorService: TMajorService;

  @Get('/list')
  async queryTMajorList() {
    const res = await this.TMajorService.queryTMajorList();
    return res;
  }

  @Post('/create')
  async createTMajor(@Body() body: CreateTMajorDTO) {
    const { major_name, college_id } = body;
    const flag = await this.TMajorService.isExist(major_name, college_id);
    if (flag) {
      return {
        message: "该学院下此专业已存在，请勿重复录入"
      }
    }
    const obj = new TMajor();
    obj.major_name = major_name;
    obj.college_id = college_id;
    const res = await this.TMajorService.createTMajor(obj);
    return res;
  }

  @Post('/update')
  async updateTMajor(@Body() body: UpdateTMajorDTO) {
    const res = await this.TMajorService.updateTMajor(body);
    return res;
  }

  @Post('/delete')
  async deleteTMajor(@Body() body: DeleteTMajorDTO) {
    const res = await this.TMajorService.deleteTMajor(body);
    return res;
  }
}
