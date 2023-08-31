import { Controller, Post, Inject, Context, Files } from '@midwayjs/core';
import * as path from 'path';
import * as fs from 'fs';
// import * as multer from 'multer';
// import { saveFileToDestination } from '../multer';
interface IContext extends Context {
  files: any;
}
@Controller('/file')
export class HomeController {
  @Inject()
  ctx: IContext;

  // private storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     // 设置上传文件的目标文件夹
  //     cb(null, 'upload/');
  //   },
  //   filename: (req, file, cb) => {
  //     // 自定义文件名
  //     const ext = path.extname(file.originalname);
  //     cb(null, Date.now() + ext);
  //   },
  // });

  // private uploadInstance = multer({ storage: this.storage }).single('file');

  @Post('/upload')
  async upload(@Files() files): Promise<string> {
    console.log('files:', files);
    console.log(files[0].data);
    console.log(path.join(__dirname, '../upload'));
    const transformData = files[0].data;
    const folderPath = path.join(__dirname, '../../upload'); // 替换为目标文件夹的路径
    const fileName = 'image123.webp'; // 替换为要写入的文件名

    const filePath = path.join(folderPath, fileName);
    const extName = transformData._ext;
    console.log(extName);

    const writeStream = fs.createWriteStream(filePath);

    transformData.pipe(writeStream);

    writeStream.on('finish', () => {
      console.log('数据写入完成！');
    });

    writeStream.on('error', err => {
      console.error('数据写入出错：', err);
    });
    return 'upload~';
  }
}
