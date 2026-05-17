import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import type { EFormActionStatus } from './enums';

export type TErrorFields<TFields> = {
  root?: string;
  fields?: Array<{
    field: Path<TFields>;
    message: string;
  }>;
};

export type TActionState<TFields> = {
  status: EFormActionStatus;
  errors?: TErrorFields<TFields>;
  redirect?: string;
};

export type THandleActionErrorsProps<TFields extends FieldValues> = {
  state: TActionState<TFields>;
  setError?: UseFormSetError<TFields>;
};
