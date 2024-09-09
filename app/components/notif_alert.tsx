"use client";

import { useEffect, useState } from "react";

const NotifAlert = ({ icon, title, subtitle, duration = 5000, state = false, whenClose }: { icon: JSX.Element, title: string, subtitle: string, duration?: number, state?: boolean, whenClose?: () => void }) => {
    const [isVisible, setIsVisible] = useState(state);

    const handleClose = () => {
        setIsVisible(false);
        if (whenClose) {
            whenClose();
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    if (isVisible == false) return null;

    return (
        <div id="toast-message-cta toast-top-right" className="fixed z-999 bg-[#6D6D6D]/25 backdrop-blur-sm top-10 right-10 w-fit max-w-xs p-4 text-gray-500 rounded-lg shadow" role="alert">
            <div className="flex">
                {icon}
                <div className="ms-3 text-sm font-normal">
                    <span className="mb-1 text-sm text-white font-extrabold">{title}</span>
                    <div className="mb-2 text-sm font-normal w-full text-white">{subtitle}</div>
                </div>
                <button type="button" onClick={handleClose} className="ms-auto -mx-1.5 -my-1.5 bg-transparent justify-center items-center flex-shrink-0 text-gray-400 hover:text-white rounded-lg p-1.5 inline-flex h-8 w-8" data-dismiss-target="#toast-message-cta" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default NotifAlert;