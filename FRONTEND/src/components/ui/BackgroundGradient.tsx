import { cn } from "../../lib/utils";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    <div
      className={cn(
        "relative p-[4px] group border-2 border-transparent", 
        containerClassName
      )}
    >
      {/* Apply the gradient to only the border */}
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
          borderRadius: "1rem", // Adjust to your preferred corner radius
          backgroundImage:
            "radial-gradient(circle closest-side, #00ccb1, transparent), radial-gradient(circle closest-side, #7b61ff, transparent), radial-gradient(circle closest-side, #ffc414, transparent), radial-gradient(circle closest-side, #1ca0fb, #141316)",
          borderImage: "linear-gradient(to right, #00ccb1, #7b61ff, #ffc414, #1ca0fb)",
          borderImageSlice: 1,
          opacity: 0.5, // Reduced brightness of the gradient
        }}
        className="absolute inset-0 z-[1] blur-xl transition duration-500"
      />
      {/* Inner content */}
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
