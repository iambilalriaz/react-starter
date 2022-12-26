/* eslint-disable no-param-reassign */
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import type { RpcOptions, UnaryCall } from '@protobuf-ts/runtime-rpc';
import { AuthServiceClient } from '../api/authpb/v1/auth.client';
import { VendorServiceClient } from '../api/vendorpb/v1/vendor.client';
import { getAccessToken } from '../utils';

export const getQueryParam = (param: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

export const getAuthServiceClient = () => {
  const transport = new GrpcWebFetchTransport({
    baseUrl: import.meta.env.VITE_BASE_URL
  });
  return new AuthServiceClient(transport);
};
export const getVendorServiceClient = () => {
  const transport = new GrpcWebFetchTransport({
    baseUrl: import.meta.env.VITE_BASE_URL
  });
  return new VendorServiceClient(transport);
};

export const getOptions = async () => {
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
};
