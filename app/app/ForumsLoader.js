export default function ForumsLoader() {
    return (
        <div className="p-4 max-w-2xl w-full mx-auto">
          <div className="bg-white/5 rounded-lg p-4 shadow-sm">
            <div className="flex items-start gap-4 animate-pulse">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
              <div className="flex-1">
                <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-2" />
                <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded-md" />
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-md" />
                  <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded-md" />
                  <div className="h-3 w-4/6 bg-gray-200 dark:bg-gray-700 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}