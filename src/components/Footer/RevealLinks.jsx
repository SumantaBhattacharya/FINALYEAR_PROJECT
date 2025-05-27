import React, { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react"; // ✅ Correct export for v2+

export const RevealLinks = () => {
    return (
        <section className="relative min-h-screen grid place-content-center gap-8 bg-[#9CA3AF] px-8 py-24 text-black">
            <FlipLink href="https://www.linkedin.com/">Linkedin</FlipLink>
            <FlipLink href="https://x.com/">Twitter</FlipLink>
            <FlipLink href="https://www.facebook.com/">Facebook</FlipLink>
            <FlipLink href="https://www.instagram.com/">Instagram</FlipLink>
        </section>
    );
};

const DURATION = 0.4;
const STAGGER = 0.05;

const FlipLink = ({ children, href }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative group">
            {/* Link with hover effect */}
            <motion.a
                initial="initial"
                whileHover="hovered"
                href={href}
                className="relative block whitespace-nowrap uppercase"
                style={{
                    fontFamily: "HeadingNow",
                    fontSize: "10vw",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    fontStretch: "500%",
                    overflow: "hidden",
                    fontWeight: 900,
                    lineHeight: 1.2,
                    textShadow: "1px 1px 0 black"
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {children.split("").map((letter, index) => (
                    <span
                        key={index}
                        className="relative inline-block overflow-hidden h-[1em] w-auto align-top"
                        style={{ lineHeight: 1 }}
                    >
                        <motion.span
                            variants={{
                                initial: { y: "0%" },
                                hovered: { y: "-100%" },
                            }}
                            transition={{
                                duration: DURATION,
                                ease: "easeInOut",
                                delay: STAGGER * index,
                            }}
                            className="block"
                        >
                            {letter}
                        </motion.span>
                        <motion.span
                            variants={{
                                initial: { y: "100%" },
                                hovered: { y: "0%" },
                            }}
                            transition={{
                                duration: DURATION,
                                ease: "easeInOut",
                                delay: STAGGER * index,
                            }}
                            className="block absolute top-0 left-0"
                        >
                            {letter}
                        </motion.span>
                    </span>
                ))}
            </motion.a>

            {/* QR Code - Appears on hover */}
            <motion.div
                className="absolute left-full ml-4 top-0 z-50"
                style={{ transform: "translateY(10%)" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
            >
                <div className="bg-white p-2 rounded-lg shadow-xl">
                    <QRCodeCanvas 
                        value={href} 
                        size={128}
                        level="H"
                        includeMargin={true}
                        bgColor="#ffffff"
                        fgColor="#000000"
                    />
                    <p className="text-xs mt-1 text-center text-gray-600">Scan QR code</p>
                </div>
            </motion.div>
        </div>
    );
};
