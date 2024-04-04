import { Context } from 'koa';
import { Like } from 'typeorm';

export const isInStatusList = (value: any) => {
  return typeof value === 'number' && [0, 1, 2].includes(value);
};

export function sendResponse(ctx: Context, data: any, error?: Error) {
  if (error) {
    // 处理错误情况
    ctx.status = 500; // 或者根据错误类型设置不同的状态码
    ctx.body = { error: error.message };
  } else {
    // 处理成功情况
    ctx.status = 200;
    ctx.body = data;
  }
}

export function feildUnique(rawArr: any, key: any) {
  const arr = [];
  for (const item of rawArr) {
    const field = item[key];
    arr.push(field);
  }
  // console.log(arr);
  // console.log(Array.from(new Set(arr)));
  const res = Array.from(new Set(arr));
  return res;
}

export function likeQueryHandler(field: string, value: any) {
  const whereConditions: any = {};
  if (!value) return {};
  whereConditions[field] = Like(`%${value}%`);
  return whereConditions;
}
