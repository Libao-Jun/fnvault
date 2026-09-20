# fnvault

> fnvault — a lightweight, zero-dependency, Tree-shaking-friendly collection of common JavaScript / TypeScript frontend utility functions (a treasure vault of everyday frontend helpers).

fnvault is a **zero-dependency, Tree-shaking-friendly** lightweight library of frontend utilities. It gathers the scattered, easy-to-forget helpers you reach for daily — type checking, date/time and currency formatting, string manipulation, deep clone and array operations, `localStorage` / Cookie, browser enhancements (URL, clipboard, debounce/throttle, etc.) and common validators — ready to use out of the box, import on demand.

> fnvault = **fn** (function) + **vault** (treasure vault). A lightweight vault of functions: keep every common frontend helper your project needs — type checks, dates, formatting, cloning, storage, browser enhancements — in one safe, grab-what-you-need place.

**Great for**: frontend / Node projects that don't want to pull in heavy deps like lodash just for a few functions, and value on-demand Tree-shaking.
**Not for**: environments that still require IE11 / ES5, or scenarios needing a full-fledged high-level data-structure utility framework.

---

## ✨ Features

- **Zero runtime dependencies**: install size is just the library itself — no third-party packages pulled in.
- **Tree-shaking friendly**: every function is exported independently, so bundlers only ship the functions you actually use.
- **Complete TypeScript types**: ships `.d.ts` declarations. Function signatures, generics, and type guards (`isArray`, etc.) work out of the box — no `@types` needed.
- **Broad coverage**: type checks, date/time, currency/number formatting, string manipulation, deep clone, array operations, storage, Cookie, browser enhancements, debounce/throttle, math utilities and validators all in one place.
- **Environment friendly**: pure-logic functions (type checks, formatting, arrays, math, etc.) work in both browser and Node; DOM-dependent functions gracefully degrade or are browser-only.

---

## 📦 Installation

```bash
# pnpm (recommended for this project)
pnpm add fnvault

# npm
npm install fnvault

# yarn
yarn add fnvault
```

---

## 🚀 Quick Start

Import functions by name directly from the package root — **import on demand, no need to import a whole namespace**. Here are the most common real-world scenarios:

### 1. Type checks & guards

The `is*` family are mostly **type guards**, narrowing types automatically inside `if` — a great fit with TS:

```ts
import { isArray, isDef, isEmpty, isEqual } from "fnvault";

if (isArray(data) && isDef(data[0])) {
  // data is narrowed to any[], and data[0] is definitely not undefined
}

isEmpty("");      // true
isEmpty({});      // true
isEqual({ a: 1 }, { a: 1 }); // true (deep compare, supports Date / RegExp)
```

### 2. Date/time and currency formatting

```ts
import { formatFull, formatYMD, formatRmb, percentCN } from "fnvault";

formatFull(new Date());     // "2026/06/03 14:30:45"
formatYMD(new Date());      // "2026年6月3日" (Chinese year-month-day)
formatRmb(1234.5, { type: "zh-CN", currency: "CNY" }); // "¥1,234.50"
percentCN(0.1234, 2);      // "12.34%"
```

### 3. localStorage read/write (auto JSON serialization)

```ts
import { localGet, localSet, localRm } from "fnvault";

localSet("user", { name: "张三", age: 18 });
const user = localGet<{ name: string; age: number }>("user");
// => { name: "张三", age: 18 }
localRm("user");
```

### 4. Debounce / throttle (with `cancel()`)

```ts
import { debounce, throttle } from "fnvault";

const search = debounce((kw: string) => fetch(`/api?q=${kw}`), 300);
search("a"); search("ab"); // fires only once, 300ms after you stop typing

const onScroll = throttle(() => console.log("scroll"), 200);
window.addEventListener("scroll", onScroll);
onScroll.cancel(); // cancel any pending trailing call if needed
```

### 5. Array & object manipulation

