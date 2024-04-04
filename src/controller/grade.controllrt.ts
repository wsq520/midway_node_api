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
import { GradeService } from '../service/grade.service';
import { Grade } from '../entity/Grade';
import {
  QueryGradeDTO,
  CreateGradeDTO,
  DeleteGradeDTO,
  UpdateGradeDTO
} from '../dto';

@Controller('/grade')
export class GradeController {
  @Inject()
  ctx: Context;

  @Inject()
  gradeService: GradeService;

  @Get('/list')
  async gradeList(): Promise<Grade[]> {
    const res = await this.gradeService.getGradeList();
    return res;
    // return [];
  }

  @Get('/info')
  async gradeInfoById(@Query() parmas: QueryGradeDTO): Promise<Grade> {
    // const { id } = parmas;
    // console.log("id查询学", id);
    const res = await this.gradeService.getGradeById(parmas);
    return res;
  }

  @Post('/create')
  async createGrade(@Body() body: CreateGradeDTO) {
    const g = new Grade();
    const { grade } = body;
    g.grade = grade;

    const res = await this.gradeService.createGrade(g);
    return res;
  }

  @Get('/delete')
  async deleteGrade(@Query() parmas: DeleteGradeDTO): Promise<any> {
    // const { id } = parmas;
    const res = await this.gradeService.deleteGrade(parmas);
    return res;
  }

  @Post('/update')
  async updateGrade(@Body() body: UpdateGradeDTO) {
    const res = await this.gradeService.updateGrade(body);
    return res;
  }
}
