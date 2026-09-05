// Stable per-browser identifier, created once and persisted in localStorage.
// Sent as the X-Cart-Session header on order submissions so the backend's
// fraud-prevention "Daily Browser Limit" setting (Admin > Orders > Fake
// Order Settings) has something to key off — without it every order looks
// like it came from a different, untracked browser.
export function getCartSessionId(): string {
    if (typeof window === "undefined") return "";
    let id = localStorage.getItem("cart_session_id");
    if (!id) {
        id = crypto?.randomUUID?.() ?? `cart-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        localStorage.setItem("cart_session_id", id);
    }
    return id;
}
