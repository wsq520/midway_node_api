import { Rule, RuleType } from '@midwayjs/validate';

export class QueryClubGonggaoDTO {
  @Rule(RuleType.number().required())
  id: number;
}

// export class FuzzyQueryClubGonggaoDTO {
//   @Rule(RuleType.string().optional().allow(""))
//   club_name?: string;

//   @Rule(RuleType.string().optional().allow(""))
//   club_type?: string;

//   @Rule(RuleType.string().optional().allow(""))
//   status?: number;

//   @Rule(RuleType.string().optional().allow(""))
//   title?: string;
// }

export class QueryClubGonggaoByClubIdDTO {
  @Rule(RuleType.number().required())
  club_id: number;
}

export class CreateClubGonggaoDTO {
  @Rule(RuleType.number().required())
  club_id: number;

  @Rule(RuleType.string().required())
  title: string;

  @Rule(RuleType.string().required())
  content: string;

  @Rule(RuleType.string())
  picture_url: string | undefined;

  @Rule(RuleType.string().required())
  publishtime: string;

  @Rule(RuleType.number().required())
  status: number;
}

export class DeleteClubGonggaoDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class UpdateClubGonggaoDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.number().required())
  club_id: number;

  @Rule(RuleType.string().required())
  title: string;

  @Rule(RuleType.string().required())
  content: string;

  @Rule(RuleType.string())
  picture_url: string | undefined;

  @Rule(RuleType.string().required())
  publishtime: string;

  @Rule(RuleType.number().required())
  status: number;
}
