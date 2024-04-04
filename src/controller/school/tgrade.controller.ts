import {
  Controller,
  Post,
  Query,
  Inject,
  Body,
  Get,
  MidwayHttpError
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

import {
  FuzzyQueryTGradeDTO, CreateTGradeDTO, DeleteTGradeDTO, UpdateTGradeDTO,QueryGradeIdByGradeNameDTO
} from '../../dto/school';
import { TGradeService } from '../../service/school/tgrade.service';
import { sendResponse } from '../../utils';
import { TGrade } from '../../entity/TGrade';


@Controller('/tgrade')
export class TgradeController {
  @Inject()
  ctx: Context;

  @Inject()
  tGradeService: TGradeService;

  @Get('/list')
  async queryTGradeList() {
    const res = await this.tGradeService.queryTGradeList();
    return res;
  }

  @Get('/fuzzy/list')
  async fuzzyQueryGradeList(@Query() params: FuzzyQueryTGradeDTO) {
    const res = await this.tGradeService.fuzzyQueryTGradeList(params);
    return res;
  }

  @Get('/getIdByName')
  async getGradeIdByGradeName(@Query() params: QueryGradeIdByGradeNameDTO) {
    const res = await this.tGradeService.getTGradeIdByGradeName(params);
    return res;
  }

  @Post('/create')
  async createTGrade(@Body() body: CreateTGradeDTO) {
    const { grade_name } = body;
    const flag = await this.tGradeService.isExist(grade_name);
    if (flag) {
      return {
        message: "该年级已存在，请勿重复录入"
      }
    }
    const obj = new TGrade();
    obj.grade_name = grade_name;
    const res = await this.tGradeService.createTGrade(obj);
    return res;
  }

  @Post('/update')
  async updateTGrade(@Body() body: UpdateTGradeDTO) {
    const res = await this.tGradeService.updateTGrade(body);
    return res;
  }

  @Post('/delete')
  async deleteTGrade(@Body() body: DeleteTGradeDTO) {
    const res = await this.tGradeService.deleteTGrade(body);
    return res;
  }
}
