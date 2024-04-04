// import {
//   Controller,
//   Get,
//   Post,
//   Inject,
//   Param,
//   Query,
//   Body,
//   ALL,
// } from '@midwayjs/core';
// import { Context } from '@midwayjs/koa';
// import { UserService } from '../service/user.service';
// import { User } from '../entity/User';
// import {
//   CreateUserDTO,
//   QueryUserDTO,
//   UpdateUserDTO,
//   DeleteUserDTO,
// } from '../dto';

// @Controller('/')
// export class UserController {
//   @Inject()
//   ctx: Context;

//   @Inject()
//   userService: UserService;

//   @Get('/userList')
//   async userList(): Promise<User[]> {
//     const userList = await this.userService.getUserList();
//     return userList;
//   }

//   @Get('/user/:id')
//   async getUserById(@Param() parmas: QueryUserDTO): Promise<User> {
//     const { id } = parmas;
//     const user = await this.userService.getUserById(id);
//     return user;
//   }

//   @Get('/userId')
//   async getUserInfoById(@Query() parmas: QueryUserDTO): Promise<User> {
//     const { id } = parmas;
//     const user = this.userService.getUserInfoById(id);
//     return user;
//   }

//   @Post('/user/create')
//   async createUser(@Body() body: CreateUserDTO) {
//     // console.log(body);
//     const res = await this.userService.createUser(body);
//     return res;
//   }

//   @Post('/user/update')
//   async udpateUser(@Body(ALL) body: UpdateUserDTO) {
//     // console.log(body);
//     const res = await this.userService.updateUser(body);
//     return res;
//   }

//   @Post('/user/delete')
//   async deleteUser(@Query() params: DeleteUserDTO) {
//     const { id } = params;
//     const res = await this.userService.deleteUser(id);
//     // if (!res) {
//     //   return {
//     //     error: '出错咯',
//     //     message: '用户不存在',
//     //   };
//     // }
//     return res;
//   }
// }
