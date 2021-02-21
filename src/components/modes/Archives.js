import React, {useState, useEffect, useRef} from 'react';
import ExpandPost from "../post/types/mobile/ExpandPost";
import filterPosts from "../../filters/filterPosts";
import ArchivesHeader from "../archive/ArchivesHeader";
import {motion, useCycle} from "framer-motion";
import Post from "../post/types/mobile/Post";

const Archives = ({ posts }) => {
    const [search, setSearch] = useState('');
    const [animate, toggleFocus] = useCycle(
        {
            container: { height: "25rem", top: "0rem"},
            title: { opacity: 1 }
        },
        {
            container: { height: "100%"},
            title: { opacity: 0 }
        }
    );

    return (
        <div>
            <div>
                <motion.div
                    className="title"
                    animate={animate.title}
                    transition={{ ease: "easeInOut", duration: 0.2 }}
                >
                <ArchivesHeader/>
                <div className={"archive-search"}>
                    <input
                        type="text"
                        placeholder={"Rechercher dans les archives"}
                        value={search}
                        onChange={(event => {setSearch(event.target.value)})}
                    />
                </div>
                </motion.div>
                <motion.div
                    className="card-container"
                    animate={animate.container}
                    initial={{ top: "0rem" }}
                    transition={{ ease: "easeOut", delay: 0.1 }}
                >
                {[...posts].filter(post => filterPosts(search.split(' '), post)).map((post, index) => (
                    <Post
                        post={post}
                        small={true}
                        key={index}
                        onToggleFocus={toggleFocus}
                        id={index}
                    />
                ))}
                </motion.div>

            </div>
        </div>
    )};

export default Archives;