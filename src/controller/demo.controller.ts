import { Controller, Inject, Get, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { typeDataType, BaseDataType } from '../validateRules';
import { Rule } from '@midwayjs/validate';

class ParamDto {
  @Rule(typeDataType(BaseDataType.NUMBER))
  id: number;
  @Rule(typeDataType(BaseDataType.STRING))
  name: string;
}

@Controller('/demo')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/test')
  async test1(@Query() params: ParamDto) {
    console.log('parmas:', params);
  }
}
