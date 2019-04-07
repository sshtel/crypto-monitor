import {
  ERROR_CLASS,
  getErrorMessage,
  getUnknownErrorMessage
} from './error-common';

export enum ERROR_UPBIT {
  E0429_TOO_MANY_REQUESTS = 429
}

export function getUpbitError(e: any) {
  if (e && e.status) {
    console.log(e.response.request.url);
    switch (e.status) {
      case ERROR_UPBIT.E0429_TOO_MANY_REQUESTS:
        return getErrorMessage(ERROR_CLASS.EXCHG_UPBIT, ERROR_UPBIT.E0429_TOO_MANY_REQUESTS,
                       `Too many API requests. - ${JSON.stringify(e.response.headers)}`);
      default:
        return getUnknownErrorMessage(ERROR_CLASS.EXCHG_UPBIT, e.status);
    }
  } else {
    return getUnknownErrorMessage(ERROR_CLASS.EXCHG_UPBIT, 0);
  }
}
