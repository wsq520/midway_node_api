import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;
  @Get('/')
  async home(): Promise<string> {
    console.log('home');
    if (this.ctx.cookies.get('cid')) {
      console.log('cookies已存在');
    } else {
      this.ctx.cookies.set('cid', 'hello world', {
        domain: 'localhost', // 写cookie所在的域名
        path: '/', // 写cookie所在的路径
        maxAge: 10 * 60 * 1000, // cookie有效时长
        // expires: new Date('2017-02-15'), // cookie失效时间
        httpOnly: false, // 是否只用于http请求中获取
        overwrite: false, // 是否允许重写
      });
      this.ctx.body = 'cookie is ok';
    }
    return 'Hello Midwayjs!';
  }
}
