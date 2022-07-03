import {useCallback} from "react";

export const useToast = () => {
  return useCallback((text: string) => {
    // @ts-ignore
    if (window.M && text) {
      (window as any).M.toast({html: text});
    }
  }, [])
}