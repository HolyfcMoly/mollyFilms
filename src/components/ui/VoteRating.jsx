import { Rating, ThinStar } from "@smastrom/react-rating";
import React from "react";

const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#eaa800",
    inactiveFillColor: "#7d7d7d",
};

const VoteRating = ({vote}) => {
    return (
        <div className="flex">
            <span className="xl:text-2xl mr-3">
                {vote
                    ? vote.toFixed(1)
                    : vote}
            </span>
            {vote && (
                <Rating
                    readOnly
                    value={vote / 2}
                    itemStyles={myStyles}
                    className="xl:max-w-[150px] max-w-[100px]"
                />
            )}
        </div>
    );
};

export default VoteRating;
