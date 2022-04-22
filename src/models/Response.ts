export type Response<T> = {
  data: T;
};

export type RequestType<T> = {
  isLoading: boolean;
  data: T;
  error: Error | null;
};
