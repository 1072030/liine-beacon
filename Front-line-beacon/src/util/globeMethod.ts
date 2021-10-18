import { ElMessage, ElMessageBox } from "element-plus";
import { api } from "./api";

export interface ElMessage {
  boxMessage: string;
  confirmMessage?: string;
  cancelMessage?: string;
}

export function elMessageBoxConfirm(
  message: ElMessage,
  ConfirmFunction: () => void,
  CancelFunction: () => void = () => null
): void {
  ElMessageBox.confirm(message.boxMessage, "提示", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await ConfirmFunction();
      ElMessage({
        type: "success",
        message: message.confirmMessage,
      });
    })
    .catch(async () => {
      await CancelFunction();
      if (message.cancelMessage) {
        ElMessage({
          type: "info",
          message: message.cancelMessage,
        });
      }
    });
}
// export async function uploadImage(file: File): Promise<string> {
//   console.log("test1");
//   const formData = new FormData();
//   formData.append("image", file);

//   const res = await api.post("/upload/image", formData);
//   console.log(res);
//   return res.data.url as string;
// }
