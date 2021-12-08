import { api } from "../util/api";

//
export function beaconSetting(body: any) {
  fetch("https://beacon-test-bot.herokuapp.com/beacon", {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },

    method: "POST",
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      console.log(result);
    });
}
