export default class ValidatorModel<T> {
  GetErrorMessage!: (value: T) => string;
  ValidationFn!: (value: T) => boolean;

  constructor(obj?: Partial<ValidatorModel<T>>) {
    Object.assign(this, obj);
  }
}
