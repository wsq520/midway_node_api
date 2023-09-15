import { RuleType } from '@midwayjs/validate';

export enum BaseDataType {
  NUMBER = 'number',
  STRING = 'string',
}

const requiredString = RuleType.string().trim().required();
const optionalString = RuleType.string().trim().optional().allow('');
export const typeDataType = (type: BaseDataType, option = false) => {
  switch (type) {
    case BaseDataType.NUMBER:
      return option
        ? RuleType.number().optional()
        : RuleType.number().required();
    case BaseDataType.STRING:
      return option
        ? RuleType.string().trim().optional().allow('')
        : RuleType.string().trim().required();
    default:
      return RuleType.any();
  }
};

const strArray = RuleType.array().items(RuleType.string());
export const typeArray = (type: BaseDataType) => RuleType.array().items(type);

export const validateRule = {
  requiredString,
  optionalString,
  strArray,
};
