"use client";

import { useEffect, useRef, useState } from "react";
import { X, Gift, Sparkles } from "lucide-react";
import type { SpinWheelConfig, SpinResult } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;
const HEADERS = { Accept: "application/json", "Content-Type": "application/json", "X-Tenant-Id": TENANT_ID };

const WON_KEY = "naturo_spin_wheel_won";
const DISMISSED_KEY = "naturo_spin_wheel_dismissed";

const FALLBACK_COLORS = ["#00AA4E", "#0B7A3C", "#E31E24", "#F59E0B", "#2563EB", "#7C3AED"];

/** White text on a dark/saturated slice, dark green text on a light slice — computed from the actual color instead of a fixed value, since segment colors are admin-configurable. */
function contrastTextColor(hex: string): string {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? "#0B4A2D" : "#FFFFFF";
}

/**
 * First-visit "Spin & Win" popup. Deferred: fetches the wheel config from
 * the client after mount (never blocks the page's initial server render),
 * and only shows once per visitor — a completed spin is remembered in
 * localStorage forever, a plain close is remembered for the tab session
 * only (sessionStorage) so it can resurface on a later visit.
 */
export default function SpinWheelModal() {
    const [config, setConfig] = useState<SpinWheelConfig | null>(null);
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [spinning, setSpinning] = useState(false);
    const [result, setResult] = useState<SpinResult | null>(null);
    const wheelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Temporarily shows on every page load (no localStorage/sessionStorage
        // gating) for testing/demo purposes — see WON_KEY/DISMISSED_KEY below
        // to restore the normal "once per visitor" behavior later.
        let cancelled = false;
        const timer = setTimeout(() => {
            fetch(`${API_BASE}/spin-wheel`, { headers: HEADERS })
                .then((r) => (r.ok ? r.json() : null))
                .then((json) => {
                    if (cancelled || !json?.success || !json.data?.segments?.length) return;
                    setConfig(json.data);
                    setVisible(true);
                })
                .catch(() => {});
        }, 1500);

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, []);

    if (!visible || !config) return null;

    const segments = config.segments;
    const sliceAngle = 360 / segments.length;

    const segmentColor = (i: number) => segments[i].color || FALLBACK_COLORS[i % FALLBACK_COLORS.length];

    const gradient = segments
        .map((_, i) => `${segmentColor(i)} ${i * sliceAngle}deg ${(i + 1) * sliceAngle}deg`)
        .join(", ");

    const close = () => {
        setVisible(false);
        try {
            sessionStorage.setItem(DISMISSED_KEY, "1");
        } catch {}
    };

    const handleSpin = async () => {
        setError("");
        if (!name.trim()) {
            setError("Please enter your name.");
            return;
        }
        if (!phone.trim()) {
            setError("Please enter your phone number.");
            return;
        }

        setSpinning(true);
        try {
            const res = await fetch(`${API_BASE}/spin-wheel/spin`, {
                method: "POST",
                headers: HEADERS,
                body: JSON.stringify({ name, phone }),
            });
            const json = await res.json();

            if (!res.ok || !json?.success) {
                setError(json?.message || "Something went wrong. Please try again.");
                setSpinning(false);
                return;
            }

            const won: SpinResult = json.data;
            const index = segments.findIndex((s) => s.id === won.segment_id);
            const targetIndex = index >= 0 ? index : 0;

            // Land the pointer (fixed at top) on the center of the winning
            // slice, after a few full spins for visual effect.
            const sliceCenter = targetIndex * sliceAngle + sliceAngle / 2;
            const finalRotation = 5 * 360 + (360 - sliceCenter);

            const finish = () => {
                setResult(won);
                setSpinning(false);
                try {
                    localStorage.setItem(WON_KEY, JSON.stringify({ label: won.label, wonAt: Date.now() }));
                } catch {}
            };

            // Web Animations API instead of a React-state-driven CSS
            // transition — a transition needs the browser to paint the
            // "before" transform at least once before the "after" value is
            // set, which isn't guaranteed here (the fetch above can resolve
            // fast enough that React never yields a frame in between,
            // making the wheel silently jump instead of visibly spinning).
            // `.animate()` runs immediately and reliably regardless of that.
            const animation = wheelRef.current?.animate(
                [{ transform: "rotate(0deg)" }, { transform: `rotate(${finalRotation}deg)` }],
                { duration: 4200, easing: "cubic-bezier(0.17, 0.67, 0.12, 0.99)", fill: "forwards" }
            );

            if (animation) {
                animation.onfinish = finish;
            } else {
                finish();
            }
        } catch {
            setError("Network error — please try again.");
            setSpinning(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-sm bg-gradient-to-b from-emerald-50 to-white rounded-[2rem] shadow-2xl p-6 md:p-8 text-center overflow-hidden">
                <Sparkles size={22} className="absolute top-5 left-5 text-amber-400/70 rotate-[-15deg]" />
                <Sparkles size={16} className="absolute top-16 right-8 text-amber-400/50" />

                <button
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 shadow hover:bg-gray-100 flex items-center justify-center transition-colors z-10"
                >
                    <X size={18} />
                </button>

                {result ? (
                    <div className="py-6 animate-in fade-in zoom-in duration-500">
                        <div className="text-5xl mb-4">🎉</div>
                        <p className="text-lg font-bold text-emerald-700 mb-2">You won: {result.label}!</p>
                        <p className="text-sm text-gray-500 mb-6">Our team will contact you shortly to confirm.</p>
                        <button
                            type="button"
                            onClick={close}
                            className="bg-naturoGreen hover:bg-[#0B7A3C] text-white font-bold px-8 py-3 rounded-full transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="relative w-72 h-72 mx-auto mt-2 mb-5">
                            {/* Pointer — a gold bead sitting on the rim, not a plain arrow */}
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 w-7 h-7 rounded-full bg-gradient-to-b from-amber-200 to-amber-500 border-2 border-white shadow-md" />

                            {/* Gold ring frame around the wheel */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 shadow-lg" />
                            <div className="absolute inset-[6px] rounded-full bg-white" />

                            <div
                                ref={wheelRef}
                                className="absolute inset-[10px] rounded-full overflow-hidden shadow-inner"
                                style={{ background: `conic-gradient(${gradient})`, willChange: "transform" }}
                            >
                                {segments.map((seg, i) => {
                                    // Radial position + rotation, like a real prize wheel — each
                                    // label points outward from center along its slice, sitting
                                    // directly on the wedge color (no box) with a color computed
                                    // from that wedge for contrast. No blur/shadow, since that has
                                    // to be re-rasterized every animation frame while spinning,
                                    // which is what made text look like it was flickering.
                                    const angle = i * sliceAngle + sliceAngle / 2;
                                    const rad = (angle * Math.PI) / 180;
                                    const radius = 78;
                                    const x = radius * Math.sin(rad);
                                    const y = -radius * Math.cos(rad);
                                    return (
                                        <div
                                            key={seg.id}
                                            className="absolute top-1/2 left-1/2 w-20 -ml-10 text-center text-[12px] font-black leading-tight"
                                            style={{
                                                transform: `translate(${x}px, ${y}px) translateY(-50%) rotate(${angle - 90}deg)`,
                                                color: contrastTextColor(segmentColor(i)),
                                            }}
                                        >
                                            {seg.label}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Hub */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-11 h-11 rounded-full bg-white shadow-md border-2 border-amber-300 flex items-center justify-center">
                                    <Gift size={18} className="text-[#E31E24]" />
                                </div>
                            </div>
                        </div>

                        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide mb-2">
                            <Gift size={12} /> Special Offer
                        </span>

                        <h2 className="text-xl md:text-2xl font-black text-emerald-800 font-serif leading-snug">
                            {config.title}
                        </h2>
                        {config.subtitle && <p className="text-sm text-gray-500 mt-1 mb-4">{config.subtitle}</p>}

                        <div className="space-y-3 mt-4 text-left">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={spinning}
                                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-emerald-400 disabled:opacity-60 ${
                                        error && !name.trim() ? "border-red-400 bg-red-50" : "border-gray-200"
                                    }`}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="01XXXXXXXXX"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    disabled={spinning}
                                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-emerald-400 disabled:opacity-60 ${
                                        error && !phone.trim() ? "border-red-400 bg-red-50" : "border-gray-200"
                                    }`}
                                />
                            </div>
                            {error && (
                                <p className="flex items-center gap-1.5 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={handleSpin}
                            disabled={spinning}
                            className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-naturoGreen to-[#0B7A3C] hover:brightness-110 disabled:opacity-70 text-white font-bold py-3.5 rounded-full shadow-lg shadow-emerald-900/20 transition-all"
                        >
                            <Sparkles size={16} />
                            {spinning ? "Spinning..." : config.button_text}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
