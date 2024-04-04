import {
  Controller,
  Get,
  Post,
  Inject,
  Param,
  Query,
  Body,
  ALL,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

import {
  QueryClubAndClubMemeberDTO,
  FuzzyQueryClubAndClubMemeberDTO,
  FuzzyQueryClubGonggaoDTO,
  FuzzyQueryClubAccountRegistryDTO
} from '../dto';

import { UtilService } from '../service'


@Controller('/util')
export class UtilController {
  @Inject()
  ctx: Context;

  @Inject()
  utilService: UtilService;

  @Get('/queryClubAndClubMemberByClubId')
  async queryClubAndClubMemberByClubId(@Query() parmas: QueryClubAndClubMemeberDTO): Promise<any> {
    const res = await this.utilService.queryClubAndClubMemberByClubId(parmas);
    return res;
  }


  @Get('/queryClubAndClubMemberList')
  async queryClubAndCluMemberList(@Query() parmas: FuzzyQueryClubAndClubMemeberDTO) {
    const res = await this.utilService.queryClubAndCluMemberList(parmas);
    return res;
  }

  // @Get('/fuzzyQueryClubAndClubMemberListByClubName')
  // async fuzzyQueryClubAndCluMemberListByClubName(@Query() parmas: FuzzyQueryClubAndClubMemeberDTO) {
  //   const res = await this.utilService.fuzzyQueryClubAndCluMemberListByClubName(parmas);
  //   return res;
  // }


  @Get('/queryClubGonggaoList')
  async queryClubGonggaoList(@Query() params: FuzzyQueryClubGonggaoDTO) {
    const res = await this.utilService.queryClubGonggaoList(params);
    return res;
  }

  @Get('/queryClubAccountRegistryList')
  async queryClubAccountRegistryList(@Query() params:FuzzyQueryClubAccountRegistryDTO) {
    const res = await this.utilService.queryClubAccountRegistryList(params);
    return res;
  }
}
