/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import type { RpcOptions, UnaryCall } from '@protobuf-ts/runtime-rpc';
import {
  RequestEmailLinkRequest,
  RequestSMSCodeRequest,
  VerifyEmailCodeRequest,
  VerifySMSCodeRequest
} from '../api/authpb/v1/auth';
import type { IAuthServiceClient } from '../api/authpb/v1/auth.client';
import { AuthServiceClient } from '../api/authpb/v1/auth.client';

export class AuthService {
  private authService: IAuthServiceClient;

  constructor() {
    const transport = new GrpcWebFetchTransport({
      baseUrl: import.meta.env.VITE_BASE_URL
    });
    this.authService = new AuthServiceClient(transport);
  }

  private getAuthOptions(tokenType: string) {
    const options: RpcOptions = {
      interceptors: [
        {
          // adds auth header to unary requests
          interceptUnary(next, method, input, optionsX: RpcOptions): UnaryCall {
            if (!optionsX.meta) {
              optionsX.meta = {};
            }
            optionsX.meta.Authorization = localStorage.getItem(tokenType) || '';
            return next(method, input, optionsX);
          }
        }
      ]
    };
    return options;
  }

  requestEmailLink({ email, appType }: RequestEmailLinkRequest) {
    return this.authService.requestEmailLink({ email, appType });
  }

  requestSMSCode({ phoneNumber }: RequestSMSCodeRequest) {
    return this.authService.requestSMSCode({ phoneNumber });
  }

  verifyEmailCode({ email, code }: VerifyEmailCodeRequest) {
    return this.authService.verifyEmailCode({ email, code });
  }

  verifySMSCode({ phoneNumber, code }: VerifySMSCodeRequest) {
    return this.authService.verifySMSCode(
      { phoneNumber, code },
      this.getAuthOptions('emailAccessToken')
    );
  }

  getUser() {
    return this.authService.getUser({}, this.getAuthOptions('accessToken'));
  }
}
