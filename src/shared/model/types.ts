export type TResult<TData> = {
  success: boolean;
  data?: TData;
  error?: string;
};
