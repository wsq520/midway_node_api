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
import { MajorService } from '../service/major.service';
import { Major } from '../entity/Major';
import {
  QueryMajorDTO,
  CreateMajorDTO,
  DeleteMajorDTO,
  UpdateMajorDTO
} from '../dto';

@Controller('/major')
export class MajorController {
  @Inject()
  ctx: Context;

  @Inject()
  majorService: MajorService;

  @Get('/list')
  async majorList(): Promise<Major[]> {
    const res = await this.majorService.getMajorList();
    return res;
  }

  @Get('/info')
  async majorInfoById(@Query() parmas: QueryMajorDTO): Promise<Major> {
    const res = await this.majorService.getMajorById(parmas);
    return res;
  }

  @Post('/create')
  async createMajor(@Body() body: CreateMajorDTO) {
    const m = new Major();
    const { major, college_id } = body;
    m.major = major;
    m.college_id = college_id;

    const res = await this.majorService.createMajor(m);
    return res;
  }

  @Get('/delete')
  async deleteMajor(@Query() parmas: DeleteMajorDTO): Promise<any> {
    // const { id } = parmas;
    const res = await this.majorService.deleteMajor(parmas);
    return res;
  }

  @Post('/update')
  async updateMajor(@Body() body: UpdateMajorDTO) {
    const res = await this.majorService.updateMajor(body);
    return res;
  }
}
