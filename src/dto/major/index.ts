import { Rule, RuleType } from '@midwayjs/validate';

export class QueryMajorDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class CreateMajorDTO {
  @Rule(RuleType.string().required())
  major: string;

  @Rule(RuleType.number().required())
  college_id: number;
}

export class DeleteMajorDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class UpdateMajorDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required())
  major: string;

  @Rule(RuleType.number().required())
  college_id: number;
}
