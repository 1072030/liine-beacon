import { api } from "./api";
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const res: any = await api.post("/upload/image", formData);
  console.log(res);
  return res.data.url as string;
}
