import axios, { AxiosResponse } from "axios";
import { globalVar } from "../constants/globalVar";
import * as T from "io-ts";
import Reporter from "io-ts-reporters";
import { Response } from "../models/Response";

export const api = axios.create({
  baseURL: globalVar.ANILIST_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const apiCall = async <ResponseType>({
  query,
  variables,
  Codec,
}: {
  query: string;
  variables: Object;
  Codec: T.Type<ResponseType>;
}): Promise<{ response: AxiosResponse<Response<ResponseType>> | null; error: Error | null }> => {
  const result: AxiosResponse<Response<ResponseType>> = await api.post("", { query, variables });

  if (!Codec.is(result.data.data)) {
    const decodeError = Reporter.report(Codec.decode(result.data));
    return { response: null, error: new Error(decodeError.join(", ")) };
  }
  return { response: result, error: null };
};
