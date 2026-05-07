'use client';

import { useState } from "react";
import { ICONS } from "../lib/constants";

export default function NewForum({API_URL}) {
    
    const [isVisible, setIsVisible] = useState(false);
    
    const openForm = () => {
        setIsVisible(!isVisible);
    }

    return(
        <div className="new-forum"> 
            {
                isVisible && (
                    <div className="new-forum-form">

                    </div> 
                )
            }

            <button className="new-forum-button" onClick={openForm}>
                <p>Nuevo foro</p>
                <ICONS.PLUS />
            </button>
        </div>
    )
}