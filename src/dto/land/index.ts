import { Rule, RuleType } from '@midwayjs/validate';

export class QueryLandDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class CreateLandDTO {
  @Rule(RuleType.string().required())
  address: string;

  @Rule(RuleType.string().allow(""))
  picture_url: string;

  @Rule(RuleType.string().required())
  status: string;
}

export class DeleteLandDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class UpdateLandDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required())
  address: string;

  @Rule(RuleType.string().allow(""))
  picture_url: string;

  @Rule(RuleType.string().required())
  status: string;
}
