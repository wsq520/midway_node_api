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
import { ClubmemberService } from '../service/clubmember.service';
import { Clubmember } from '../entity/Clubmember';
import {
  QueryClubmemberDTO,
  CreateClubmemberDTO,
  DeleteClubmemberDTO,
  UpdateClubmemberDTO,
  QueryMemberListDTO,
  QueryStudentClubDTO
} from '../dto';

@Controller('/clubmember')
export class ClubmemberController {
  @Inject()
  ctx: Context;

  @Inject()
  clubmemberService: ClubmemberService;

  @Get('/list')
  async ClubmemberList(): Promise<Clubmember[]> {
    const res = await this.clubmemberService.getClubmemberList();
    return res;
  }

  @Get('/info')
  async ClubmemberInfoById(@Query() parmas: QueryClubmemberDTO): Promise<Clubmember> {
    const res = await this.clubmemberService.getClubmemberById(parmas);
    return res;
  }

  @Post('/create')
  async createClubmember(@Body() body: CreateClubmemberDTO) {
    const c = new Clubmember();
    const { club_id, student_id, ispresident } = body;
    c.club_id = club_id;
    c.student_id = student_id;
    c.ispresident = ispresident;

    const res = await this.clubmemberService.createClubmember(c);
    return res;
  }

  @Get('/delete')
  async deleteClubmember(@Query() parmas: DeleteClubmemberDTO): Promise<any> {
    const res = await this.clubmemberService.deleteClubmember(parmas);
    return res;
  }

  @Post('/update')
  async updateClubmember(@Body() body: UpdateClubmemberDTO) {
    const res = await this.clubmemberService.updateClubmember(body);
    return res;
  }

  @Get('/memberlist')
  async getClubMemberListById(@Query() parmas:QueryMemberListDTO) {
    const res = await this.clubmemberService.getClubMemberListById(parmas);
    // console.log(res);
    return res;
  }

  @Get('/allMemberList')
  async getAllClubMemberList() {
    const res = await this.clubmemberService.getAllClubMemberList();
    return res;
  }

  // 根据学生id查询他所加入的所有的社团的信息
  @Get('/studentClub')
  async getClubListByStudentId(@Query() parmas:QueryStudentClubDTO) {
    // const { student_id } = parmas;
    const res = await this.clubmemberService.getClubListByStudentId(parmas);
    return res;
  }
}
