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
  QueryClubEchartDTO
} from '../dto';
import { EchartsService } from '../service';
import { sendResponse } from '../utils';

@Controller('/echarts')
export class EchartsController {
  @Inject()
  ctx: Context;

  @Inject()
  echartsServiceService: EchartsService;


  // 统计社团类型
  @Get('/clubtype')
  async getClubType() {
    const res = await this.echartsServiceService.getClubType();
    return res;
  }

  // 统计系统用户的专业、年级
  @Get('/userData')
  async getUserData() {
    const res = await this.echartsServiceService.getUserData();
    return res;
  }

  // 统计某个部门内部的成员 专业、年级、性别？（待定）
  @Get('/clubEhart')
  async getClubEhart(@Query() params: QueryClubEchartDTO) {
    const res = await this.echartsServiceService.getClubEhart(params);
    return res;
  }

  @Get('/total')
  async getSystemTotal() {
    const res = await this.echartsServiceService.getSystemTotal();
    return res;
  }
}
