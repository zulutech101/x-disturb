// store/api/entriesApi.ts
import { EntriesByLocationResponse, EntriesOverTimeResponse } from '@/types/entries';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const entriesApi = createApi({
  reducerPath: 'entriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://getentriesovertime-jqk4tvz4xa-uc.a.run.app/' }),
  endpoints: (builder) => ({
    getEntriesOverTime: builder.query<EntriesOverTimeResponse, void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
    }),
    getEntriesByLocation: builder.query<EntriesByLocationResponse, void>({
      query: () => ({
        url: 'https://getentriesbylocation-jqk4tvz4xa-uc.a.run.app',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetEntriesOverTimeQuery,
  useGetEntriesByLocationQuery,
} = entriesApi;
