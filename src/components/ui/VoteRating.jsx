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
            <span className="sfhd:text-3xl xl:text-2xl mr-3">
                {vote
                    ? vote.toFixed(1)
                    : vote}
            </span>
            {vote && (
                <Rating
                    readOnly
                    value={vote / 2}
                    itemStyles={myStyles}
                    className="sfhd:max-w-[180px] xl:max-w-[150px] max-w-[100px]"
                />
            )}
        </div>
    );
};

export default VoteRating;
