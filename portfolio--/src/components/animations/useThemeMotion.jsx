import { useEffect } from "react";

const useThemeMotion = (isHovered, ref) => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isHovered && ref?.current) {
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        ref.current.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        ref.current.style.transition = "transform 0.5s ease";
      } else if (ref?.current) {
        ref.current.style.transform = `translate(0, 0)`;
        ref.current.style.transition = "transform 0.5s ease";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered, ref]);
};

export default useThemeMotion;