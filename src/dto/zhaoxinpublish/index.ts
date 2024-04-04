import { Rule, RuleType } from '@midwayjs/validate';

export class FuzzyQueryZhaoxinPublishDTO {
  @Rule(RuleType.string().optional().allow(""))
  club_name?: string;

  @Rule(RuleType.string().optional().allow(""))
  club_type?: string;

  @Rule(RuleType.number().optional().allow(""))
  status?: number;

  @Rule(RuleType.string().optional().allow(""))
  title?: string;
}


export class QueryZhaoxinPublishDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class QueryClubZhaoxinPublishDTO {
  @Rule(RuleType.number().required())
  club_id: number;
}

export class CreateZhaoxinPublishDTO {
  @Rule(RuleType.number().required())
  club_id: number;

  @Rule(RuleType.string().required())
  title: string;

  @Rule(RuleType.string().required())
  content: string;

  @Rule(RuleType.string().allow(""))
  picture_url: string | undefined;

  @Rule(RuleType.string().required())
  starttime: string;

  @Rule(RuleType.string().required())
  endtime: string;
}

export class DeleteZhaoxinPublishDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class UpdateZhaoxinPublishDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.number().required())
  club_id: number;

  @Rule(RuleType.string().required())
  title: string;

  @Rule(RuleType.string().required())
  content: string;

  @Rule(RuleType.string().optional().allow(""))
  picture_url?: string;

  @Rule(RuleType.number().required())
  status: number;

  @Rule(RuleType.string().required())
  starttime: string;

  @Rule(RuleType.string().required())
  endtime: string;
}
