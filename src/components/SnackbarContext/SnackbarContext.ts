import { createContext, ReactNode } from "react";

export type Snackbar = {
  icon?: ReactNode;
  message: string;
  timeout?: number;
  variant?: "positive" | "negative";
};

type SnackbarContextType = {
  showSnackbar: (snackbar: Snackbar) => void;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
});
