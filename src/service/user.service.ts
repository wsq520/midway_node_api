import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { CreateDTO } from '../dto/user/create';
import { UpdateDTO } from '../dto/user/update';
import { ServiceError } from '../error/serviceError';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  async getUserList() {
    const userList = await this.userModel.find();
    // console.log(userList);
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

  async createUser(user: CreateDTO) {
    const { userName, age } = user;
    const newUser = new User();
    newUser.userName = userName;
    newUser.age = age;
    const res = await this.userModel.save(newUser);
    return res;
  }

  async updateUser(user: UpdateDTO) {
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
