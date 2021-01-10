import React from 'react';
import partyPopper from '../../assets/partypopper.png';

const SeenAll = ({animation, withAnimation}) => {
    if (withAnimation) {
        animation()
    }

    return (
        <div className={"m-auto"}>
            <div className="card d-flex">
                <div className="m-auto">
                    <div className={"bold indicators text-center"}>À jour !</div>
                    <br/>
                    <div className={"d-flex justify-content-center"}><div><img className={"gif"} src={partyPopper} alt=""/></div></div>
                </div>
            </div>
        </div>
    )
};

export default SeenAll;
