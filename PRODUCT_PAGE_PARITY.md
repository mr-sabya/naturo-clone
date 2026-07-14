# Product Page Parity — bring naturo-clone up to govaly-clone's reference implementation

Reference: `d:\project\govaly-clone\app\product\[slug]\page.tsx` and its children.
Target: `d:\project\naturo-clone\src\app\product\[slug]\page.tsx` and its children.

Both projects hit the **same** Laravel backend (`emgroup.sabyaroy.com/api`, tenant header
`X-Tenant-Id` / `X-Tenant-ID` — header names are case-insensitive so this isn't a mismatch),
just different `NEXT_PUBLIC_TENANT_ID` values (`nibo-nibo` vs `prakritiz`). govaly-clone's
implementation is the maintained, working one — naturo-clone's product page was built against
an assumed API shape that doesn't match what the backend actually returns, so several things
are silently broken today, not just "different design."

## Files to touch

| File | Change |
|---|---|
| `src/app/product/[slug]/page.tsx` | Fix response parsing; wire hero/benefits/reviews/videos from real product fields |
| `src/components/landing/ImageGallerySection.tsx` | Prop shape `string[]` → `{url:string}[]` |
| `src/components/landing/CustomerReviewSlider.tsx` | Remove self-fetch + fake static reviews; accept `reviews` prop |
| `src/components/landing/VideoReviewSection.tsx` | Remove self-fetch; accept `videos` prop |
| `src/components/landing/CheckoutSection.tsx` | Fix order payload field names (real bug, not cosmetic) |
| `src/components/landing/ProductHero.tsx` (new) | Port from govaly-clone |
| `src/components/landing/ProductBenefitSection.tsx` (new) | Port from govaly-clone |
| `src/app/checkout/page.tsx`, `src/app/payment/page.tsx` | Same payload bug as CheckoutSection — flagged, not detailed here |

---

## 1. Critical bug: `GET /products/{slug}` response is being parsed wrong

Backend (`app/Http/Controllers/Api/ProductController.php:72-76`, em-group repo):

```php
return response()->json([
    'success' => true,
    'product' => new ProductLandingResource($product),
    'related' => ProductResource::collection($related),
]);
```

So the JSON is `{ success, product, related }` — flat, nothing nested under `data`.

Naturo's current parsing (`src/app/product/[slug]/page.tsx:44-53`):

```ts
if (data?.data?.product) {
    product = data.data.product;
    similarProducts = Array.isArray(data.data.related) ? data.data.related : [];
} else {
    product = data.data ?? data;   // <-- always hits this branch
}
```

`data.data.product` never exists, so it always falls into the `else`. `data.data` is also
`undefined` (there's no `data` key at all), so `product` ends up being **the entire response
envelope** `{success: true, product: {...}, related: [...]}` — not the product. Every
`product.name`, `product.gallery`, `product.faqs` read afterward is `undefined`, which is why
the page currently shows only the hardcoded fallback FAQs/benefits and the placeholder image —
it has never actually rendered real product data.

**Fix** — mirror govaly-clone exactly (`app/product/[slug]/page.tsx:54-59`):

```ts
const productData = await productRes.json();
if (productData.success) {
    product = productData.product;
    similarProducts = productData.related ?? [];
}
```

(You can drop the second `similarProducts` request entirely and use `related` from this same
call, or keep calling `/products/{slug}/similar` like govaly does in parallel — both work,
`related` and `/similar` return the same `ProductResource` shape.)

## 2. The real `product.*` field contract (`ProductLandingResource`)

From `app/Http/Resources/ProductLandingResource.php` (em-group repo) — this is what `product`
actually contains once §1 is fixed:

```
id, name, slug, sku, type
effective_price, regular_price, discount_percent      // NOT base_price / sale_price
main_image
hero: { highlight_title, main_title, description, video_url, button_text }
gallery: [{ id, url, is_th }]                          // objects, not plain strings
faqs: [{ q, a }]                                        // NOT { question, answer }
benefits: { section_icon, section_title, long_description, benefits_list[], is_active } | null
reviews_gallery: [{ id, image, rating }]
video_reviews: [{ id, title, video_url }]               // video_url is a raw YouTube watch URL
variants: [{ id, sku, weight, weight_unit, regular_price, sale_price, effective_price, stock, image, display_name }]
meta: { title, description }
```

Naturo's `src/types/index.ts` `Product` interface currently has none of `hero`, `reviews_gallery`,
`video_reviews`, and models `faqs` as `{question, answer}` and `benefits` as a flat `string[]` —
none of which match. Update the type to match the shape above (see §3 per-component notes for
where each field is consumed).

## 3. Component-by-component changes

### 3.1 `src/app/product/[slug]/page.tsx`
- Fix parsing per §1.
- Replace the inline hero `<section>` with a `ProductHero` component fed `product.hero` (§3.2).
- Pass `product.gallery` (objects) to `ImageGallerySection` (§3.6).
- Replace the hardcoded FAQ fallback array with `product.faqs` — either adapt `FaqAccordion` to
  read `faq.q`/`faq.a` instead of `faq.question`/`faq.answer`, or inline the FAQ markup like
  govaly does. Either is fine; just stop defaulting to made-up FAQs when the API call succeeds.
- Replace the inline benefits block with `ProductBenefitSection` fed `product.benefits` (§3.3) —
  the current inline version reads a flat `benefits: string[]` that the API never sends, so it's
  always falling back to the 4 hardcoded bullet points.
- Pass `product.reviews_gallery` into `CustomerReviewSlider` and `product.video_reviews` into
  `VideoReviewSection` as props (§3.4, §3.5) instead of having those components fetch on their own.

### 3.2 New: `ProductHero.tsx`
Port `d:\project\govaly-clone\app\components\landing\ProductHero.tsx` verbatim; re-skin the
`primary-*` color classes to naturo's `emerald-*`/`naturoGreen` palette to match the rest of the
site.

### 3.3 New: `ProductBenefitSection.tsx`
Port `d:\project\govaly-clone\app\components\landing\ProductBenefitSection.tsx`; same re-skin
note. Renders `benefits.long_description` via `dangerouslySetInnerHTML` (it's rich text from the
Laravel admin editor) plus the `benefits_list` checklist. Returns `null` when
`!benefits?.is_active`.

### 3.4 `CustomerReviewSlider.tsx` — stop self-fetching, accept props
Current naturo version fetches `${API_BASE}/reviews` on mount and falls back to 3 hardcoded
`STATIC_REVIEWS` if that fails. There is no tenant-scoped `/reviews` route on this backend tied
to a product (the real data is `product.reviews_gallery`), so in practice **every product page is
showing the same 3 fake testimonials today**, not real reviews for that product.

Change the signature to match govaly-clone:
```ts
interface CustomerReviewSliderProps { reviews: { id: number; image: string; rating: number }[] }
```
Drop the `useEffect` fetch and `STATIC_REVIEWS`; render each `review.image` (govaly's version
shows the review as an image, not text — the "message"/"content" text fields naturo's `Review`
interface has aren't part of the real payload) and a star row from `rating`. Return `null` if
`reviews.length === 0` (no section, rather than fake content).

### 3.5 `VideoReviewSection.tsx` — stop self-fetching, accept props
Same issue: fetches `${API_BASE}/video-reviews`, which isn't a real endpoint either — the data
lives at `product.video_reviews`. Naturo's version at least degrades to rendering nothing rather
than fake content, but switch it to:
```ts
interface VideoReviewSectionProps { videos: { id: number; title: string; video_url: string }[] }
```
and extract the embed ID the way govaly does — `video_url` is a raw
`https://www.youtube.com/watch?v=...` URL, not a ready `embed/` URL and not a separate
`youtube_id` field, so naturo's current `video.youtube_id ?? video.youtubeId` lookups never
match anything real:
```ts
const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};
```

### 3.6 `ImageGallerySection.tsx` — prop shape change
`images: string[]` → `images: { url: string }[]`, read `img.url` in the `<Image src=...>`. Also
add `unoptimized` to the `<Image>` (govaly does this — the backend may serve images from a host
Next's image optimizer isn't configured to trust).

### 3.7 `CheckoutSection.tsx` — wrong order payload shape (highest-impact bug)

Naturo's current submit (`src/components/landing/CheckoutSection.tsx:99-137`) POSTs to
`/orders/checkout`:
```json
{ "name": "...", "phone": "...", "address": "...", "division_id": 1, "district_id": 2, "city_id": 3, "delivery_charge": 60, "note": "...", "items": [{ "product_id": 5, "quantity": 1, "variant_id": null }] }
```

But the backend's actual validator (`OrderController::store`,
`app/Http/Controllers/Api/OrderController.php:44-57`, em-group repo) expects:
```
name, phone, address, product_id, variant_id, quantity, delivery_fee,
division_name, district_name, city_name, latitude, longitude
```
— a **flat, single-item payload keyed by location *names*, not IDs**, `delivery_fee` not
`delivery_charge`, no `items[]` wrapper, and no `note` field at all. Laravel's `$request->validate()`
silently drops any field not in the rule list — it doesn't error. Practical effect: **every order
placed through naturo's product-page checkout today is saved with no division/district/city and
silently discards whatever the customer wrote in "বিশেষ নির্দেশনা"** (note), since none of
`division_id`/`district_id`/`city_id`/`note`/`items` are read by the backend at all.

**Fix** — send what govaly-clone sends (`CheckoutSection.tsx:255-263`, govaly-clone repo):
```ts
orderData = {
    ...orderData,
    product_id: product.id,
    variant_id: product.type === "variable" ? selectedVariant?.id : null,
    quantity,
    delivery_fee: deliveryCharge,
    division_name: /* selected division's label, e.g. divisions.find(d => d.id === divisionId)?.name */,
    district_name: /* same for district */,
    city_name: /* same for city */,
    latitude: location.lat,
    longitude: location.lon,
};
```
Naturo already has the division/district/city *label* available locally (it's shown in the
`<option>` text) — just also store the resolved name string alongside the id when the customer
picks one, the same way `checkout/page.tsx` already does for `divisionName`/`districtName`/`cityName`
(those exist there but currently never leave that page).

If you want to keep a customer-facing "note" field, that requires a backend change first (add a
`note` column + validation rule to `OrderController::store`/`cartCheckout` in em-group) — it has
nowhere to go right now regardless of what the frontend sends.

Optional, recommended (mirrors work already done in govaly-clone, not required for parity):
- Guest phone regex `/^01[3-9]\d{8}$/` before enabling submit.
- `latitude`/`longitude` via `navigator.geolocation` (naturo has no equivalent today).
- Debounced abandoned-order lead capture — `POST /orders/capture-lead`. See
  `d:\project\govaly-clone\app\lib\orderTracking.ts`: a small, self-contained helper
  (`captureLead()` + `useLeadCapture()` hook) that could be copied to
  `src/lib/orderTracking.ts` as-is (same tenant-header pattern) and wired into the phone
  `onChange` handler the same way it was just wired into govaly-clone's `CheckoutSection.tsx`.
- Saved-address / logged-in checkout (govaly's `AddressBook.tsx` pattern) — **only relevant if
  naturo gets user auth and a `/user/addresses` API**. Confirmed today naturo has neither (no
  `auth_token`, `LoginModal`, or `/user/addresses` usage anywhere in `src/`), so this is a scope
  decision, not something to port blindly.

### 3.8 `src/app/checkout/page.tsx` + `src/app/payment/page.tsx` — same payload bug, flagged not detailed
These build the same wrong shape (`division_id`/`city_id`/`delivery_charge`/`items[]`) for the
cart-based flow, looping one `/orders/checkout` call per cart line
(`payment/page.tsx:71-108`). Because the backend only ever reads a single `product_id`/`quantity`
per call (it doesn't understand `items[]`), the one-call-per-item loop happens to work by
accident, but it applies `delivery_charge` to *every* line instead of just the first (govaly's
loop does `delivery_fee: i === 0 ? deliveryCharge : 0`), and it loses division/district/city the
same way §3.7 describes. Apply the same field-name fix here once §3.7 is done and confirmed working.

## 4. Suggested order of work
1. Fix the response-parsing bug (§1) — unblocks everything else, ~5 minutes.
2. `ImageGallerySection` prop shape (§3.6).
3. Add `ProductHero` + `ProductBenefitSection`, wire into the product page (§3.2, §3.3).
4. `CustomerReviewSlider` / `VideoReviewSection` → prop-driven, drop the fake fallback data (§3.4, §3.5).
5. Fix `CheckoutSection`'s order payload (§3.7) — highest business impact, do this even if
   nothing else in this doc gets done.
6. Apply the same payload fix to `checkout/page.tsx` + `payment/page.tsx` (§3.8).
7. Optional: port `capture-lead` abandoned-order tracking + geolocation capture.
8. Optional/decision needed: saved-address flow, only if/when naturo adds user auth.

## Appendix: a quirk in the govaly-clone reference itself (don't copy this part)
`CheckoutSection.tsx`'s default (non-variable) product branch in govaly-clone reads
`product.base_price`/`product.sale_price` for its local "Variant" fallback object, but
`ProductLandingResource` never returns those field names — only `regular_price`/`effective_price`/
`discount_percent`. For a simple (non-variable) product this makes `hasDiscount` always evaluate
`false`, so the strikethrough original price + discount badge never render even when the product
is on sale. When porting §3.7, use `regular_price`/`discount_percent` instead of
`base_price`/`sale_price` in naturo's version — don't reproduce this bug.
