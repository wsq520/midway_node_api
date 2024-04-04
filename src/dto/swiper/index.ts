import { Rule, RuleType } from '@midwayjs/validate';

export class FuzzyQuerySwiperDTO {
  @Rule(RuleType.string().optional().allow(""))
  desc?: string;

  @Rule(RuleType.number().optional().allow(""))
  isShow?: number;
}

export class QuerySwiperDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class CreateSwiperDTO {
  @Rule(RuleType.string().required())
  url: string;

  @Rule(RuleType.string().optional().allow(""))
  desc?: string;

  @Rule(RuleType.number().optional().allow(""))
  isShow?: number;
}

export class DeleteSwiperDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class UpdateSwiperDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required())
  url: string;

  @Rule(RuleType.string().optional().allow(""))
  desc?: string;

  @Rule(RuleType.number().optional().allow(""))
  isShow?: number;
}
