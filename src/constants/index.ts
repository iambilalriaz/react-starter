import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';

export const getQueryParam = (param: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

export const getTransport = () =>
  new GrpcWebFetchTransport({
    baseUrl: import.meta.env.VITE_BASE_URL
  });
