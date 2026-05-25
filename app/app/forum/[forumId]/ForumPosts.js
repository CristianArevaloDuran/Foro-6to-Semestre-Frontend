'use client';

import Link from "next/link";
import useForumPosts from "@/app/lib/hooks/useForumPosts";
import ForumPostsLoader from "./ForumPostsLoader";

export default function ForumPosts({ API_URL, forumId, forumName }) {
    const { posts, loading } = useForumPosts(API_URL, forumId);

    const resolveUsername = (post) => {
        return post.profiles?.username
            ?? post.profile?.username
            ?? post.author?.username
            ?? post.user?.username
            ?? post.username
            ?? post.user_name
            ?? "Anónimo";
    };

    const forumTitle = forumName ?? "Cargando foro...";

    return (
        <section className="forum-posts">
            <div className="forum-posts-header">
                <div className="forum-posts-title">
                    <p className="eyebrow">Foro</p>
                    <h1>{forumTitle}</h1>
                </div>
                <Link href="/app" className="back-link">Volver a foros</Link>
            </div>

            <div className="forum-posts-list">
                {
                    loading ? <ForumPostsLoader /> :
                        posts?.length ? posts.map((post) => (
                            <article className="post-card" key={post.id}>
                                <div className="post-card-title">
                                    <div className="post-user-icon">
                                        <p>{resolveUsername(post)[0] ?? "?"}</p>
                                    </div>
                                    <div>
                                        <p>Publicado por {resolveUsername(post)}</p>
                                    </div>
                                </div>
                                <p className="post-content">
                                    {post.content ?? post.body ?? post.description ?? ""}
                                </p>
                            </article>
                        )) : (
                            <div className="empty-posts">
                                <h2>Aún no hay posts en este foro.</h2>
                                <p>Publica el primero usando el botón de abajo.</p>
                            </div>
                        )
                }
            </div>
        </section>
    );
}