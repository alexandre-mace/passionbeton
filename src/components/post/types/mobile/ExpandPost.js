import React, {useRef, useState} from 'react';
import {motion, useCycle, useMotionValue} from "framer-motion";
import { useScrollConstraints } from "../../../../utils/use-scroll-constraints";
import { useWheelScroll } from "../../../../utils/use-wheel-scroll";
import { openSpring, closeSpring } from "../../../../utils/cardAnimations";
import Post from "./Post";
import PostFullContent from "../../blocks/PostFullContent";

const dismissDistance = 250;
const bottomDismissDistance = 50

const ExpandPost = ({post, small}) => {
    const [isSelected, setIsSelected] = useState(false);
    const [animateWrapper, toggleFocusWrapper] = useCycle(
        {
            container: {
                position: 'relative',
                height: "25rem",
                top: "0rem",
                overflowX: "auto",
                backgroundColor: 'transparent'
            },
            title: { opacity: 1 }
        },
        {
            container: {
                position: 'absolute',
                height: "100vh",
                width: '100vw',
                top: "0",
                overflowX: "hidden",
                backgroundColor: "white",
                zIndex: 10
            },
            title: { opacity: 0 }
        }
    );

    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 2 : 0);
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);

    function checkSwipeToDismiss(event, info, cardRef) {
        if (!cardRef) return

        let scrolledY = 0

        if (cardRef['current'].style.transform.split(',')[1]) {
            scrolledY =  cardRef['current'].style.transform.split(',')[1].replace('px', '')
        }
        const element = cardRef.current;
        const viewportHeight = window.innerHeight;
        const contentHeight = element.offsetHeight;
        const contentOversize = contentHeight - viewportHeight;

        const scrollUnderContentSize =  contentOversize + parseInt(scrolledY);
        if (
            info &&
            info.offset &&
            (
                (info.offset.y > (dismissDistance - scrolledY)) ||
                (scrollUnderContentSize < 0 && Math.abs(scrollUnderContentSize) > bottomDismissDistance)
            )
        ) {
            setTimeout(() => {
                setIsSelected(false)
            }, 200)
        }
    }

    function checkZIndex(latest) {
        if (isSelected) {
            zIndex.set(2);
        } else if (!isSelected && latest.scaleX < 1.01) {
            zIndex.set(0);
        }
    }
    const containerRef = useRef(null);
    useWheelScroll(
        containerRef,
        y,
        constraints,
        checkSwipeToDismiss,
        isSelected
    );

    const [animate, cycleCard] = useCycle(
        {
            card: {
                padding: "1rem"
            },
            image: {
                width: "100%",
                marginLeft: "0rem",
                marginRight: "0rem",
                marginTop: "0rem"
            }
        },
        {
            card: {
                padding: "0rem"
            },
            image: {
                width: "125%",
                marginLeft: "-3rem",
                marginRight: "-3rem",
                marginTop: "-1rem"
            }
        }
    );

    y.set(0)

    return (
            // <motion.div
            //     ref={cardRef}
            //     className={"card-content"}
            //     drag={isSelected ? "y" : false}
            //     onClick={() => setIsSelected(!isSelected)}
            //     dragConstraints={constraints}
            //     onDrag={(event, info) => checkSwipeToDismiss(event, info, cardRef) }
            //     onUpdate={checkZIndex}
            // >
        <motion.div
            className="card-container"
            animate={animateWrapper.container}
            initial={{ top: "0rem" }}
            layout={true}
            transition={{ ease: "easeOut", delay: 0.1, duration: 2 }}
        >
                <motion.div
                    className="card-wrapper"
                    onTap={() => {
                        cycleCard();
                        toggleFocusWrapper();
                    }}
                    animate={animate.card}
                    initial={{ padding: "1rem" }}
                    transition={{ ease: "easeOut", delay: 0.1, duration: 2 }}
                >
                <Post small={small} post={post} isSelected={isSelected} setIsSelected={setIsSelected}/>
                {isSelected &&
                <PostFullContent post={post} isSelected={isSelected}/>
                }
            </motion.div>
        </motion.div>
    )
}

const Overlay = ({ isSelected, setIsSelected }) => (
    <motion.div
        initial={false}
        animate={{ opacity: isSelected ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: isSelected ? "auto" : "none" }}
        onClick={() => setIsSelected}
        className="overlay"
    >
    </motion.div>
);


export default ExpandPost;