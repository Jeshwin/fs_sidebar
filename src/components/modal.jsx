import {createPortal} from "react-dom";

export default function Modal({handleReplace, handleRename, handleSkip}) {
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                onClick={handleSkip}
                className="absolute inset-0 bg-gray-900 opacity-75"
            ></div>
            <div className="relative bg-gray-700 border border-gray-500 rounded-lg text-gray-50 shadow-lg p-6">
                <p className="text-xl font-bold mb-2 text-center">
                    Duplicate Item Found!
                </p>
                <p className="text-center mb-4">What would you like to do?</p>
                <div className="flex space-x-4">
                    <button
                        className="text-red-400 bg-red-500 bg-opacity-30 hover:bg-opacity-15 py-2 px-4 rounded-md"
                        onClick={handleReplace}
                    >
                        Replace
                    </button>
                    <button
                        className="text-green-400 bg-green-500 bg-opacity-30 hover:bg-opacity-15 py-2 px-4 rounded-md"
                        onClick={handleRename}
                    >
                        Rename
                    </button>
                    <button
                        className="text-gray-400 bg-gray-500 bg-opacity-30 hover:bg-opacity-15 py-2 px-4 rounded-md"
                        onClick={handleSkip}
                    >
                        Skip
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root") // Ensure this div exists in your HTML
    );
}
