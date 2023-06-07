import React, { forwardRef } from "react";
import { motion } from "framer-motion";

function PageTransition({ children, ...rest }, ref) {
//   const onTheRight = { x: "100%" };
//   const inTheCenter = { x: 0 };
//   const onTheLeft = { x: "-100%" };

//   const transition = { duration: 0.6, ease: "easeInOut" };

  // --------------- for Carasoul type -----------------------//
  // ref={ref}
  // initial={onTheRight}
  // animate={inTheCenter}
  // exit={onTheLeft}
  // transition={{
  //     ...transition,
  //     type:"spring"
  // }}

  // --------------------------------------------------//

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate="animate"
      transition={{ delay: 0.25 }}
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default forwardRef(PageTransition);
