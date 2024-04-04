import { Rule, RuleType } from '@midwayjs/validate';

export class QueryClubAccountRegistryDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class CreateClubAccountRegistryDTO {
  @Rule(RuleType.number().required())
  student_id: number;

  @Rule(RuleType.string().required())
  club_name: string;

  @Rule(RuleType.string().required())
  club_type: string;

  @Rule(RuleType.number().required())
  status: number;
}

export class DeleteClubAccountRegistryDTO {
  @Rule(RuleType.number().required())
  id: number;

  // @Rule(RuleType.number().required())
  // club_id: string;

  // @Rule(RuleType.number().required())
  // student_id: number;
}

export class UpdateClubAccountRegistryDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.number().required())
  student_id: number;

  @Rule(RuleType.string().required())
  club_name: string;

  @Rule(RuleType.string().required())
  club_type: string;

  @Rule(RuleType.number().required())
  status: number;
}

export class LoginClubAccountRegistryDTO {
  @Rule(RuleType.string().required())
  account: string;

  @Rule(RuleType.string().required())
  password: string;
}
