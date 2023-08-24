import { Controller, Post, Inject, Context } from '@midwayjs/core';
import * as path from 'path';
// import * as multer from 'multer';

@Controller('/file')
export class HomeController {
  @Inject()
  ctx: Context;

  // private multerInstance = multer(path.join(__dirname, '../upload'));

  @Post('/upload')
  async upload(): Promise<string> {
    // console.log(useFile());
    // this.multerInstance.single('image')(,, err => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     // 文件上传成功，可以访问上传的文件对象
    //     const file = this.ctx.requestContext;
    //     console.log(file);
    //   }
    // });
    console.log(path.join(__dirname, '../upload'));
    return 'upload~';
  }
}
