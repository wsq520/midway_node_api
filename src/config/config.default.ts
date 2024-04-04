import { MidwayConfig } from '@midwayjs/core';
import { tmpdir } from 'os';
import { join } from 'path';
import {
  Swiper,
  Admin, Student, College, Major, Grade, Land, ZhaoxinPublish,
  Zhaoxinsqrecord, AdminGonggao, Clubtype, ClubAccountRegistry, Clubs, Clubmember, ClubGonggao, ClubHuodong,
} from '../entity';

import { TGrade } from '../entity/TGrade';
import { TCollege } from '../entity/TCollege';
import { TMajor } from '../entity/TMajor';
import { TClass } from '../entity/TClass';

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
        database: 'xyzx',
        synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: false,
        entities: [TGrade, TCollege, TMajor, TClass, Swiper, Admin, AdminGonggao, Student, College, Major, Grade, Land, ZhaoxinPublish, Zhaoxinsqrecord, Clubtype, ClubAccountRegistry, Clubs, Clubmember, ClubGonggao, ClubHuodong],
      },
    },
  },
  // redis: {
  //   client: {
  //     host: '127.0.0.1',
  //     port: 6379,
  //     password: 'root',
  //     db: 0,
  //   },
  // },
  upload: {
    mode: 'file',
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
        dir: 'src/upload',
      },
    },
  },
  cors: {
    // 方法1：
    credentials: false,

    // 方法2： credentials不配置也可以
    // credentials: true,
    // origin: 'http://localhost:8000',

    // 方法3：可以配置多个origin
    // credentials: true,
    // origin: ctx => {
    //   const allowedOrigins = ['http://localhost:8000', 'http://localhost:8002'];
    //   const currentRequestOrigin = ctx.get('origin');
    //   console.log(currentRequestOrigin);
    //   if (allowedOrigins.includes(currentRequestOrigin)) {
    //     return currentRequestOrigin;
    //   }
    //   // 这里可以设置一个默认支持的origin
    //   return 'http://localhost:8000';
    // },
  },
} as MidwayConfig;
