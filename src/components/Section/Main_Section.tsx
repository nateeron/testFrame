import React, { useState, useRef, MouseEvent } from "react";
import "./css/Main_Section.css";

import Left_Section from "./Left_Section.jsx";
import Right_Section from "./Right_Section.jsx";
import Buttom_Section from "./Buttom_Section.jsx";

import { useSelector, useDispatch } from 'react-redux';



const Main_Section: React.FC = () => {
    const dispatch = useDispatch();
    // Initial sizes for top/bottom and left/right sections
    const [topHeight, setTopHeight] = useState<number>(700);
    const [leftWidth, setLeftWidth] = useState<number>(250);
    const [isDraggingVertical, setIsDraggingVertical] = useState<boolean>(false);
    const [isDraggingHorizontal, setIsDraggingHorizontal] = useState<boolean>(false);

    // Refs for the dividers
    const dividerRefHorizontal = useRef<HTMLDivElement | null>(null);
    const dividerRefVertical = useRef<HTMLDivElement | null>(null);

    // Horizontal divider: Mouse down event
    const handleMouseDownHorizontal = (e: MouseEvent<HTMLDivElement>) => {
        console.log("handleMouseDownHorizontal");
        setIsDraggingHorizontal(true);
        e.preventDefault();
    };

    // Horizontal divider: Mouse move event
    const handleMouseMoveHorizontal = (e: MouseEvent<HTMLDivElement>) => {
        if (isDraggingHorizontal && dividerRefHorizontal.current) {
            const newTopHeight = e.clientY;
            if (newTopHeight > 50 && newTopHeight < window.innerHeight - 50) {
                setTopHeight(newTopHeight);
                console.log(newTopHeight)
                dispatch({
                    type: 'MANAGE_CHART',
                    payload: { height:newTopHeight, width: null },
                  });
            }
        }
        if (isDraggingVertical && dividerRefVertical.current) {
            const newLeftWidth = window.innerWidth - e.clientX;
            if (newLeftWidth > 100 && newLeftWidth < window.innerWidth - 100) {
                setLeftWidth(newLeftWidth);
            }
        }
    };

    const handleMouseUpHorizontal = () => {
        setIsDraggingHorizontal(false);
    };

    const handleMouseDownVertical = (e: MouseEvent<HTMLDivElement>) => {
        console.log("handleMouseDownVertical");
        setIsDraggingVertical(true);
        e.preventDefault();
    };

    const handleMouseUpVertical = () => {
        setIsDraggingVertical(false);
    };

    return (
        <div
            className="container"
            onMouseMove={handleMouseMoveHorizontal}
            onMouseUp={handleMouseUpHorizontal}
            onMouseLeave={handleMouseUpHorizontal}
        >
            <div
                className="top-section"
                style={{ height: `${topHeight}px` }}
                onMouseUp={handleMouseUpVertical}
                onMouseLeave={handleMouseUpVertical}
            >
                {/* <div className="left-section" style={{ width: `${ leftWidth}px` }}> */}
                <div className="left-section">
                    <Left_Section />
                </div>
                <div className="divider vertical" ref={dividerRefVertical} onMouseDown={handleMouseDownVertical} />
                <div className="right-section" style={{ width: `${leftWidth}px` }}>
                    <Right_Section />
                </div>
            </div>
            <div className="divider horizontal" ref={dividerRefHorizontal} onMouseDown={handleMouseDownHorizontal} />
            <div className="bottom-section">
                <Buttom_Section />
            </div>
        </div>
    );
};

export default Main_Section;
