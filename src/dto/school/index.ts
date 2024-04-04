import { Rule, RuleType } from '@midwayjs/validate';

export class FuzzyQueryTGradeDTO {
  @Rule(RuleType.string().optional().allow(""))
  grade_name?: string;
}

export class QueryTGradeDTO {
  @Rule(RuleType.number().required())
  grade_id: number;
}

export class CreateTGradeDTO {
  @Rule(RuleType.string().required())
  grade_name: string;
}

export class DeleteTGradeDTO {
  @Rule(RuleType.number().required())
  grade_id: number;
}

export class UpdateTGradeDTO {
  @Rule(RuleType.number().required())
  grade_id: number;

  @Rule(RuleType.string().required())
  grade_name: string;
}

export class QueryGradeIdByGradeNameDTO {
  @Rule(RuleType.string().required())
  grade_name: string;
}

// --------------------------------

export class FuzzyQueryTCollegeDTO {
  @Rule(RuleType.string().optional().allow(""))
  grade_name: string;

  @Rule(RuleType.string().optional().allow(""))
  college_name: string;
}

export class QueryTCollegeDTO {
  @Rule(RuleType.number().required())
  college_id: number;
}

export class CreateTCollegeDTO {
  @Rule(RuleType.string().required())
  college_name: string;

  @Rule(RuleType.number().required())
  grade_id: number;
}

export class DeleteTCollegeDTO {
  @Rule(RuleType.number().required())
  college_id: number;
}

export class UpdateTCollegeDTO {
  @Rule(RuleType.number().required())
  college_id: number;

  @Rule(RuleType.string().required())
  college_name: string;
}

// ---------------
export class QueryTMajorDTO {
  @Rule(RuleType.number().required())
  major_id: number;
}

export class CreateTMajorDTO {
  @Rule(RuleType.string().required())
  major_name: string;

  @Rule(RuleType.number().required())
  college_id: number;
}

export class DeleteTMajorDTO {
  @Rule(RuleType.number().required())
  major_id: number;
}

export class UpdateTMajorDTO {
  @Rule(RuleType.number().required())
  major_id: number;

  @Rule(RuleType.string().required())
  major_name: string;
}

// ---------------------
// export class QueryTClassDTO {
//   @Rule(RuleType.number().required())
//   class_id: number;
// }

export class CreateTClassDTO {
  @Rule(RuleType.string().required())
  class_name: string;

  @Rule(RuleType.number().required())
  major_id: number;
}

export class DeleteTClassDTO {
  @Rule(RuleType.number().required())
  class_id: number;
}

export class UpdateTClassDTO {
  @Rule(RuleType.number().required())
  class_id: number;

  @Rule(RuleType.string().required())
  class_name: string;
}