```ts
import { unique, uniqueByKey, groupBy, flatten, filterEmptyValues } from "fnvault";

unique([1, 2, 2, 3]);                 // [1, 2, 3]
uniqueByKey([{ id: 1 }, { id: 1 }], "id"); // [{ id: 1 }]
groupBy([{ type: "a" }, { type: "a" }, { type: "b" }], "type");
// => { a: [{type:"a"},{type:"a"}], b: [{type:"b"}] }
flatten([1, [2, [3, 4]], 5], Infinity); // [1, 2, 3, 4, 5]
filterEmptyValues({ a: 1, b: "", c: null }); // { a: 1 }
```

### 6. URL parsing and clipboard copy

```ts
import { getUrlParams, toQueryString, copyToClipboard } from "fnvault";

getUrlParams("https://x.com/?a=1&b=2"); // { a: "1", b: "2" }
toQueryString({ a: 1, b: "x y" });      // "a=1&b=x%20y"
await copyToClipboard("text to copy");   // true / false
```

> For the full list of functions and complete parameter docs, see [📖 API Reference](#-api-reference) below.

---

## 🌳 On-demand imports & Tree-shaking

fnvault uses ESM with independent per-function exports. Under modern bundlers (Vite / Webpack / Rollup / esbuild) **Tree-shaking works by default** — just import the functions you use by name, and unused functions won't be bundled:

```ts
// ✅ Recommended: named import — only isArray / formatFull get bundled
import { isArray, formatFull } from "fnvault";

// ❌ Not recommended: importing the whole namespace (still tree-shakable, but less clear)
import * as fn from "fnvault";
```

> No extra config needed; as long as `sideEffects` isn't mistakenly set to `true` in your `package.json`, Tree-shaking works fine.

---

## 🌐 Runtime environment

### Minimum version requirements

| Syntax / API                     | Minimum requirement             |
| -------------------------------- | ------------------------------- |
| Arrow functions / `const` / template strings | ES2015                |
| `??` / `?.` / spread operator    | ES2020                          |
| `Array.prototype.flat`           | ES2019 / Chrome 69+ / Node 11+  |
| `Object.fromEntries`             | ES2019 / Chrome 73+ / Node 12+  |
| `structuredClone`                | Chrome 98+ / Node 17+           |
| `TextEncoder`                    | Chrome 38+ / Node 11+           |
| `Intl` (formatting functions)    | Chrome 24+ / Node 0.12+         |

> **Minimum full support**: Chrome 98+ / Firefox 94+ / Safari 15.4+ / Node 18+

ES5 environments (e.g. IE11) can't use it directly — you'll need to recompile `node_modules/fnvault` with Babel and add polyfills.

### Browser-only functions ⚠️

The following functions depend on browser APIs like `window` / `document` / `localStorage` / `navigator` and **will throw or return `false` in Node** — use them only in browser code:

| Module            | Functions                                                                              |
| ----------------- | ------------------------------------------------------------------------------------- |
| Storage           | `localGet` / `localSet` / `localRm` / `localClear`                                    |
| Cookie            | `setCookie` / `getCookie` / `delCookie`                                               |
| Browser           | `getUrlParams` / `getUrlParam` / `toQueryString` / `copyToClipboard` / `downloadFile` / `exportJSON` / `scrollToTop` / `scrollToBottom` / `onScroll` / `observeIntersection` |
| Env detection     | `isPC` / `isIOS` / `isWindow` / `isElement`                                           |

> All other pure functions (type checks, date/time, formatting, clone, arrays, math, string generation/escaping, validators, etc.) work in both browser and Node.

---

## 📑 Category cheat-sheet

| Category | Functions |
| ------- | -------- |
| Type checks | `isArray` `isObject` `is` `isFunction` `isAsyncFunction` `isPromise` `isDate` `isNumber` `isInt` `isFloat` `isString` `isBoolean` `isSymbol` `isPrimitive` `isBasicType` `isNull` `isDef` `isUnDef` `isNullOrUnDef` `isEmpty` `isEmptySv` `isEqual` `isHexColor` `isValidEmail` `isPC` `isWindow` `isElement` `isIOS` |
| Timestamp | `timestamp` `isToday` `firstDay` `lastDay` |
| Date formatting | `formatFull` `formatFullReplace` `formatYMD` `formatWeek` |
| Number & currency formatting | `formatRmb` `formatNum` `percentCN` `compactEN` `compactCN` `signed` |
| String (style / convert / mask) | `maskPhone` `spacePhone` `capitalize` `kebabToCamel` `camelToKebab` `toCamel` `firstUpper` `firstLower` `reverse` `trimAll` `truncate` `truncateByWords` |
| Storage | `localGet` `localSet` `localRm` `localClear` |
| Clone | `deepClone` `deepCloneWithJSON` `structClone` `shallowClone` |
| Array | `unique` `uniqueByKey` `sortNumAsc` `sortNumDesc` `sortByKey` `toArray` `mergeArrays` `flatten` `arrFind` `groupBy` `filterEmptyValues` `createRange` |
| Cookie | `setCookie` `getCookie` `delCookie` |
| Browser | `getUrlParams` `getUrlParam` `toQueryString` `copyToClipboard` `downloadFile` `exportJSON` `scrollToTop` `scrollToBottom` `onScroll` `observeIntersection` |
| Debounce & throttle | `debounce` `throttle` |
| Math | `clamp` `randomInt` `randomFloat` `round` `sum` `average` `inRange` `lerp` |
| String (generate / escape / safe) | `randomString` `uuid` `escapeHtml` `unescapeHtml` `stripHtml` `ensurePrefix` `ensureSuffix` `removePrefix` `removeSuffix` `byteSize` `maskName` |
| Validation | `checkCardNo` `isEmail` `isTel` |

---

## 📖 API Reference

### Type checks

---

#### isArray(value)

> — Check if value is an array (type guard).

```ts
isArray([1, 2, 3]); // true
```

#### isObject(value)

> — Check if value is a plain object (excluding arrays and `null`).

```ts
isObject({ a: 1 }); // true
isObject([]);       // false
```

#### is(val, type)

> — Generic type check (via `Object.prototype.toString`; internal utility).

```ts
is([], "Array"); // true
```

#### isFunction(val)

> — Check if value is a function (type guard).

```ts
isFunction(() => {}); // true
```

#### isAsyncFunction(val)

> — Check if value is an async function.

```ts
isAsyncFunction(async () => {}); // true
```

#### isPromise(value)

> — Check if value is a Promise (has a `then` method).

```ts
isPromise(Promise.resolve()); // true
```

#### isDate(val)

> — Check if value is a Date object (type guard).

```ts
isDate(new Date()); // true
```

#### isNumber(val)

> — Check if value is a number (including `NaN` / `Infinity`).

```ts
isNumber(42); // true
```

#### isInt(val)

> — Check if value is an integer (finite with no fractional part).

```ts
isInt(42); // true
```

#### isFloat(val)

> — Check if value is a float (finite with a fractional part).

```ts
isFloat(3.14); // true
```

#### isString(val)

> — Check if value is a string (type guard).

```ts
isString("hello"); // true
```

#### isBoolean(val)

> — Check if value is a boolean (type guard).

```ts
isBoolean(true); // true
```

#### isSymbol(value)

> — Check if value is a Symbol.

```ts
isSymbol(Symbol("foo")); // true
```

#### isPrimitive(value)

> — Check if value is a primitive type.

```ts
isPrimitive(42); // true
```

#### isBasicType(val)

> — Check if value is a basic type (`string` / `number` / `boolean` / `symbol` / `bigint` / `null` / `undefined`).

```ts
isBasicType("hello"); // true
isBasicType({});      // false
```

#### isNull(val)

> — Check if value is `null` (type guard).

```ts
isNull(null); // true
```

#### isDef(val)

> — Check if value is not `undefined` (type guard).

```ts
isDef("hello"); // true
```

#### isUnDef(val)

> — Check if value is `undefined` (type guard).

```ts
isUnDef(undefined); // true
```

#### isNullOrUnDef(val)

> — Check if value is `null` or `undefined` (type guard).

```ts
isNullOrUnDef(null); // true
```

#### isEmpty(value)

> — Check if value is empty (full version: supports Date / Map / Set, etc.).

```ts
isEmpty("");    // true
isEmpty([]);    // true
isEmpty({});    // true
```

#### isEmptySv(value)

> — Check if value is empty (simplified: string / array / Map / Set / plain object).

```ts
isEmptySv([]); // true
```

#### isEqual(x, y)

> — Deep equality comparison (supports Date / RegExp, recursive, based on `Object.is`).

```ts
isEqual({ a: 1 }, { a: 1 }); // true
isEqual(NaN, NaN);           // true
```

#### isHexColor(str)

> — Check if value is a hex color (supports `#RGB` / `#RRGGBB`).

```ts
isHexColor("#fff"); // true
```

#### isValidEmail(email)

> — Check if value is a valid email (loose check).

```ts
isValidEmail("a@b.com"); // true
```

#### isPC()

> — Check if running in a browser environment (has `window`). Returns `false` in Node.

```ts
isPC(); // true in browser, false in Node
```

#### isWindow(val)

> — Check if value is the `window` object.

```ts
isWindow(window); // true
```

#### isElement(val)

> — Check if value is a DOM element.

```ts
isElement(document.body); // true
```

#### isIOS()

> — Check if the device is iOS (depends on `navigator.userAgent`).

```ts
isIOS(); // depends on UA
```

### Timestamp

---

#### timestamp()

> — Get the current timestamp in milliseconds, equivalent to `Date.now()`.

```ts
timestamp(); // 1752772800000
```

#### isToday(date)

> — Check if a date is today (accepts `Date` / timestamp / date string).

```ts
isToday(new Date());        // true
isToday(new Date("2020-01-01")); // false
```

#### firstDay(y, m)

> — Get the first day of a given year/month (`m` is the human-friendly 1–12 month).

```ts
firstDay(2026, 7); // new Date(2026, 6, 1)
```

#### lastDay(y, m)

> — Get the last day of a given year/month (`m` is the human-friendly 1–12 month).

```ts
lastDay(2026, 7);  // new Date(2026, 6, 31)
lastDay(2024, 2);  // new Date(2024, 1, 29) (leap year)
```

### Date formatting

---

#### formatFull(date)

> — Full date/time (slash-separated, `YYYY/MM/DD HH:mm:ss`).

```ts
formatFull(new Date()); // "2026/06/03 14:30:45"
```

#### formatFullReplace(date)

> — Full date/time (hyphen-separated, `YYYY-MM-DD HH:mm:ss`).

```ts
formatFullReplace(new Date()); // "2026-06-03 14:30:45"
```

#### formatYMD(date)

> — Chinese year-month-day.

```ts
formatYMD(new Date()); // "2026年6月3日"
```

#### formatWeek(date)

> — Day of the week (Chinese).

```ts
formatWeek(new Date()); // "星期三"
```

### Number & currency formatting

---

#### formatRmb(value, options)

> — Currency formatting (RMB). `options` is fixed to `{ type: "zh-CN", currency: "CNY" }`.

```ts
formatRmb(1234.56, { type: "zh-CN", currency: "CNY" }); // "¥1,234.56"
```

#### formatNum(value)

> — Thousands separator.

```ts
formatNum(1234567); // "1,234,567"
```

#### percentCN(value, digit)

> — Percentage formatting (`value` is a ratio, `digit` is decimal places, default `0`).

```ts
percentCN(0.1234, 2); // "12.34%"
percentCN(0.25);      // "25%"
```

#### compactEN(value)

> — Compact large numbers (English abbreviations).

```ts
compactEN(12345);   // "12K"
compactEN(1000000); // "1M"
```

#### compactCN(value)

> — Compact large numbers (Chinese abbreviations).

```ts
compactCN(12345); // "1.2万"
```

#### signed(value, digit)

> — Display with explicit sign (always `+` for positive, `-` for negative; `digit` defaults to `0`).

```ts
signed(42, 1);  // "+42.0"
signed(-3.2, 1); // "-3.2"
```

### String (style / convert / mask)

---

#### maskPhone(phone)

> — Mask a phone number (hide the middle 4 digits).

```ts
maskPhone("13812345678"); // "138****5678"
```

#### spacePhone(phone)

> — Space-separated phone number (`3 4 4` rule).

```ts
spacePhone("13812345678"); // "138 1234 5678"
```

#### capitalize(str)

> — Capitalize the first letter of every word.

```ts
capitalize("hello world"); // "Hello World"
```

#### kebabToCamel(str)

> — kebab-case to camelCase.

```ts
kebabToCamel("hello-world"); // "helloWorld"
```

#### camelToKebab(str)

> — camelCase to kebab-case.

```ts
camelToKebab("helloWorld"); // "hello-world"
```

#### toCamel(str)

> — snake_case to camelCase.

```ts
toCamel("hello_world"); // "helloWorld"
```

#### firstUpper(str)

> — Capitalize the first letter.

```ts
firstUpper("hello"); // "Hello"
```

#### firstLower(str)

> — Lowercase the first letter.

```ts
firstLower("Hello"); // "hello"
```

#### reverse(str)

> — Reverse a string (by code points; handles emoji correctly).

```ts
reverse("hello"); // "olleh"
```

#### trimAll(str)

> — Remove all whitespace (including newlines / tabs).

```ts
trimAll(" h e l lo "); // "hello"
```

#### truncate(str, max, suffix?)

> — Truncate an over-long string (`max` is the max length including suffix; `suffix` defaults to `"..."`).

```ts
truncate("Hello World", 8); // "Hello..."
```

#### truncateByWords(str, max, suffix?)

> — Truncate by character count (Chinese counts as one char — more friendly).

```ts
truncateByWords("你好世界欢迎你", 4); // "你好世界..."
```

### Storage

> ⚠️ These functions depend on `localStorage` and are browser-only.

---

#### localGet\<T\>(key)

> — Read localStorage (auto `JSON.parse`; non-JSON content returned as-is; `null` if key missing).

```ts
localGet("user"); // { name: '张三' }
```

#### localSet(key, value)

> — Write localStorage (auto `JSON.stringify` serialization).

```ts
localSet("user", { name: "张三" });
```

#### localRm(key)

> — Remove a specific localStorage entry.

```ts
localRm("user");
```

#### localClear()

> — Clear all localStorage.

```ts
localClear();
```

### Clone

---

#### deepClone(obj)

> — Recursive deep clone (supports Date / RegExp / Map / Set / circular references).

```ts
deepClone({ a: 1, b: { c: 2 } });
```

#### deepCloneWithJSON(obj)

> — JSON deep clone (JSON-safe types only; loses Date / Map / Set / function, etc.).

```ts
deepCloneWithJSON({ a: 1 });
```

#### structClone(obj, options?)

> — Deep clone via native `structuredClone` (no functions / Symbols; needs Node 17+ / modern browsers).

```ts
structClone({ a: 1, b: { c: 2 } });
```

#### shallowClone(obj)

> — Shallow clone (first level only; nested objects still share references).

```ts
shallowClone({ a: 1, b: { c: 2 } });
```

### Array

---

#### unique(arr)

> — Deduplicate via Set (strict `===` equality).

```ts
unique([1, 2, 2, 3]); // [1, 2, 3]
```

#### uniqueByKey(arr, key)

> — Deduplicate an object array by key (keeps first occurrence).

```ts
uniqueByKey([{ id: 1 }, { id: 1 }], "id");
```

#### sortNumAsc(arr)

> — Numeric ascending sort (does not mutate the original array).

```ts
sortNumAsc([3, 1, 2]); // [1, 2, 3]
```

#### sortNumDesc(arr)

> — Numeric descending sort (does not mutate the original array).

```ts
sortNumDesc([1, 3, 2]); // [3, 2, 1]
```

#### sortByKey(arr, key, order?)

> — Sort an object array by a numeric property (`order` defaults to `"asc"`, or `"desc"`).

```ts
sortByKey([{ age: 30 }, { age: 20 }], "age");
sortByKey([{ age: 30 }, { age: 20 }], "age", "desc");
```

#### toArray(arrayLike)

> — Convert array-like / iterable to a real array.

```ts
toArray(document.querySelectorAll("div"));
```

#### mergeArrays(...arrays)

> — Merge multiple arrays.

```ts
mergeArrays([1, 2], [3, 4], [5]); // [1, 2, 3, 4, 5]
```

#### flatten(arr, depth?)

> — Flatten a multidimensional array to a given depth (default `1`; use `Infinity` for full flatten).

```ts
flatten([1, [2, [3, 4]], 5]); // [1, 2, [3, 4], 5]
flatten([1, [2, [3, 4]], 5], Infinity); // [1, 2, 3, 4, 5]
```

#### arrFind(arr, key, value)

> — Find the first match in an object array by key-value.

```ts
arrFind([{ id: 1 }, { id: 2 }], "id", 2); // { id: 2 }
```

#### groupBy(arr, key)

> — Group an object array by a given property.

```ts
groupBy([{ type: "fruit" }, { type: "vegetable" }], "type");
// => { fruit: [...], vegetable: [...] }
```

#### filterEmptyValues(obj)

> — Remove properties whose value is empty (`null` / `undefined` / empty string).

```ts
filterEmptyValues({ a: 1, b: "", c: null }); // { a: 1 }
```

#### createRange(length, mapFn?)

> — Quickly generate a range array (returns index sequence when `mapFn` is omitted).

```ts
createRange(5); // [0, 1, 2, 3, 4]
createRange(3, (i) => i * 2); // [0, 2, 4]
```

### Cookie

> ⚠️ These functions operate on `document.cookie` and are browser-only.

---

#### setCookie(name, value, days?)

> — Set a cookie. `days` defaults to `0` (session cookie, cleared when the browser closes); a negative value expires it immediately. Name and value are `encodeURIComponent`-encoded automatically.

```ts
setCookie("token", "abc123", 30); // expires in 30 days
setCookie("theme", "dark");       // session cookie
```

#### getCookie(name)

> — Get a cookie (value `decodeURIComponent`-decoded automatically; `null` if missing).

```ts
getCookie("token"); // "abc123"
```

#### delCookie(name)

> — Delete a cookie (by setting its expiration to the past).

```ts
delCookie("token");
```

### Browser

> ⚠️ These functions depend on `window` / `document` / `navigator` and are browser-only.

---

#### getUrlParams(url?)

> — Get URL query params as an object (uses the current page URL when `url` is omitted).

```ts
getUrlParams("?a=1&b=2"); // { a: '1', b: '2' }
```

#### getUrlParam(key, url?)

> — Get a single URL param (returns `null` if missing).

```ts
getUrlParam("a"); // "1"
getUrlParam("a", "?a=1"); // "1"
```

#### toQueryString(params)

> — Convert an object to a URL query string (auto-encoded; ignores `null` / `undefined`).

```ts
toQueryString({ a: 1, b: "hello" }); // "a=1&b=hello"
```

#### copyToClipboard(text)

> — Copy text to the clipboard (prefers `navigator.clipboard`, falls back to `execCommand`). Returns `Promise<boolean>`.

```ts
await copyToClipboard("Hello"); // true / false
```

#### downloadFile(content, filename, mimeType?)

> — Download a file (via Blob). `mimeType` defaults to `"text/plain"`.

```ts
downloadFile("Hello", "hello.txt");
```

#### exportJSON(data, filename?)

> — Export data as a JSON file. `filename` defaults to `"data.json"`.

```ts
exportJSON({ name: "张三" });
```

#### scrollToTop(behavior?)

> — Scroll to the top (defaults to `"smooth"`, or `"auto"` for instant).

```ts
scrollToTop();
```

#### scrollToBottom(behavior?)

> — Scroll to the bottom (defaults to `"smooth"`, or `"auto"` for instant).

```ts
scrollToBottom();
```

#### onScroll(callback)

> — Listen to page scroll (rAF-throttled, at most once per frame). Returns a cleanup function.

```ts
const off = onScroll((y) => console.log(y));
// off() stops listening
```

#### observeIntersection(target, onEnter, onLeave?, options?)

> — Observe an element entering / leaving the viewport via `IntersectionObserver`. Returns a cleanup function.

```ts
const cleanup = observeIntersection(document.querySelector(".footer")!, () =>
  loadMore(10),
);
```

### Debounce & throttle

---

#### debounce(fn, delay?, options?)

> — Debounce: fires only after `delay` ms of no further calls (default `300`). The returned function has a `cancel()` method to cancel a pending call.
> `options.leading` (default `false`) / `options.trailing` (default `true`).

```ts
const fn = debounce((val: string) => console.log(val), 500);
fn("a");
fn("b");
fn("c");
// => 'c' (only the last call runs)
fn.cancel(); // cancel the pending call
```

#### throttle(fn, interval?, options?)

> — Throttle: runs at most once per fixed `interval` (default `300`). The returned function has a `cancel()` method.
> `options.leading` (default `true`) / `options.trailing` (default `true`).

```ts
const fn = throttle((val: string) => console.log(val), 500);
fn("a");
fn("b");
fn("c");
// => 'a', then 'c' once after 500ms
fn.cancel();
```

### Math

---

#### clamp(value, min, max)

> — Clamp a value within the `[min, max]` closed interval (auto-corrects `min` / `max` order).

```ts
clamp(5, 1, 10);  // 5
clamp(0, 1, 10);  // 1
clamp(20, 1, 10); // 10
```

#### randomInt(min, max)

> — Random integer in the `[min, max]` closed interval (inclusive; auto-corrects order).

```ts
randomInt(1, 10); // 7 (random, range 1~10 inclusive)
```

#### randomFloat(min, max)

> — Random float in the `[min, max)` half-open interval (includes `min`, excludes `max`; auto-corrects order).

```ts
randomFloat(0, 1); // 0.374... (random, range [0, 1))
```

#### round(value, decimals?)

> — Round to a given number of decimals (default `0`).

```ts
round(3.14159, 2); // 3.14
round(3.6);        // 4
```

#### sum(arr)

> — Sum an array (returns `0` for an empty array).

```ts
sum([1, 2, 3]); // 6
```

#### average(arr)

> — Average of an array (returns `NaN` for an empty array).

```ts
average([1, 2, 3]); // 2
```

#### inRange(value, min, max)

> — Check if a number is within the `[min, max]` closed interval (auto-corrects order).

```ts
inRange(5, 1, 10); // true
inRange(0, 1, 10); // false
```

#### lerp(start, end, t)

> — Linear interpolation: value between `start` and `end` at ratio `t` (usually `[0, 1]`).

```ts
lerp(0, 100, 0.5); // 50
lerp(0, 100, 0);   // 0
lerp(0, 100, 1);   // 100
```

### String (generate / escape / safe)

---

#### randomString(length?)

> — Generate a random alphanumeric string of given length (default 8).

```ts
randomString(6); // "aB3xY9"
```

#### uuid()

> — Generate a UUID v4 (RFC 4122 compliant).

```ts
uuid(); // "550e8400-e29b-41d4-a716-446655440000"
```

#### escapeHtml(str)

> — Escape HTML special characters (`&` `<` `>` `"` `'`) — prevent XSS.

```ts
escapeHtml('<div class="a">&</div>');
// => '&lt;div class=&quot;a&quot;&gt;&amp;&lt;/div&gt;'
```

#### unescapeHtml(str)

> — Unescape HTML entities.

```ts
unescapeHtml("&lt;div&gt;hello&lt;/div&gt;");
// => '<div>hello</div>'
```

#### stripHtml(str)

> — Strip HTML tags from a string.

```ts
stripHtml("<p>hello</p>"); // "hello"
```

#### ensurePrefix(str, prefix)

> — Ensure a string starts with a prefix (add it if missing).

```ts
ensurePrefix("world", "hello-"); // "hello-world"
ensurePrefix("hello-world", "hello-"); // "hello-world"
```

#### ensureSuffix(str, suffix)

> — Ensure a string ends with a suffix (add it if missing).

```ts
ensureSuffix("hello", ".txt"); // "hello.txt"
```

#### removePrefix(str, prefix)

> — Remove a prefix from a string (if present).

```ts
removePrefix("hello-world", "hello-"); // "world"
```

#### removeSuffix(str, suffix)

> — Remove a suffix from a string (if present).

```ts
removeSuffix("hello.txt", ".txt"); // "hello"
```

#### byteSize(str)

> — Get the UTF-8 byte length of a string (Chinese ≈ 3 bytes per char).

```ts
byteSize("hello"); // 5
byteSize("你好");  // 6
```

#### maskName(name)

> — Mask a name (keep the first character, replace the rest with `*`).

```ts
maskName("张三");    // "张*"
maskName("张三丰");  // "张**"
maskName("欧阳娜娜"); // "欧***"
```

### Validation

---

#### checkCardNo(value)

> — Validate a Chinese ID number (15 / 18 digits, last char may be `X`; format-only, does not verify the check digit).

```ts
checkCardNo("110101199003074519"); // true
checkCardNo("1234567890abcdef");  // false
```

#### isEmail(value)

> — Validate an email address.

```ts
isEmail("test@example.com"); // true
isEmail("invalid");          // false
```

#### isTel(value)

> — Validate a mainland China mobile number (starts with 1, second digit 3–9, 11 digits total; accepts string or number).

```ts
isTel("13812345678"); // true
isTel("12012345678"); // false
```

---

## ❓ FAQ

**Q: How is this different from lodash?**
A: fnvault is positioned as a lightweight, zero-dependency, on-demand utility set — ideal when you don't want to pull in heavy deps like lodash for just a few functions. If you need functional programming or advanced collection operations, lodash is still the better fit.

**Q: How do I bundle only the functions I use?**
A: Simply import them by name (`import { xxx } from "fnvault"`) — the bundler tree-shakes unused functions automatically, no extra config required.

**Q: Can I use it in Node?**
A: Pure-logic functions (type checks, formatting, arrays, math, string generation/escaping, validators, etc.) work in Node. Functions involving `localStorage` / `document` / `window` / `navigator` (see "Browser-only functions" above) are browser-only.

**Q: Is TypeScript supported?**
A: Yes — ships `.d.ts` declarations, and the `is*` family are type guards that narrow types inside conditionals.

**Q: Does it work on ES5 / IE11?**
A: Not directly. You'll need to recompile `node_modules/fnvault` with Babel and add polyfills.

---

## 📄 License

[MIT](https://opensource.org/licenses/MIT) © newborn_calf

- Source: <https://github.com/Libao-Jun/fnvault>
- Issues: <https://github.com/Libao-Jun/fnvault/issues>
