import { Controller, Post, Inject, Files, Get, Query, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import * as path from 'path';
import * as fs from 'fs';
import { FuzzyQuerySwiperDTO, QuerySwiperDTO, DeleteSwiperDTO, CreateSwiperDTO, UpdateSwiperDTO } from '../dto';
import { SwiperService } from '../service'

interface IUpoladResponse {
  message: string;
  url?: string;
}

const hostAndport = 'http://localhost:8000';

@Controller('/file')
export class FileController {
  @Inject()
  ctx: Context;

  @Inject()
  swiperService: SwiperService;

  @Post('/upload')
  async upload(@Files() files): Promise<IUpoladResponse> {
    const originFilePath = files[0].data; //获取本次上传文件的临时存储路径
    const extName = path.extname(originFilePath); // 获取拓展名
    const folderPath = path.join(__dirname, '../upload'); // 获取指定文件夹的路径
    if (!fs.existsSync(folderPath)) {
      console.log('文件夹不存在，即将创建文件夹');
      try {
        fs.mkdirSync(folderPath, { recursive: true });
      } catch (e) {
        console.log('创建文件夹失败', e);
      }
    }

    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(originFilePath);
      const fileName = `${Date.now()}${extName}`;
      const writeStream = fs.createWriteStream(
        // 这里的 / 不要乱加 否则可能出现读取文件的问题
        `${folderPath}/${fileName}`
      );

      readStream.pipe(writeStream);

      writeStream.on('finish', () => {
        resolve({
          message: '上传成功',
          url: `${hostAndport}/${fileName}`,
        });
      });

      writeStream.on('error', err => {
        reject({
          message: `上传失败${err}`,
        });
      });
    });
  }

  @Get('/swiper/list')
  async getSwiperList(@Query() params: FuzzyQuerySwiperDTO) {
    const res = await this.swiperService.getSwiperList(params);
    return res;
  }

  @Get('/swiper/info')
  async getSwiperInfoById(@Query() params: QuerySwiperDTO) {
    const res = await this.swiperService.getSwiperById(params);
    return res;
  }

  @Get('/swiper/delete')
  async deleteSwiper(@Query() parmas: DeleteSwiperDTO) {
    const res = await this.swiperService.deleteSwiper(parmas);
    return res;
  }

  @Post('/swiper/create')
  async createSwiper(@Body() body: CreateSwiperDTO) {
    const res = await this.swiperService.createSwiper(body);
    return res;
  }

  @Post('/swiper/update')
  async updateSwiper(@Body() body: UpdateSwiperDTO) {
    const res = await this.swiperService.updateSwiper(body);
    return res;
  }
}
