import { Catch } from '@midwayjs/core';
import { MidwayValidationError } from '@midwayjs/validate';
import { Context } from '@midwayjs/koa';

@Catch(MidwayValidationError)
export class ValidateErrorFilter {
  async catch(err: MidwayValidationError, ctx: Context) {
    // ...
    console.log(ctx.message);
    return {
      status: 422,
      message: '校验参数错误,' + err.message,
      // data: null,
    };
  }
}
