"use client";

const DeepBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover md:object-fill"
            >
                <source src="/OCEAN-LOOP.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Dark Gradient Overlay for Better Visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-gray-900/70"></div>
        </div>
    );
};

export default DeepBackground;
