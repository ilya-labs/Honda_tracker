import { Dispatch, SerializedError } from '@reduxjs/toolkit';
import { UseQueryStateResult } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useNavigate } from 'react-router-dom';
import { IHandleQueryResult } from 'src/auth/auth.types';
import { authenticationManager } from 'src/auth/authenticationManager';
import { badRequest, unauthorized } from 'src/auth/constants';

class RtkQueryResultProcessor {
  getErrorMessage(error: FetchBaseQueryError | SerializedError) {
    if (
      'data' in error &&
      typeof error.data === 'object' &&
      error.data !== null &&
      'status' in error.data &&
      typeof (error.data as any).status === 'string'
    ) {
      return (error.data as any).status || '';
    }

    return '';
  }

  getErrorCode(result: UseQueryStateResult<any, any>): number {
    return result?.error?.status;
  }

  parseQueryResult(result: UseQueryStateResult<any, any>): IHandleQueryResult {
    if (result.isError) {
      const errorMsg = this.getErrorMessage(result.error);
      const errorCode = this.getErrorCode(result.error);

      return {
        errorCode,
        errorMsg,
        isSuccess: false,
      };
    }

    if (result.isSuccess) {
      return {
        errorCode: 200,
        errorMsg: '',
        isSuccess: true,
      };
    }

    return {
      errorCode: 200,
      errorMsg: '',
      isSuccess: false,
    };
  }

  handleErrorCode(result: UseQueryStateResult<any, any>, dispatch: Dispatch) {
    const errorCode = this.getErrorCode(result);

    if (errorCode === unauthorized) {
      authenticationManager.setUnauthenticated(dispatch);
      console.warn(this.getErrorMessage(result));
    } else if (errorCode === badRequest) {
      console.warn(this.getErrorMessage(result));
    }
  }
}

export const myRtkQueryResultProcessor = new RtkQueryResultProcessor();