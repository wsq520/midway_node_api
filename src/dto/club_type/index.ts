import { Rule, RuleType } from '@midwayjs/validate';

export class QueryClubtypeDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class CreateClubtypeDTO {
  @Rule(RuleType.string().required())
  club_type: string;
}

export class DeleteClubtypeDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class UpdateClubtypeDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required())
  club_type: string;
}
