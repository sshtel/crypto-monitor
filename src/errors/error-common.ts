import { getUpbitError } from './error-upbit';

export enum ERROR_CLASS {
  EXCHG_UPBIT = 'EXCHG_UPBIT',
  EXCHG_BINANCE = 'EXCHG_BINANCE'
}

export function getError(errorClass: ERROR_CLASS, e: any) {
  switch (errorClass) {
    case ERROR_CLASS.EXCHG_UPBIT: return getUpbitError(e);
  }

}

export function getErrorMessage(errorClass: ERROR_CLASS, errorCode: any, message: string) {
  return new Error(`[ERROR] ${errorClass}:${errorCode} - ${message}`);
}

export function getUnknownErrorMessage(errorClass: ERROR_CLASS, errorCode: any) {
  return new Error(`[ERROR_UNKNOWN] ${errorClass}:${errorCode}`);
}
