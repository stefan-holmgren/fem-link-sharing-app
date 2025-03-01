import { Button } from "@/components/Button/Button";
import styles from "./Preview.module.css";

export const Preview = () => {
  return (
    <div className={styles.preview}>
      <header>
        <Button variant="secondary">Back to Editor</Button>
        <Button variant="primary">Share Link</Button>
      </header>
      <main></main>
    </div>
  );
};
