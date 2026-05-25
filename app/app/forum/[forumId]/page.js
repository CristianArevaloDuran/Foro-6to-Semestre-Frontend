import ForumPageClient from "./ForumPageClient";

export async function generateMetadata({ params }) {
    const { forumId } = await params;

    return {
        title: `Foro ${forumId}`
    };
}

const API_URL = process.env.API_URL;

export default async function ForumPage({ params }) {
    const { forumId } = await params;

    return (
        <div className="forum-page">
            <ForumPageClient API_URL={API_URL} forumId={forumId} />
        </div>
    );
}