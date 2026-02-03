import React from 'react';

interface GameContainerProps {
    children: React.ReactNode;
}

export default function GameContainer({ children }: GameContainerProps) {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-950 lg:p-4 overflow-hidden">
            {/* The 16:9 Container */}
            <div
                className="relative w-full h-full shadow-2xl overflow-hidden bg-[#0f172a] lg:rounded-2xl border-y lg:border border-gray-800"
                style={{
                    aspectRatio: '16 / 9',
                    maxHeight: '100%',
                    maxWidth: '177.78vh', // 16/9 = 1.7778. Fits height into view.
                }}
            >
                {children}
            </div>
        </div>
    );
}
