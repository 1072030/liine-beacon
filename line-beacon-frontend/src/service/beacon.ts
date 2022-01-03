export async function beaconSetting(body: any) {
  console.log("body", body);
  await fetch("https://beacon-test-bot.herokuapp.com/beacon", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      console.log("result", result);
    });
}
export async function getHistoryData(userId: string) {
  const data = await fetch(
    `https://beacon-test-bot.herokuapp.com/getRecord?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    });
  return data;
}
