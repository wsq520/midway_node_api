import { Rule, RuleType } from '@midwayjs/validate';

export class QueryClubAndClubMemeberDTO {
  @Rule(RuleType.number().required())
  club_id: number;
}

export class FuzzyQueryClubAndClubMemeberDTO {
  @Rule(RuleType.string().optional().allow(""))
  club_name?: string;

  @Rule(RuleType.string().optional().allow(""))
  club_type?: string;
}

export class FuzzyQueryClubGonggaoDTO {
  @Rule(RuleType.string().optional().allow(""))
  club_name?: string;

  @Rule(RuleType.string().optional().allow(""))
  club_type?: string;

  @Rule(RuleType.number().optional().allow(""))
  status?: number;

  @Rule(RuleType.string().optional().allow(""))
  title?: string;
}

export class FuzzyQueryClubAccountRegistryDTO {
  @Rule(RuleType.string().optional().allow(""))
  club_name?: string;

  @Rule(RuleType.string().optional().allow(""))
  club_type?: string;

  @Rule(RuleType.string().optional().allow(""))
  xuehao?: string;

  @Rule(RuleType.number().optional().allow(""))
  status?: number;
}

