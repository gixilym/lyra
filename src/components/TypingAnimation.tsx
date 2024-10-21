import { useEffect, useState } from "react";
import { len } from "../utils/helpers";
import type { Component, Timer } from "../utils/types";

function TypingAnimation(props: Props): Component {
  const { text, duration = 90, className } = props,
    [displayedText, setDisplayedText] = useState<string>(""),
    [index, setIndex] = useState<number>(0),
    [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    const typingEffect: Timer = setInterval(() => {
      if (index < len(text)) {
        setDisplayedText(prevState => prevState + text.charAt(index));
        setIndex(index + 1);
      } else clearInterval(typingEffect);
    }, duration);

    return () => clearInterval(typingEffect);
  }, [duration, index, text]);

  useEffect(() => {
    const fadeEffect: Timer = setTimeout(() => setOpacity(1), 200);
    return () => clearTimeout(fadeEffect);
  }, []);

  return (
    <p
      style={{
        opacity: opacity,
        transition: "opacity 0.4s ease-in-out",
      }}
      className={className}>
      &nbsp;{displayedText || text}&nbsp;
    </p>
  );
}

export default TypingAnimation;

interface Props {
  text: string;
  duration?: number;
  className?: string;
}
