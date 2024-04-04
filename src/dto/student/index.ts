import { Rule, RuleType } from '@midwayjs/validate';

// 根据id查询学生
export class QueryStudentDTO {
  @Rule(RuleType.number().required())
  student_id: number;
}

// 模糊查询
export class FuzzyQueryStudentDTO {
  // @Rule(RuleType.string().optional().allow(""))
  // grade?: string;
  @Rule(RuleType.string().optional().allow(""))
  college?: string;

  @Rule(RuleType.string().optional().allow(""))
  major?: string;

  @Rule(RuleType.string().optional().allow(""))
  xuehao?: string;

  @Rule(RuleType.string().optional().allow(""))
  name?: string;
}

export class CreateStudentDTO {
  @Rule(RuleType.string().required())
  xuehao: string;

  @Rule(RuleType.string().required())
  password: string;

  @Rule(RuleType.string().required())
  college: string;

  @Rule(RuleType.string().required())
  grade: string;

  @Rule(RuleType.string().required())
  major: string;

  @Rule(RuleType.string().required())
  classname: string;

  @Rule(RuleType.string().required())
  gender: string;

  @Rule(RuleType.string().required())
  phone: string;

  @Rule(RuleType.string().required())
  name: string;
}

export class DeleteStudentDTO {
  @Rule(RuleType.number().required())
  student_id: number;
}

export class UpdateStudentDTO {
  @Rule(RuleType.number().required())
  student_id: number;

  @Rule(RuleType.string().required())
  xuehao: string;

  @Rule(RuleType.string().required())
  password: string;

  @Rule(RuleType.string().required())
  college: string;

  @Rule(RuleType.string().required())
  grade: string;

  @Rule(RuleType.string().required())
  major: string;

  @Rule(RuleType.string().required())
  classname: string;

  @Rule(RuleType.string().required())
  gender: string;

  @Rule(RuleType.string().required())
  phone: string;

  @Rule(RuleType.string().required())
  name: string;
}
