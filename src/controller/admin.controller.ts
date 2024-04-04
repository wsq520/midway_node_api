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
  QueryAdminDTO,
  FuzzyQueryAdminGonggaoDTO,
  QueryAdminGonggaoDTO,
  CreateAmidnGonggaoDTO,
  UpdateAmidnGonggaoDTO,
  DeleteAmidnGonggaoDTO
} from '../dto';
import { AdminService } from '../service';
import { sendResponse } from '../utils';

@Controller('/admin')
export class AdminController {
  @Inject()
  ctx: Context;

  @Inject()
  adminService: AdminService;

  @Post('/login')
  async Adminlogin(@Body() body: QueryAdminDTO): Promise<any> {
    // const { id } = parmas;
    try {
      const res = await this.adminService.Adminlogin(body);
      console.log("res", res);
      if (!res) {
        sendResponse(this.ctx, null);
        return;
      }
      sendResponse(this.ctx, res);
    } catch (error) {
      sendResponse(this.ctx, null, error);
    }
  }

  @Get('/gonggao/list')
  async getAdminGonggaoList(@Query() params: FuzzyQueryAdminGonggaoDTO) {
    const res = await this.adminService.getAdminGonggaoList(params);
    return res;
  }

  @Get('/gonggao/info')
  async getAdminGonggaoInfo(@Query() parmas: QueryAdminGonggaoDTO) {
    const res = await this.adminService.getAdminGonggaoInfoById(parmas);
    return res;
  }

  @Post('/gonggao/create')
  async CreategGonggao(@Body() body: CreateAmidnGonggaoDTO) {
    const res = this.adminService.CreateGonggao(body);
    return res;
  }

  @Post('/gonggao/update')
  async UpdateGonggao(@Body() body: UpdateAmidnGonggaoDTO) {
    const res = this.adminService.UpdateGonggao(body);
    return res;
  }

  @Get('/gonggao/delete')
  async deleteGonggao(@Query() parmas: DeleteAmidnGonggaoDTO) {
    const res = await this.adminService.DeleteGonggao(parmas)
    return res;
  }
}
