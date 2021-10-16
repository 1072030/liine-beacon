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
