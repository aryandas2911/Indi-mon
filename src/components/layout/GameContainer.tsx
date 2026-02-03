import React from 'react';

interface GameContainerProps {
    children: React.ReactNode;
}

export default function GameContainer({ children }: GameContainerProps) {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-950 lg:p-4">
            {/* The 9:16 Container */}
            <div
                className="relative w-full h-full shadow-2xl overflow-hidden bg-[#0f172a] lg:rounded-2xl border-x border-gray-800 lg:border-none"
                style={{
                    aspectRatio: '9 / 16',
                    maxHeight: '100%',
                    maxWidth: '56.25vh', // 9/16 = 0.5625. Height implies 100vh.
                }}
            >
                {children}
            </div>
        </div>
    );
}
