import React from 'react';
import {motion} from "framer-motion";
import CloseIcon from "@material-ui/icons/Close";

const PostClose = ({post, close}) => {
    return (
        <motion.div
            className={"back-wrapper mb-3"}
            style={{ opacity: 0}}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.1, ease: "easeOut" }}
        >
            <div className={"back"} onClick={() => close()}>
                <CloseIcon/>
            </div>
        </motion.div>
    )
}

export default PostClose;