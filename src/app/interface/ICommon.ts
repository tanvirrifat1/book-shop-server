import { IGenericErrorMessage } from "../../error/Ierror";

export type IGenericResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericPaginationResponse<T> = {
  meta: {
    page: number | null;
    limit: number | null;
    total: number | null;
  };
  data: T;
};
