import {
  Controller,
  Get,
  Post,
  Inject,
  Param,
  Query,
  Body,
  ALL,
  Context,
} from '@midwayjs/core';
import { UserService } from '../service/user.service';
import { User } from '../entity/User';
import { QueryDTO } from '../dto/user/query';
import { CreateDTO } from '../dto/user/create';
import { UpdateDTO } from '../dto/user/update';
import { DeleteDTO } from '../dto/user/delete';

@Controller('/')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/userList')
  async userList(): Promise<User[]> {
    const userList = await this.userService.getUserList();
    return userList;
  }

  @Get('/user/:id')
  async getUserById(@Param() parmas: QueryDTO): Promise<User> {
    console.log(parmas);
    const { id } = parmas;
    const user = await this.userService.getUserById(id);
    return user;
  }

  @Get('/userId')
  async getUserInfoById(@Query() parmas: QueryDTO): Promise<User> {
    const { id } = parmas;
    const user = this.userService.getUserInfoById(id);
    return user;
  }

  @Post('/user/create')
  async createUser(@Body() body: CreateDTO) {
    // console.log(body);
    const res = await this.userService.createUser(body);
    return res;
  }

  @Post('/user/update')
  async udpateUser(@Body(ALL) body: UpdateDTO) {
    // console.log(body);
    const res = await this.userService.updateUser(body);
    return res;
  }

  @Post('/user/delete')
  async deleteUser(@Query() params: DeleteDTO) {
    const { id } = params;
    const res = await this.userService.deleteUser(id);
    // if (!res) {
    //   return {
    //     error: '出错咯',
    //     message: '用户不存在',
    //   };
    // }
    return res;
  }
}
