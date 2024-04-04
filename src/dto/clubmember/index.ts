import { Rule, RuleType } from '@midwayjs/validate';

export class QueryClubmemberDTO {
  @Rule(RuleType.number().required())
  id: number;
}

// 学生加入社团
export class CreateClubmemberDTO {
  @Rule(RuleType.number().required())
  club_id: number;

  @Rule(RuleType.number().required())
  student_id: number;

  @Rule(RuleType.number().required())
  ispresident: number;
}

export class DeleteClubmemberDTO {
  // @Rule(RuleType.number().required())
  // id: number;

  @Rule(RuleType.number().required())
  club_id: number;

  @Rule(RuleType.number().required())
  student_id: number;
}

export class UpdateClubmemberDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.number().required())
  club_id: number;

  @Rule(RuleType.number().required())
  student_id: number;

  @Rule(RuleType.number().required())
  ispresident: number;
}

export class QueryMemberListDTO {
  @Rule(RuleType.number().required())
  club_id: number;
}

export class QueryStudentClubDTO {
  @Rule(RuleType.number().required())
  student_id: number;
}
