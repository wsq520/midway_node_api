import { Rule, RuleType } from '@midwayjs/validate';

export class UpdateDTO {
  @Rule(RuleType.string().trim().required())
  id: string;
  @Rule(RuleType.string().trim().required())
  userName: string;
  @Rule(RuleType.number().required())
  age: number;
}
