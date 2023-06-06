import React from "react";
import './style.css';

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    };
    return (
        <article 
        className="die-face" 
        style={styles}
        onClick={props.holdDie}
        >
            <div className="die-num">{props.value}</div>
        </article>
    );
};