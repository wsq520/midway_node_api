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
import { ClubaccountregistryService } from '../service/club_account_registry.service';
import { ClubAccountRegistry } from '../entity';
import {
  QueryClubAccountRegistryDTO,
  CreateClubAccountRegistryDTO,
  DeleteClubAccountRegistryDTO,
  UpdateClubAccountRegistryDTO,
  LoginClubAccountRegistryDTO
} from '../dto';

@Controller('/clubaccountregistry')
export class ClubaccountregistryController {
  @Inject()
  ctx: Context;

  @Inject()
  clubAccountRegistryService: ClubaccountregistryService;

  @Get('/list')
  async ClubaccountregistryList(): Promise<ClubAccountRegistry[]> {
    const res = await this.clubAccountRegistryService.getClubAccountRegistryList();
    return res;
  }

  @Get('/info')
  async ClubaccountregistryInfoById(@Query() parmas: QueryClubAccountRegistryDTO): Promise<ClubAccountRegistry> {
    const res = await this.clubAccountRegistryService.getClubAccountRegistryById(parmas);
    return res;
  }

  @Post('/create')
  async createClubaccountregistry(@Body() body: CreateClubAccountRegistryDTO) {
    const c = new ClubAccountRegistry();
    const {student_id, club_name, club_type, status} = body;
    c.student_id = student_id;
    c.club_name = club_name;
    c.club_type = club_type;
    c.status = 0;

    const res = await this.clubAccountRegistryService.createClubAccountRegistry(c);
    return res;
  }

  @Get('/delete')
  async deleteClubaccountregistry(@Query() parmas: DeleteClubAccountRegistryDTO): Promise<any> {
    // const { id } = parmas;
    const res = await this.clubAccountRegistryService.deleteClubAccountRegistry(parmas);
    return res;
  }

  @Post('/update')
  async updateClubaccountregistry(@Body() body: UpdateClubAccountRegistryDTO) {
    const res = await this.clubAccountRegistryService.updateClubAccountRegistry(body);
    return res;
  }

  @Post('/login')
  async loginClub(@Body() body: LoginClubAccountRegistryDTO) {
    // const res = await this.clubAccountRegistryService.loginClubAccountRegistry(body);
    // console.log("社团部门登录结果：", res);
    // return res;
  }
}
