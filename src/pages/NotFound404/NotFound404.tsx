import { Link } from "react-router-dom";
import styles from "./NotFound404.module.css";
import { motion, Variants } from "framer-motion";

export const NotFound404 = () => {
  const header = "404";
  const characters = header.split("");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const characterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 250,
      },
    },
  };

  return (
    <div className={styles["not-found-404"]}>
      <div>
        <motion.h1 variants={containerVariants} initial="hidden" animate="visible">
          {characters.map((character, index) => (
            <motion.span key={index} variants={characterVariants}>
              {character}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
          Page not found!
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}>
          Go <Link to="/">home</Link>
        </motion.p>
      </div>
    </div>
  );
};
