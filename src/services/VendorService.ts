/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import type { RpcOptions, UnaryCall } from '@protobuf-ts/runtime-rpc';
import type { IVendorServiceClient } from '../api/vendorpb/v1/vendor.client';
import { VendorServiceClient } from '../api/vendorpb/v1/vendor.client';
import { getAccessToken } from '../utils';
import {
  AddLocationRequest,
  UpdateLocationRequest,
  DeleteLocationRequest,
  Vendor,
  InviteUserRequest,
  SendMessageRequest
} from '../api/vendorpb/v1/vendor';

export class VendorService {
  private vendorService: IVendorServiceClient;

  constructor() {
    const transport = new GrpcWebFetchTransport({
      baseUrl: import.meta.env.VITE_BASE_URL
    });
    this.vendorService = new VendorServiceClient(transport);
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

  async addLocation(location: AddLocationRequest) {
    const authOptions = await this.getAuthOptions();
    return this.vendorService.addLocation(location, authOptions);
  }

  async listLocations(vendorId: string) {
    const authOptions = await this.getAuthOptions();
    return this.vendorService.listLocations({ vendorId }, authOptions);
  }

  async updateLocation(location: UpdateLocationRequest) {
    const authOptions = await this.getAuthOptions();
    return this.vendorService.updateLocation(location, authOptions);
  }

  async deleteLocation({ locationId, vendorId }: DeleteLocationRequest) {
    const authOptions = await this.getAuthOptions();
    return this.vendorService.deleteLocation({ locationId, vendorId }, authOptions);
  }

  async registerVendor(vendor: Vendor) {
    const authOptions = await this.getAuthOptions();
    return this.vendorService.registerVendor({ vendor }, authOptions);
  }

  async listVendors() {
    const authOptions = await this.getAuthOptions();
    return this.vendorService.listVendors({}, authOptions);
  }

  async inviteUser({ id, vendorId, email, phoneNumber, permissions }: InviteUserRequest) {
    const authOptions = await this.getAuthOptions();
    return this.vendorService.inviteUser(
      { id, vendorId, email, phoneNumber, permissions },
      authOptions
    );
  }

  async listPendingInvites(vendorId: string) {
    const authOptions = await this.getAuthOptions();
    return this.vendorService.listPendingInvites({ vendorId }, authOptions);
  }

  async acceptInvite(inviteId: string) {
    const authOptions = await this.getAuthOptions();
    return this.vendorService.acceptInvite({ id: inviteId }, authOptions);
  }

  async getVendorPermissions(vendorId: string) {
    const authOptions = await this.getAuthOptions();
    return this.vendorService.getPermissionsForUser({ vendorId }, authOptions);
  }

  async getVendorConversations(vendorId: string) {
    const authOptions = await this.getAuthOptions();
    return this.vendorService.listConversations({ vendorId }, authOptions);
  }

  async getVendorMessages({ vendorId, influencerId }: { vendorId: string; influencerId: string }) {
    const authOptions = await this.getAuthOptions();
    return this.vendorService.listMessages({ vendorId, influencerId }, authOptions);
  }

  async sendMessage(messagePayload: SendMessageRequest) {
    const authOptions = await this.getAuthOptions();
    return this.vendorService.sendMessage(messagePayload, authOptions);
  }

  async searchInfluencers() {
    const authOptions = await this.getAuthOptions();
    return this.vendorService.influencerSearch({}, authOptions);
  }
}
