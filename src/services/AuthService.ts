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
import { getAccessToken } from '../utils';

export class AuthService {
  private authService: IAuthServiceClient;

  constructor() {
    const transport = new GrpcWebFetchTransport({
      baseUrl: import.meta.env.VITE_BASE_URL
    });
    this.authService = new AuthServiceClient(transport);
  }

  private async getAuthOptions(tokenType: string) {
    let accessToken = '';
    if (tokenType === 'accessToken') {
      accessToken = (await getAccessToken()) || '';
    }

    const options: RpcOptions = {
      interceptors: [
        {
          // adds auth header to unary requests
          interceptUnary(next, method, input, optionsX: RpcOptions): UnaryCall {
            if (!optionsX.meta) {
              optionsX.meta = {};
            }
            optionsX.meta.Authorization =
              tokenType === 'emailAccessToken'
                ? localStorage.getItem('emailAccessToken') || ''
                : accessToken;
            return next(method, input, optionsX);
          }
        }
      ]
    };
    return options;
  }

  refreshToken(refToken: string) {
    return this.authService.refreshToken({ refreshToken: refToken });
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

  async verifySMSCode({ phoneNumber, code }: VerifySMSCodeRequest) {
    const authOptions = await this.getAuthOptions('emailAccessToken');
    return this.authService.verifySMSCode({ phoneNumber, code }, authOptions);
  }

  async getUser() {
    const authOptions = await this.getAuthOptions('accessToken');

    return this.authService.getUser({}, authOptions);
  }
}
