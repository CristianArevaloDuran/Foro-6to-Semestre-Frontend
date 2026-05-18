'use client';

import Forums from "@/app/app/Forums";
import NewForum from "@/app/app/NewForum";
import AnimatedBG from "../AnimatedBG/AnimatedBG";
import Footer from "../HomePage/Footer/Footer";
import AlertBlock from "../AlertBlock/AlertBlock";

import { useState } from "react";

export default function AppClient({API_URL}) {

    const [message, setMessage] = useState('');

    return (
        <>
            <Forums API_URL={API_URL} />
            <NewForum setMessage={setMessage} API_URL={API_URL} />
            <AlertBlock message={message} title={'Error'} onClose={()=>setMessage('')} open={Boolean(message)} />
            <AnimatedBG />
            <Footer />
        </>
    )
}