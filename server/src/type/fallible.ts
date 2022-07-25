
export type SuccessResult<T> = {
  success: true;
  data: T;
};

export type FailResult<T> = {
  success: false;
  error: T;
};

export type Fallible<DataType, ErrorType> =
  SuccessResult<DataType> | FailResult<ErrorType>;
