import { api } from "../util/api";

//
export function beaconSetting(body: any) {
  return api.post("/beacon", body);
}
