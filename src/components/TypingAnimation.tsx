import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Component } from "../utils/types";

function TypingAnimation(props: Props): Component {
  const { text, duration = 90, className } = props;
  const [displayedText, setDisplayedText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(prevState => prevState + text.charAt(index));
        setIndex(index + 1);
      } else clearInterval(typingEffect);
    }, duration);

    return () => clearInterval(typingEffect);
  }, [duration, index]);

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={className}
    >
      &nbsp;{displayedText || text}&nbsp;
    </motion.p>
  );
}

export default TypingAnimation;

interface Props {
  text: string;
  duration?: number;
  className?: string;
}
