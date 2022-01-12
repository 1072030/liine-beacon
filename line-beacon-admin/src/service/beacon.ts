export async function beaconSetting(body: any) {
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
export async function getRecord(userId: string) {
  const data = await fetch(
    `https://beacon-test-bot.herokuapp.com/getRecord?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
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
export async function getCompanyInfo(userId: string) {
  const data = await fetch(
    `https://beacon-test-bot.herokuapp.com/getCompanyInfo?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
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
