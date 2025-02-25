import { createContext, ReactNode } from "react";

export type Snackbar = {
  icon?: ReactNode;
  message: string;
  timeout?: number;
};

type SnackbarContextType = {
  showSnackbar: (snackbar: Snackbar) => void;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
});
