import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from '../dto';
import { ServiceError } from '../error/serviceError';
import { cacheService } from './redis.service';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  @Inject()
  cache_service: cacheService;

  async getUserList() {
    const key = 'userList';
    const cacheRes = await this.cache_service.getCache(key);
    if (cacheRes) {
      return cacheRes;
    }
    const userList = await this.userModel.find();
    await this.cache_service.setCache(key, userList);
    return userList;
  }

  async getUserById(id: string) {
    // console.log(id);
    // const { id } = params;
    const user = await this.userModel.findOne({
      where: {
        id: id,
      },
    });
    // console.log(user);
    return user;
  }

  async getUserInfoById(id: string) {
    const user = await this.userModel.findOne({
      where: {
        id,
      },
    });
    // console.log(user);
    return user;
  }

  async createUser(user: CreateUserDTO) {
    const { userName, age } = user;
    const newUser = new User();
    newUser.userName = userName;
    newUser.age = age;
    const res = await this.userModel.save(newUser);
    return res;
  }

  async updateUser(user: UpdateUserDTO) {
    const { id, userName, age } = user;
    const originUser = await this.userModel.findOne({
      where: {
        id,
      },
    });
    if (!originUser) return null;
    originUser.age = age;
    originUser.userName = userName;
    const res = await this.userModel.save(originUser);
    return res;
  }

  async deleteUser(id: string) {
    const user = await this.userModel.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return new ServiceError().ErrorMessage('用户不存在');
    }
    const res = await this.userModel.remove(user);
    return res;
  }
}
