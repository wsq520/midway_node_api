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
import { CollegeService } from '../service/college.service';
import { College } from '../entity/College';
import {
  QueryCollegeDTO,
  CreateCollegeDTO,
  DeleteCollegeDTO,
  UpdateCollegeDTO
} from '../dto';

@Controller('/college')
export class CollegeController {
  @Inject()
  ctx: Context;

  @Inject()
  collegeService: CollegeService;

  @Get('/list')
  async collegeList(): Promise<College[]> {
    console.log("获取学生信息列表");
    const res = await this.collegeService.getCollegeList();
    return res;
    // return [];
  }

  @Get('/info')
  async collegeInfoById(@Query() parmas: QueryCollegeDTO): Promise<College> {
    // const { id } = parmas;
    // console.log("id查询学院", id);
    const res = await this.collegeService.getCollegeById(parmas);
    return res;
  }

  @Post('/create')
  async createCollege(@Body() body: CreateCollegeDTO) {
    const c = new College();
    const { college } = body;
    c.college = college;

    const res = await this.collegeService.createCollege(c);
    // console.log("创建学院", res);
    return res;
  }

  @Get('/delete')
  async deleteCollege(@Query() parmas: DeleteCollegeDTO): Promise<any> {
    // const { id } = parmas;
    // console.log("id删除学生", id);
    const res = await this.collegeService.deleteCollege(parmas);
    return res;
  }

  @Post('/update')
  async updateCollege(@Body() body: UpdateCollegeDTO) {
    const res = await this.collegeService.updateCollege(body);
    return res;
  }
}
