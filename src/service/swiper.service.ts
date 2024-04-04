import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Swiper } from '../entity';
import { Repository } from 'typeorm';
import { QuerySwiperDTO, CreateSwiperDTO, UpdateSwiperDTO, DeleteSwiperDTO, FuzzyQuerySwiperDTO } from '../dto';
import { likeQueryHandler } from '../utils';

@Provide()
export class SwiperService {
  @InjectEntityModel(Swiper)
  swiperModel: Repository<Swiper>;


  async getSwiperList(params: FuzzyQuerySwiperDTO) {
    const { desc, isShow } = params;
    // console.log("desc:", desc, "isShow:", isShow);
    let list = await this.swiperModel.find({
      where: {
        ...likeQueryHandler("desc", desc),
      },
      order: {
        id: 'DESC',
      }
    });
    // console.log(list);
    const arr = [0, 1];
    if (typeof isShow === 'number' && arr.includes(isShow)) {
      console.log("需要过滤");
      list = list.filter(item => item.isShow === isShow);
    }

    return list;
  }

  async getSwiperById(params: QuerySwiperDTO) {
    const { id } = params;
    const Swiper = await this.swiperModel.findOne({
      where: {
        id: id,
      },
    });
    return Swiper;
  }

  async createSwiper(s: CreateSwiperDTO) {
    const res = await this.swiperModel.save(s)
    return res;
  }

  async deleteSwiper(params: DeleteSwiperDTO) {
    const { id } = params;
    const swiper = await this.swiperModel.findOne({
      where: {
        id
      }
    });
    if (!swiper) {
      console.log("图片不存在");
      return;
    }
    const res = await this.swiperModel.remove(swiper);
    return res;
  }

  async updateSwiper(parmas: UpdateSwiperDTO) {
    const { id, url, desc, isShow } = parmas;
    const origin = await this.swiperModel.findOne({
      where: {
        id
      }
    })
    if (!origin) return null;
    origin.url = url;
    origin.desc = desc;
    origin.isShow = isShow;
    const res = await this.swiperModel.save(origin);
    return res;
  }
}
