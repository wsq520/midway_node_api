import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { TClass } from '../../entity/TClass';
import { CreateTClassDTO, DeleteTClassDTO, UpdateTClassDTO } from '../../dto/school/index';

@Provide()
export class TClassService {
  @InjectEntityModel(TClass)
  TClassModel: Repository<TClass>;

  async queryTClassList() {
    const res = await this.TClassModel.find();
    return res;
  }

  async createTClass(params: CreateTClassDTO) {
    const res = await this.TClassModel.save(params);
    return res;
  }

  async deleteTClass(params: DeleteTClassDTO) {
    const { class_id } = params;
    const origin = await this.TClassModel.findOne({
      where: {
        class_id
      }
    })
    if(!origin) {
      return {
        message: "该学院不存在,删除失败"
      }
    }
    const res = await this.TClassModel.remove(origin);
    return res;
  }

  async updateTClass(params: UpdateTClassDTO) {
    const { class_id, class_name } = params;
    const origin = await this.TClassModel.findOne({
      where: {
        class_id
      }
    })
    if(!origin) {
      return {
        message: "该班级不存在，修改失败"
      }
    }
    origin.class_name = class_name;
    const res = await this.TClassModel.save(origin);
    return res;
  }

  async isExist(class_name, major_id) {
    const res = this.TClassModel.findOne({
      where: {
        class_name,
        major_id,
      }
    })
    return res;
  }

}
