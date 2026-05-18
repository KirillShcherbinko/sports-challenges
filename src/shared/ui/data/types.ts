import type { EActionStatus } from '../error/enums';

export type TDataAction<TData> = {
  status: EActionStatus;
  data?: TData;
  error?: string;
};
