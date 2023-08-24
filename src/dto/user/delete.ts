import { Rule, RuleType } from '@midwayjs/validate';

export class DeleteDTO {
  @Rule(RuleType.string().trim().required())
  id: string;
}
