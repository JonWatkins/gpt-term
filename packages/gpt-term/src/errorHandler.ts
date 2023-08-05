import {
  NOT_FOUND_ERROR,
  RATE_EXCEEDED_ERROR,
  BAD_REQUEST_ERROR,
  QUOTA_EXCEEDED_ERROR,
  SEVICE_UNAVAILABLE_ERROR,
  DEFAULT_ERROR,
} from "./config";

export interface Exception {
  response: {
    status: string;
  };
}

export const parseError = (error: Exception): string => {
  const status: number = parseInt(error.response.status);
  switch (status) {
    case 404:
      return NOT_FOUND_ERROR;
    case 429:
      return RATE_EXCEEDED_ERROR;
    case 400:
      return BAD_REQUEST_ERROR;
    case 402:
      return QUOTA_EXCEEDED_ERROR;
    case 503:
      return SEVICE_UNAVAILABLE_ERROR;
    default:
      return DEFAULT_ERROR;
  }
};
