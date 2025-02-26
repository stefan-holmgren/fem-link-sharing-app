import styles from "./SnackbarContextProvider.module.css";
import { useCallback, useRef, useState } from "react";
import { Snackbar, SnackbarContext } from "./SnackbarContext";
import { Snackbar as SnackbarComponent } from "./components/Snackbar/Snackbar";
import { AnimatePresence, motion } from "motion/react";

type SnackbarContextProviderProps = {
  children: React.ReactNode;
};

type SnackbarWithId = Snackbar & { id: number };

const SNACKBAR_DEFAULT_TIMEOUT = 5000;

export const SnackbarContextProvider = ({ children }: SnackbarContextProviderProps) => {
  const [snackbars, setSnackbars] = useState<SnackbarWithId[]>([]);
  const idCounter = useRef(0);

  const showSnackbar = useCallback((snackbar: Snackbar) => {
    const snackbarWithId = { ...snackbar, id: idCounter.current++ };
    setSnackbars((prevSnackbars) => [...prevSnackbars, snackbarWithId]);

    setTimeout(() => {
      setSnackbars((prevSnackbars) => prevSnackbars.filter((s) => s.id !== snackbarWithId.id));
    }, snackbarWithId.timeout ?? SNACKBAR_DEFAULT_TIMEOUT);
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <ul className={styles["snackbar-context-provider"]}>
        <AnimatePresence>
          {snackbars.map((snackbar) => (
            <motion.li
              key={snackbar.id}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{ opacity: [null, 0], height: [null, 0], transition: { height: { delay: 0.3 } } }}
              transition={{ duration: 0.3 }}
            >
              <SnackbarComponent
                icon={snackbar.icon}
                message={snackbar.message}
                onClose={() => {
                  setSnackbars((prevSnackbars) => prevSnackbars.filter((s) => s.id !== snackbar.id));
                }}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </SnackbarContext.Provider>
  );
};
