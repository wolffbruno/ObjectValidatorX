import { Validator } from "./Validator";

export class ValidationResult<A> {
  obj: (A | A[] | null);
  private validator: Validator<any>;

  constructor(obj: (A | A[] | null), validator: Validator<any>) {
    this.obj = obj;
    this.validator = validator;
  }

  then(func: (arg: (A)) => any): void {
    if (this.validator.valid && this.obj) {
      if (this.obj instanceof Array) {
        let i = 1;
        while(this.validator.valid && i <= this.obj.length) {
          this.validator.valid = func(this.obj[i - 1]) || false;
          i++;
        }
      } else {
        this.validator.valid = func(this.obj);
      }
    }
  }
}