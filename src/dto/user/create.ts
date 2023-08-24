import { Rule, RuleType } from '@midwayjs/validate';

export class CreateDTO {
  @Rule(RuleType.string().trim().required())
  userName: string;
  @Rule(RuleType.number().required())
  age: number;
}
