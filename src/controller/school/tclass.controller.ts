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
  CreateTClassDTO, DeleteTClassDTO, UpdateTClassDTO
} from '../../dto/school';
import { TClassService } from '../../service/school/tclass.service';
import { TClass } from '../../entity/TClass';


@Controller('/tclass')
export class TClassController {
  @Inject()
  ctx: Context;

  @Inject()
  TClassService: TClassService;

  @Get('/list')
  async queryTClassList() {
    const res = await this.TClassService.queryTClassList();
    return res;
  }

  @Post('/create')
  async createTClass(@Body() body: CreateTClassDTO) {
    const { class_name, major_id } = body;
    const flag = await this.TClassService.isExist(class_name, major_id);
    if (flag) {
      return {
        message: "该学班级已存在，请勿重复录入"
      }
    }
    const obj = new TClass();
    obj.class_name = class_name;
    obj.major_id = major_id;
    const res = await this.TClassService.createTClass(obj);
    return res;
  }

  @Post('/update')
  async updateTClass(@Body() body: UpdateTClassDTO) {
    const res = await this.TClassService.updateTClass(body);
    return res;
  }

  @Post('/delete')
  async deleteTClass(@Body() body: DeleteTClassDTO) {
    const res = await this.TClassService.deleteTClass(body);
    return res;
  }
}
