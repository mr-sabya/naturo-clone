// Shared checkout field validation — kept in one place so the standalone
// /checkout page and the landing-page CheckoutSection show identical errors.

/** Validates a BD mobile number: digits only, must be exactly 11. */
export function validatePhone(phone: string): string | null {
    const digits = phone.trim().replace(/\D/g, "");
    if (!digits) return "মোবাইল নাম্বার আবশ্যক";
    if (digits.length !== 11) return `মোবাইল নাম্বার ১১ সংখ্যার হতে হবে (আপনি দিয়েছেন ${digits.length} সংখ্যা)`;
    return null;
}

/** Validates an optional email — only checked when the user actually typed something. */
export function validateEmail(email: string): string | null {
    const trimmed = email.trim();
    if (!trimmed) return null;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "সঠিক ইমেইল ঠিকানা দিন";
    return null;
}
