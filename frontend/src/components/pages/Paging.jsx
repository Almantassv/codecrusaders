import React, { useState, useEffect } from 'react';
import { IconContext } from "react-icons";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import "../../styles/Paging.css";

const Paging = ({pageNum, update, reachedMaxPage}) => {
    return (
        <IconContext.Provider value={{ size: '30px' }}>
            <div className="paging-div">
                <FaAngleLeft className={ pageNum <= 1 ? "paging-disabled" : "paging-enabled"} onClick={() => { if (pageNum > 1) update(-1) }} />
                <h2 className="paging-num">{pageNum}</h2>
                <FaAngleRight className={ reachedMaxPage ? "paging-disabled" : "paging-enabled"} onClick={() => { if (!reachedMaxPage) update(1) }} />
            </div>
        </IconContext.Provider>
    );
}

export default Paging;