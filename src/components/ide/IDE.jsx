export default function IDE() {
    return (
        <div className="w-full mx-1 mb-1 flex space-x-1">
            <div className="h-full flex-1 rounded-lg bg-slate-300 dark:bg-slate-700">
                <div className="w-full h-full grid place-content-center">
                    <p className="text-9xl font-bold text-center">0</p>
                </div>
            </div>
            <div className="h-full w-0.5 bg-indigo-500 rounded-full"></div>
            <div className="h-full flex-1 flex flex-col space-y-1">
                <div className="w-full flex-1 rounded-lg bg-slate-300 dark:bg-slate-700">
                    <div className="w-full h-full grid place-content-center">
                        <p className="text-9xl font-bold text-center">1</p>
                    </div>
                </div>
                <div className="w-full h-0.5 bg-indigo-500 rounded-full"></div>
                <div className="w-full flex-1 rounded-lg bg-slate-300 dark:bg-slate-700">
                    <div className="w-full h-full grid place-content-center">
                        <p className="text-9xl font-bold text-center">2</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
