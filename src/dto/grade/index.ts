import { Rule, RuleType } from '@midwayjs/validate';

export class QueryGradeDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class CreateGradeDTO {
  @Rule(RuleType.string().required())
  grade: string;
}

export class DeleteGradeDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class UpdateGradeDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required())
  grade: string;
}
