/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import type { RpcOptions, UnaryCall } from '@protobuf-ts/runtime-rpc';
import { getAccessToken } from '../utils';

import type { IInfluencerServiceClient } from '../api/influencerpb/v1/influencer.client';
import { InfluencerServiceClient } from '../api/influencerpb/v1/influencer.client';
import { SendMessageRequest } from '../api/influencerpb/v1/influencer';

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

  async getInfluencerConversations() {
    const authOptions = await this.getAuthOptions();
    return this.influencerService.listConversations({}, authOptions);
  }

  async getInfluencerMessages(vendorId: string) {
    const authOptions = await this.getAuthOptions();
    return this.influencerService.listMessages({ vendorId }, authOptions);
  }

  async sendMessage(messagePayload: SendMessageRequest) {
    const authOptions = await this.getAuthOptions();
    return this.influencerService.sendMessage(messagePayload, authOptions);
  }
}
