'use client';

import { useState } from "react";
import AlertBlock from "@/app/components/AlertBlock/AlertBlock";
import AnimatedBG from "@/app/components/AnimatedBG/AnimatedBG";
import Footer from "@/app/components/HomePage/Footer/Footer";
import useForums from "@/app/lib/hooks/useForums";
import ForumPosts from "./ForumPosts";
import NewPost from "./NewPost";

export default function ForumPageClient({ API_URL, forumId }) {
    const [message, setMessage] = useState("");
    const { forums } = useForums(API_URL);
    const forumName = forums?.find((forum) => String(forum.id) === String(forumId))?.name;

    return (
        <>
            <ForumPosts API_URL={API_URL} forumId={forumId} forumName={forumName} />
            <NewPost API_URL={API_URL} forumId={forumId} setMessage={setMessage} />
            <AlertBlock message={message} title={'Error'} onClose={() => setMessage('')} open={Boolean(message)} />
            <AnimatedBG />
            <Footer />
        </>
    );
}