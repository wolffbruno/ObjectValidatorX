import { ValidationResult } from "./ValidationResult";

export class Validator<T> {
  private obj: T;
  valid: boolean = true;

  constructor(obj: T) {
    this.obj = obj;
  }

  has<B>(func: ((arg: T) => (B[] | B))): ValidationResult<B> {
    const param = func(this.obj);

    if (param) {
      if (param instanceof Array && param.length > 0) {
        return new ValidationResult(param, this);
      }
    }

    this.valid = true;
    return new ValidationResult(param, this);
  }
}