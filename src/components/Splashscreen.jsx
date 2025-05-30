import React from "react";
import { motion } from "framer-motion";

const Splashscreen = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="p-10"
        >
            <motion.h1
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 10,
                    mass: 1,
                }}
                className="font-black text-3xl text-blue-600 place-self-center"
            >
                Welcome to E Commerce !!!
            </motion.h1>
        </motion.div>
    );
};

export default Splashscreen;
