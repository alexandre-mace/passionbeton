import React from "react";
import { motion } from "framer-motion";

const loadingContainer = {
    width: "3rem",
    height: "2rem",
    display: "flex",
    justifyContent: "space-between"
};

const loadingCircle = {
    display: "block",
    width: "0.8rem",
    height: "0.8rem",
    backgroundColor: "#0001FC",
    borderRadius: "0.4rem"
};

const loadingContainerVariants = {
    start: {
        transition: {
            staggerChildren: 0.2
        }
    },
    end: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

const loadingCircleVariants = {
    start: {
        y: "50%"
    },
    end: {
        y: "150%"
    }
};

const loadingCircleTransition = {
    duration: 0.3,
    yoyo: Infinity,
    ease: "easeInOut"
};

export default function ThreeDotsWave() {
    return (
        <motion.div
            style={loadingContainer}
            variants={loadingContainerVariants}
            initial="start"
            animate="end"
        >
            <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
            <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
            <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
        </motion.div>
    );
}