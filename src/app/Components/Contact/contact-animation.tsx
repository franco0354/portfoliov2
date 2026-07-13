import React from 'react'

function ContactAnimation() {
    return (
        <div className="relative hidden rounded-l-2xl bg-gradient-to-br from-emerald-50 to-green-100 md:block overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></div>
                <div className="absolute top-12 right-8 w-1 h-1 bg-green-600 rounded-full animate-ping"></div>
                <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-emerald-700 rounded-full animate-bounce"></div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="group relative w-36 h-28 cursor-pointer">
                    {/* Main envelope with enhanced 3D effect */}
                    <div className="relative w-full h-full bg-white rounded-lg shadow-xl transform rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 ease-out border border-gray-200">

                        {/* Envelope flap with gradient */}
                        <div className="absolute top-0 left-0 w-full h-0 border-l-[72px] border-r-[72px] border-b-[36px] border-l-transparent border-r-transparent border-b-gradient-to-r from-gray-100 to-gray-200"></div>

                        {/* Envelope body with subtle texture */}
                        <div className="absolute top-9 left-3 w-30 h-18 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-300 rounded-sm shadow-inner"></div>

                        {/* Letter inside with animated content */}
                        <div className="absolute top-11 left-5 w-26 h-14 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-sm shadow-sm group-hover:shadow-md transition-shadow duration-300">
                            <div className="p-2">
                                <div className="w-full h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded mb-1.5 animate-pulse"></div>
                                <div className="w-4/5 h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded mb-1.5"></div>
                                <div className="w-3/5 h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded mb-1.5"></div>
                                <div className="w-2/5 h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded"></div>
                            </div>
                        </div>

                        {/* Interactive seal/stamp */}
                        <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full opacity-80"></div>
                        </div>

                        {/* Decorative elements with hover effects */}
                        <div className="absolute -top-3 -right-3 w-5 h-5 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 shadow-lg"></div>
                        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-green-400 to-green-500 rounded-full opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 shadow-lg"></div>

                        {/* Subtle shine effect */}
                        <div className="absolute top-1 left-1 w-8 h-8 bg-gradient-to-br from-white to-transparent rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    </div>

                    {/* Floating message indicator */}
                    {/* <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-gray-600 font-medium">
                                   Thanks for Visiting my portfolio
                                </div> */}
                </div>
            </div>

            {/* Enhanced background decorative elements */}
            <div className="absolute top-6 right-6 w-20 h-20 border-2 border-dashed border-emerald-400 rounded-full opacity-40 animate-spin-slow"></div>
            <div className="absolute bottom-6 left-6 w-16 h-16 border border-emerald-400 rounded-lg opacity-40 transform rotate-45 animate-pulse"></div>

            {/* Floating particles */}
            <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-emerald-600 rounded-full animate-ping"></div>
            <div className="absolute bottom-1/3 left-1/3 w-0.5 h-0.5 bg-green-600 rounded-full animate-ping delay-1000"></div>

            {/* Contact info overlay */}
            <div className="absolute bottom-4 right-4 text-xs text-gray-500 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    I will respond soon.
                </div>
            </div>
        </div>
    )
}

export default ContactAnimation