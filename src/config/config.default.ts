import { MidwayConfig } from '@midwayjs/core';
import { tmpdir } from 'os';
import { join } from 'path';
import { User } from '../entity/User';
import { Photo } from '../entity/Photo';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1689835645061_9168',
  koa: {
    port: 8001,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'typeorm',
        synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: false,
        entities: [User, Photo],
      },
    },
  },
  upload: {
    mode: 'stream',
    tmpdir: join(tmpdir(), 'midway-upload-files'),
  },
  staticFile: {
    dirs: {
      default: {
        prefix: '/',
        dir: 'public',
      },
      another: {
        prefix: '/',
        dir: 'upload',
      },
    },
  },
  cors: {
    // 方法1：
    // credentials: false,

    // 方法2： credentials不配置也可以
    // credentials: true,
    // origin: 'http://localhost:8000',

    // 方法3：可以配置多个origin
    credentials: true,
    origin: ctx => {
      const allowedOrigins = ['http://localhost:8000', 'http://localhost:8002'];
      const currentRequestOrigin = ctx.get('origin');
      console.log(currentRequestOrigin);
      if (allowedOrigins.includes(currentRequestOrigin)) {
        return currentRequestOrigin;
      }
      // 这里可以设置一个默认支持的origin
      return 'http://localhost:8000';
    },
  },
} as MidwayConfig;
