import { Rule, RuleType } from '@midwayjs/validate';

export class QueryDTO {
  @Rule(RuleType.string().trim().required())
  id: string;
}
