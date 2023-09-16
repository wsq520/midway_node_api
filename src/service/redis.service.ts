import { Provide, Inject } from '@midwayjs/core';
import { RedisService } from '@midwayjs/redis';

@Provide()
export class cacheService {
  @Inject()
  redisService: RedisService;

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
}
