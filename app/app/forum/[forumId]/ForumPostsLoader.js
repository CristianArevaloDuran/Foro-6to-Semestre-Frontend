export default function ForumPostsLoader() {
    return (
        <div className="forum-posts-loader">
            <div className="post-card animate-pulse">
                <div className="post-card-title">
                    <div className="post-user-icon bg-gray-200 dark:bg-gray-700" />
                    <div className="flex-1">
                        <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-2" />
                        <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded-md" />
                    </div>
                </div>
                <div className="mt-4 space-y-2">
                    <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-md" />
                    <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded-md" />
                    <div className="h-3 w-4/6 bg-gray-200 dark:bg-gray-700 rounded-md" />
                </div>
            </div>
        </div>
    );
}