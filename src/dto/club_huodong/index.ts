import { Rule, RuleType } from '@midwayjs/validate';

export class QueryClubHuodongDTO {
  @Rule(RuleType.number().required())
  huodong_id: number;
}

export class FuzzyQueryClubHuodongDTO {
  @Rule(RuleType.string().optional().allow(""))
  title?: string;

  @Rule(RuleType.string().optional().allow(""))
  club_name?: string;

  @Rule(RuleType.string().optional().allow(""))
  club_type?: string;

  @Rule(RuleType.number().optional().allow(""))
  status?: number;
}

export class CreateClubHuodongDTO {
  @Rule(RuleType.string().required())
  title: string;

  @Rule(RuleType.string().required())
  content: string;

  @Rule(RuleType.number().required())
  club_id: number;

  @Rule(RuleType.string().required())
  club_name: string;

  @Rule(RuleType.string().required())
  club_type: string;

  @Rule(RuleType.string().optional().allow(""))
  picture_url?: string;

  @Rule(RuleType.number().required())
  status: number;

  @Rule(RuleType.string().required())
  starttime: string;

  @Rule(RuleType.string().required())
  endtime: string;
}

export class DeleteClubHuodongDTO {
  @Rule(RuleType.number().required())
  huodong_id: number;
}

export class UpdateClubhuodongDTO {
  @Rule(RuleType.number().required())
  huodong_id: number;

  @Rule(RuleType.string().required())
  title: string;

  @Rule(RuleType.string().required())
  content: string;

  @Rule(RuleType.number().required())
  club_id: number;

  @Rule(RuleType.string().required())
  club_name: string;

  @Rule(RuleType.string().required())
  club_type: string;

  @Rule(RuleType.string().optional().allow(""))
  picture_url?: string;

  @Rule(RuleType.number().required())
  status: number;

  @Rule(RuleType.string().required())
  starttime: string;

  @Rule(RuleType.string().required())
  endtime: string;
}
