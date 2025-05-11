// store/metrics/metricsApi.ts
import { RevenueMetricsResponse, UserGrowthMetricsResponse } from '@/types/metrics';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const metricsApi = createApi({
  reducerPath: 'metricsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), // We'll use full URLs in each query
  endpoints: (builder) => ({
    getRevenueMetrics: builder.query<RevenueMetricsResponse, void>({
      query: () => ({
        url: 'https://getrevenuemetrics-jqk4tvz4xa-uc.a.run.app',
        method: 'GET',
      }),
    }),
    getUserGrowthMetrics: builder.query<UserGrowthMetricsResponse, void>({
      query: () => ({
        url: 'https://getusergrowthmetrics-jqk4tvz4xa-uc.a.run.app',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetRevenueMetricsQuery,
  useGetUserGrowthMetricsQuery,
} = metricsApi;
