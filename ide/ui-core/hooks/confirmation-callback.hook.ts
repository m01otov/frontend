import { useCallback, useState } from "react";

type TConfirmationCallbackHookResult = {
  isShowDialog: boolean;
  handleOpen: (...args: any[]) => void;
  handleClose: () => void;
  handleApply: () => void;
}

export const useConfirmationCallback = (
  callback: (...args: any[]) => void,
  condition: () => boolean
): TConfirmationCallbackHookResult => {
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [args, setArgs] = useState<any[]>([]);

  const handleOpen = useCallback((...args: any[]) => {
    if (condition()) {
      setArgs(() => {
        setIsShowDialog(true);
        return args;
      });

      return;
    }

    callback(...args);
  }, [condition]);

  const handleClose = useCallback(() => {
    setIsShowDialog(false);
  }, []);

  const handleApply = useCallback(() => {
    callback(...args);
    handleClose();
  }, [handleClose, callback, args]);

  return { isShowDialog, handleOpen, handleClose, handleApply };
}
