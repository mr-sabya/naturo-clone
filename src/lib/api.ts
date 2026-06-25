// The API returns price as either a plain number/string OR {main: salePrice, upper: originalPrice}
type RawPrice = string | number | { main?: unknown; upper?: unknown } | null | undefined;

export function parsePrice(raw: RawPrice): number {
    if (typeof raw === "number") return raw;
    if (typeof raw === "string") return parseFloat(raw) || 0;
    if (raw && typeof raw === "object") {
        const obj = raw as Record<string, unknown>;
        return Number(obj.main ?? obj.upper ?? 0) || 0;
    }
    return 0;
}

export function parseOriginalPrice(originalRaw: RawPrice, priceRaw?: RawPrice): number | undefined {
    if (originalRaw !== null && originalRaw !== undefined && originalRaw !== "") {
        const val = parsePrice(originalRaw as RawPrice);
        if (val > 0) return val;
    }
    if (priceRaw && typeof priceRaw === "object") {
        const obj = priceRaw as Record<string, unknown>;
        if (obj.upper !== undefined && obj.upper !== null) {
            const val = Number(obj.upper);
            if (val > 0) return val;
        }
    }
    return undefined;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;

const defaultHeaders: Record<string, string> = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-Tenant-Id": TENANT_ID,
};

async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {},
    cache: RequestCache = "no-store"
): Promise<T> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...(options.headers as Record<string, string> | undefined),
        },
        cache,
    });

    if (!res.ok) {
        throw new Error(`API error ${res.status} on ${endpoint}`);
    }

    return res.json() as Promise<T>;
}

export const api = {
    get: <T>(endpoint: string, cache?: RequestCache) =>
        apiFetch<T>(endpoint, { method: "GET" }, cache),

    post: <T>(endpoint: string, body: unknown) =>
        apiFetch<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(body),
        }),
};
