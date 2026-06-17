export type TPaginationResponse = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type TGetPaginatedResponseDto<T> = {
  items: T[];
  pagination: TPaginationResponse;
};
