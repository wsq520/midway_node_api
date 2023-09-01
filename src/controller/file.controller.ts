import { Controller, Post, Inject, Files } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import * as path from 'path';
import * as fs from 'fs';

interface IUpoladResponse {
  message: string;
  url?: string;
}

const hostAndport = 'http://localhost:8001';

@Controller('/file')
export class HomeController {
  @Inject()
  ctx: Context;

  @Post('/upload')
  // mode为file时
  async upload(@Files() files): Promise<IUpoladResponse> {
    const originFilePath = files[0].data; //获取本次上传文件的临时存储路径
    const extName = path.extname(originFilePath); // 获取拓展名
    const folderPath = path.join(__dirname, '../../upload'); // 获取指定文件夹的路径
    // if (!fs.existsSync(folderPath)) {
    //   console.log('文件夹不存在，即将创建文件夹');
    //   try {
    //     fs.mkdirSync(folderPath, { recursive: true });
    //   } catch (e) {
    //     console.log('创建文件夹失败', e);
    //   }
    // }

    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(originFilePath);
      const fileName = `${Date.now()}_image${extName}`;
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
}
