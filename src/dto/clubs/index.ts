import { Rule, RuleType } from '@midwayjs/validate';

export class QueryClubsDTO {
  @Rule(RuleType.number().required())
  club_id: number;
}

export class CreateClubsDTO {
  @Rule(RuleType.string().required())
  club_name: string;

  @Rule(RuleType.string().required())
  club_type: string;

  @Rule(RuleType.number().required())
  student_id: number;

  @Rule(RuleType.string())
  introduction: string | undefined;

  @Rule(RuleType.number().required())
  views: number;

  @Rule(RuleType.string())
  avatar: string | undefined;
}

export class DeleteClubsDTO {
  @Rule(RuleType.number().required())
  club_id: number;
}

export class UpdateClubsDTO {
  @Rule(RuleType.number().required())
  club_id: number;

  @Rule(RuleType.string().required())
  club_name: string;

  @Rule(RuleType.string().required())
  club_type: string;

  @Rule(RuleType.number().required())
  student_id: number;

  @Rule(RuleType.string().allow(""))
  introduction: string | undefined;

  @Rule(RuleType.number().required())
  views: number;

  @Rule(RuleType.string().allow(""))
  avatar: string | undefined;
}

export class FuzzyQueryClubIdListDTO {
  @Rule(RuleType.string().optional().allow(""))
  club_name?: string;

  @Rule(RuleType.string().optional().allow(""))
  club_type?: string;
}
