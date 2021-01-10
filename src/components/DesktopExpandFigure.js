import React, {useEffect, useRef, useState} from 'react';
import {motion} from "framer-motion";
import { useScrollConstraints } from "../utils/use-scroll-constraints";
import { openSpring, closeSpring } from "../utils/cardAnimations";
import Figure from "./figure/Figure";
import CloseIcon from "@material-ui/icons/Close";

const DesktopExpandFigure = ({figure}) => {
    const [isSelected, setIsSelected] = useState(false);
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);
    const containerRef = useRef(null);

    useEffect(() => {
        if (isSelected) {
            document.body.classList.add('overflow-hidden');
            return
        }
        document.body.classList.remove('overflow-hidden');
    }, [isSelected])

    return (
        <>
            <div ref={containerRef} className={`card-content-container ${isSelected && "open"}`}>
                <motion.div
                    ref={cardRef}
                    className={"card-content"}
                    layout={true}
                    layoutTransition={isSelected ? openSpring : closeSpring}
                    drag={isSelected ? "y" : false}
                    onClick={() => setIsSelected(!isSelected)}
                    dragConstraints={constraints}
                >
                    {isSelected &&
                    <motion.div
                        className={"back-wrapper"}
                        style={{ opacity: 0}}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.3, ease: "easeOut" }}
                    >
                        <div className={"back"} onClick={() => {setIsSelected(false)}}>
                            <CloseIcon/>
                        </div>
                    </motion.div>
                    }
                    <Figure figure={figure}/>
                </motion.div>
            </div>
        </>
    )
}

export default DesktopExpandFigure;