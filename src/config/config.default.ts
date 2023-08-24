import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/User';
import { Photo } from '../entity/Photo';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1689835645061_9168',
  koa: {
    port: 8000,
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
    mode: 'file',
  },
} as MidwayConfig;
