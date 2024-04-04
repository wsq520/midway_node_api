import { Rule, RuleType } from '@midwayjs/validate';

export class QueryAdminDTO {
  @Rule(RuleType.string().required())
  account: string;
  @Rule(RuleType.string().required())
  password: string;
}

// export class UpdateAdminDTO {

// }

export class FuzzyQueryAdminGonggaoDTO {
  @Rule(RuleType.string().optional().allow(""))
  title?: string;
}

export class QueryAdminGonggaoDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class CreateAmidnGonggaoDTO {
  @Rule(RuleType.string().required())
  title: string;

  @Rule(RuleType.string().required())
  content: string;

  @Rule(RuleType.string().allow(""))
  picture_url: string | undefined;

  @Rule(RuleType.string().allow(""))
  publishtime: string | undefined;
}

export class DeleteAmidnGonggaoDTO {
  @Rule(RuleType.number().required())
  id: number;
}

export class UpdateAmidnGonggaoDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required())
  title: string;

  @Rule(RuleType.string().required())
  content: string;

  @Rule(RuleType.string().allow(""))
  picture_url: string;

  @Rule(RuleType.string().required())
  publishtime: string | undefined;
}

// export class CreateAdminDTO {
//   @Rule(RuleType.string().required())
//   account: string;
//   @Rule(RuleType.string().required())
//   password: string;
//   @Rule(RuleType.string().trim().required())
//   nickname: string;
// }

// export class DeleteUserDTO {
//   @Rule(RuleType.string().trim().required())
//   id: string;
// }

// export class UpdateUserDTO {
//   @Rule(RuleType.string().trim().required())
//   id: string;
//   @Rule(RuleType.string().trim().required())
//   userName: string;
//   @Rule(RuleType.number().required())
//   age: number;
// }
