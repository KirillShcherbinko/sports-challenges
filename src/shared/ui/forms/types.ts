import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import type { EActionStatus } from '../error/enums';

export type TErrorFields<TFields> = {
  root?: string;
  fields?: Array<{
    field: Path<TFields>;
    message: string;
  }>;
};

export type TFormActionState<TFields> = {
  status: EActionStatus;
  errors?: TErrorFields<TFields>;
  redirect?: string;
};

export type THandleFormActionErrorsProps<TFields extends FieldValues> = {
  state: TFormActionState<TFields>;
  setError?: UseFormSetError<TFields>;
};
