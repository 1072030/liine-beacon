export async function uploadImage(file: File, place: string): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  console.log(file);

  const res: any = await fetch(
    "https://beacon-test-bot.herokuapp.com/uploadImage",
    {
      method: "POST",
      body: formData,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    });
  return res.data.url as string;
}
