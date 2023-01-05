/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import type { RpcOptions, UnaryCall } from '@protobuf-ts/runtime-rpc';
import { getAccessToken } from '../utils';

import type { IInfluencerServiceClient } from '../api/influencerpb/v1/influencer.client';
import { InfluencerServiceClient } from '../api/influencerpb/v1/influencer.client';

export class InfluencerService {
  private influencerService: IInfluencerServiceClient;

  constructor() {
    const transport = new GrpcWebFetchTransport({
      baseUrl: import.meta.env.VITE_BASE_URL
    });
    this.influencerService = new InfluencerServiceClient(transport);
  }

  private async getAuthOptions() {
    const accessToken = await getAccessToken();

    const options: RpcOptions = {
      interceptors: [
        {
          // adds auth header to unary requests
          interceptUnary(next, method, input, optionsX: RpcOptions): UnaryCall {
            if (!optionsX.meta) {
              optionsX.meta = {};
            }
            optionsX.meta.Authorization = accessToken || '';
            return next(method, input, optionsX);
          }
        }
      ]
    };
    return options;
  }

  async getInfluencerProfile() {
    const authOptions = await this.getAuthOptions();
    return this.influencerService.getProfile({}, authOptions);
  }

  async registerInfluencer(name: string) {
    const authOptions = await this.getAuthOptions();
    return this.influencerService.register({ name }, authOptions);
  }
}
