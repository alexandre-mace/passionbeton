import React from 'react';
import {motion, useMotionValue, useTransform} from "framer-motion";
import partyPopper from'./../assets/partypopper.png';

const SeenAll = (props) => {
    const x = useMotionValue(0);
    const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
    const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
        clamp: false
    });

    function handleDragEnd(event, info) {
        if (info.offset.x < -100 || info.offset.x > 100) {
            if (props.throwConfettis) {
                props.throwConfettis()
            }
        }
    }

    return (
        <motion.div
            style={{
                position: "absolute",
                top: 0,
                x: x,
                rotate: rotate,
                cursor: "grab"
            }}
            whileTap={{ cursor: "grabbing" }}
            drag={props.drag}
            dragConstraints={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }}
            initial={props.initial}
            animate={props.animate}
            onDragEnd={handleDragEnd}
            transition={props.transition}
            exit={{
                x: props.exitX,
                opacity: 0,
                scale: 0.5,
                transition: { duration: 0.2 }
            }}
        >
            <motion.div
                style={{
                    scale: scale
                }}
            />
            {!props.mock && (
                <div className={"m-auto"}>
                    <div className="card d-flex">
                        <div className="m-auto">
                            <div className={"bold indicators text-center"} style={{marginBottom: '1rem'}}>À jour !</div>
                            <br/>
                            <div className={"d-flex justify-content-center"}><div><img className={""} src={partyPopper} alt=""/></div></div>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    )
};

export default SeenAll;
