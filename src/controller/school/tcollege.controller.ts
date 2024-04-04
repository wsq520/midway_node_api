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
  FuzzyQueryTCollegeDTO, CreateTCollegeDTO, DeleteTCollegeDTO, UpdateTCollegeDTO
} from '../../dto/school';
import { TCollegeService } from '../../service/school/tcollege.service';
import { TCollege } from '../../entity/TCollege';


@Controller('/tcollege')
export class TCollegeController {
  @Inject()
  ctx: Context;

  @Inject()
  TCollegeService: TCollegeService;

  @Get('/list')
  async queryTCollegeList() {
    const res = await this.TCollegeService.queryTCollegeList();
    return res;
  }

  @Get('/fuzzy/list')
  async fuzzyQueryTCollegeList(@Query() params: FuzzyQueryTCollegeDTO) {
    const res = await this.TCollegeService.fuzzyQueryTCollegeList(params);
    return res;
  }

  @Post('/create')
  async createTCollege(@Body() body: CreateTCollegeDTO) {
    const { college_name, grade_id } = body;
    const flag = await this.TCollegeService.isExist(college_name, grade_id);
    if (flag) {
      return {
        message: "该年级下此学院已存在，请勿重复录入"
      }
    }
    const obj = new TCollege();
    obj.college_name = college_name;
    obj.grade_id = grade_id;
    const res = await this.TCollegeService.createTCollege(obj);
    return res;
  }

  @Post('/update')
  async updateTCollege(@Body() body: UpdateTCollegeDTO) {
    const res = await this.TCollegeService.updateTCollege(body);
    return res;
  }

  @Post('/delete')
  async deleteTCollege(@Body() body: DeleteTCollegeDTO) {
    const res = await this.TCollegeService.deleteTCollege(body);
    return res;
  }
}
