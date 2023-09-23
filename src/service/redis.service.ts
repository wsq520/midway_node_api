import { Provide, Inject } from '@midwayjs/core';
import { RedisService } from '@midwayjs/redis';

@Provide()
export class cacheService {
  @Inject()
  redisService: RedisService;

  async isExist(key: string) {
    const res = await this.redisService.exists(key);
    return !!res;
  }

  async getCache(key: string) {
    const res = await this.redisService.get(key);
    if (res) {
      return JSON.parse(res);
    }
    return null;
  }

  async setCache(key: string, value: any) {
    await this.redisService.set(key, JSON.stringify(value));
  }

  async deleteCache(key: string) {
    const isExist = await this.isExist(key);
    if (isExist) {
      await this.redisService.del(key);
      return true;
    }
    return false;
  }
}
