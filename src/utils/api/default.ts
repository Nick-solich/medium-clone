export interface ErrorResponseInterface {
  errors: {
    body: string[];
  };
}
export interface DefaultResponseInterface {
  ok: boolean;
  status: number;
  message: string;
}
