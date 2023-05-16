export type ValidatedValue = string | number | boolean;
type Validation = (value: ValidatedValue) => boolean;

export interface Rules {
  required?: boolean;
  min?: number;
  max?: number;
  validate?: Validation;
  pattern?: RegExp;
}

export type ValidationRules = Record<string, Rules>;
export type ErrMessageKeys = Record<string, string>;
