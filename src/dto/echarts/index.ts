import { Rule, RuleType } from '@midwayjs/validate';

// export class QueryClubTypeDTO {
//   @Rule(RuleType.number().required())
//   id: number;
// }

export class QueryClubEchartDTO {
  @Rule(RuleType.number().required())
  club_id: number;
}
