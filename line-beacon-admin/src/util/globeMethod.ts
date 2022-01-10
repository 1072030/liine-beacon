import { ElMessage, ElMessageBox } from "element-plus";
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
export function beforeAvatarUpload(file: File) {
  const isImage = file.type === "image/jpeg" || "image/png";
  const isEmpty = file.type === "";
  const isL10M = file.size / 1024 / 1024 < 10;

  if (!isImage || isEmpty) {
    ElMessage.error("圖片必須是JPG或是PNG檔");
  }
  if (!isL10M) {
    ElMessage.error("圖片檔案超過10MB");
  }
  return isImage && isL10M && !isEmpty;
}
