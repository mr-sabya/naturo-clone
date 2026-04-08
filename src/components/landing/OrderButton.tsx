"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";

interface OrderButtonProps {
    onClick?: () => void;
    text?: string;
    className?: string;
    showIcon?: boolean;
}

const OrderButton: React.FC<OrderButtonProps> = ({
    onClick,
    text = "এখানে অর্ডার করুন",
    className = "",
    showIcon = true
}) => {
    return (
        <button
            onClick={onClick}
            className={`
        group relative flex items-center justify-center gap-3
        bg-[#008037] hover:bg-[#00642b] 
        text-white text-xl md:text-2xl font-bold 
        py-5 px-12 rounded-full 
        border-4 border-[#ff8a00] 
        transition-all duration-300 
        hover:scale-105 active:scale-95
        shadow-[0_20px_50px_rgba(0,128,55,0.3)] 
        animate-bounce-slow
        ${className}
      `}
        >
            {showIcon && (
                <ShoppingBag
                    className="w-6 h-6 md:w-8 md:h-8 group-hover:animate-pulse transition-transform"
                />
            )}

            <span>{text}</span>

            {/* Subtle shine effect on hover */}
            <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </button>
    );
};

export default OrderButton;