import { Rule, RuleType } from '@midwayjs/validate';

export class QueryCollegeDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class CreateCollegeDTO {
  @Rule(RuleType.string().required())
  college: string;
}

export class DeleteCollegeDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class UpdateCollegeDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required())
  college: string;
}
