import { useEffect, useState } from "react";
import type { Component, Timer } from "../utils/types";
import usePreferences from "../hooks/usePreferences";

function TypingAnimation(props: Props): Component {
  const { text, duration = 90, className } = props,
    { myAnimations } = usePreferences(),
    [displayedText, setDisplayedText] = useState<string>(""),
    [index, setIndex] = useState<number>(0),
    [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    const typingEffect: Timer = setInterval(() => {
      if (index < text.length) {
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

  if (myAnimations()) {
    return (
      <p
        style={{
          opacity: opacity,
          transition: "opacity 0.4s ease-in-out",
        }}
        className={className}
      >
        &nbsp;{displayedText || text}&nbsp;
      </p>
    );
  } else return <p className={className}>&nbsp;{text}&nbsp;</p>;
}

export default TypingAnimation;

interface Props {
  text: string;
  duration?: number;
  className?: string;
}
