# fnvault

> 前端常用工具函数宝库 · A lightweight, zero-dependency collection of frontend utility functions.

📘 English version: [README.en.md](./README.en.md)

fnvault 是一个**零依赖、支持 Tree-shaking** 的轻量级前端工具函数库，把日常开发中零散又易忘的小工具收拢归一——类型判断、时间日期与货币格式化、字符串处理、深拷贝与数组操作、`localStorage` / Cookie、浏览器增强（URL、剪贴板、防抖节流等）以及常用格式校验，开箱即用、按需引入。

> fnvault = **fn**（function，函数）+ **vault**（宝库）。一个轻量的函数宝库：把项目里要用的各类前端常用工具函数——类型判断、时间日期、格式化、拷贝、存储、浏览器增强等——都收进同一个保险库，随用随取。

**适合**：不想为几个函数引入 lodash 等重型依赖、追求按需 Tree-shaking 的前端 / Node 项目。
**不适合**：仍需兼容 IE11 等 ES5 环境，或需要完整高阶数据结构工具框架的场景。

`fnvault` —— 轻量、零依赖、Tree-shaking 友好的 JavaScript / TypeScript 常用工具集。

---

## ✨ 特性

- **零运行时依赖**：安装体积仅为自身代码，不会拖入任何第三方包。
- **Tree-shaking 友好**：每个函数独立导出，打包工具只会把你用到的函数打进产物。
- **TypeScript 类型完备**：自带 `.d.ts` 类型声明，函数签名、泛型、类型守卫（`isArray` 等）开箱即用，无需 `@types`。
- **覆盖面广**：类型判断、时间日期、货币/数字格式化、字符串处理、深拷贝、数组操作、存储、Cookie、浏览器增强、防抖节流、数学工具与格式校验一应俱全。
- **环境友好**：纯逻辑函数（类型判断、格式化、数组、数学等）在浏览器与 Node 中均可使用；涉及 DOM 的函数会自动降级或仅在浏览器工作。

---

## 📦 安装

```bash
# pnpm（推荐，本项目使用）
pnpm add fnvault

# npm
npm install fnvault

# yarn
yarn add fnvault
```

---

## 🚀 快速开始

全部函数都从包根直接按名导入，**按需引入即可，无需引入整个命名空间**。下面是几个最常见的真实场景：

### 1. 类型判断与守卫

`is*` 系列函数大多带**类型守卫**，能在 `if` 中自动收窄类型，配合 TS 非常顺手：

```ts
import { isArray, isDef, isEmpty, isEqual } from "fnvault";

if (isArray(data) && isDef(data[0])) {
  // 此处 data 已被收窄为 any[]，data[0] 一定不为 undefined
}

isEmpty("");      // true
isEmpty({});      // true
isEqual({ a: 1 }, { a: 1 }); // true（深度比较，支持 Date / RegExp）
```

### 2. 时间日期与货币格式化

```ts
import { formatFull, formatYMD, formatRmb, percentCN } from "fnvault";

formatFull(new Date());     // "2026/06/03 14:30:45"
formatYMD(new Date());      // "2026年6月3日"
formatRmb(1234.5, { type: "zh-CN", currency: "CNY" }); // "¥1,234.50"
percentCN(0.1234, 2);       // "12.34%"
```

### 3. localStorage 读写（自动 JSON 序列化）

```ts
import { localGet, localSet, localRm } from "fnvault";

localSet("user", { name: "张三", age: 18 });
const user = localGet<{ name: string; age: number }>("user");
// => { name: "张三", age: 18 }
localRm("user");
```

### 4. 防抖 / 节流（带 `cancel()`）

```ts
import { debounce, throttle } from "fnvault";

const search = debounce((kw: string) => fetch(`/api?q=${kw}`), 300);
search("a"); search("ab"); // 停止输入 300ms 后才真正触发一次

const onScroll = throttle(() => console.log("scroll"), 200);
window.addEventListener("scroll", onScroll);
onScroll.cancel(); // 需要时可取消尚未执行的尾随调用
```

### 5. 数组与对象处理

```ts
import { unique, uniqueByKey, groupBy, flatten, filterEmptyValues } from "fnvault";

unique([1, 2, 2, 3]);                 // [1, 2, 3]
uniqueByKey([{ id: 1 }, { id: 1 }], "id"); // [{ id: 1 }]
groupBy([{ type: "a" }, { type: "a" }, { type: "b" }], "type");
// => { a: [{type:"a"},{type:"a"}], b: [{type:"b"}] }
flatten([1, [2, [3, 4]], 5], Infinity); // [1, 2, 3, 4, 5]
filterEmptyValues({ a: 1, b: "", c: null }); // { a: 1 }
```

### 6. URL 解析与剪贴板复制

```ts
import { getUrlParams, toQueryString, copyToClipboard } from "fnvault";

getUrlParams("https://x.com/?a=1&b=2"); // { a: "1", b: "2" }
toQueryString({ a: 1, b: "x y" });      // "a=1&b=x%20y"
await copyToClipboard("要复制的文本");     // true / false
```

> 更多函数与完整参数说明见下方 [📖 API 参考](#-api-参考)。

---

## 🌳 按需引入与 Tree-shaking

fnvault 采用 ESM 模块、每个函数独立导出。在现代打包器（Vite / Webpack / Rollup / esbuild）中**默认即具备 Tree-shaking 能力**，你只需按名引入用到的函数，未被引用的函数不会被打进产物：

```ts
// ✅ 推荐：按名引入，只打包 isArray / formatFull 两个函数
import { isArray, formatFull } from "fnvault";

// ❌ 不推荐：整体引入命名空间（虽仍可被摇树，但语义不够清晰）
import * as fn from "fnvault";
```

> 无需任何额外配置；只要项目 `package.json` 中 `sideEffects` 未被误设为 `true`，Tree-shaking 即可正常工作。

---

## 🌐 运行环境

### 最低版本要求

| 语法/API                        | 最低版本要求                   |
| ------------------------------- | ------------------------------ |
| 箭头函数 / `const` / 模板字符串 | ES2015                         |
| `??` / `?.` / 展开运算符        | ES2020                         |
| `Array.prototype.flat`          | ES2019 / Chrome 69+ / Node 11+ |
| `Object.fromEntries`            | ES2019 / Chrome 73+ / Node 12+ |
| `structuredClone`               | Chrome 98+ / Node 17+          |
| `TextEncoder`                   | Chrome 38+ / Node 11+          |
| `Intl`（格式化函数）            | Chrome 24+ / Node 0.12+        |

> **最低完整支持**：Chrome 98+ / Firefox 94+ / Safari 15.4+ / Node 18+

ES5 环境（如 IE11）无法直接使用，需通过 Babel 等工具对 `node_modules/fnvault` 进行二次编译并补充 polyfill。

### 仅浏览器环境的函数 ⚠️

以下函数依赖 `window` / `document` / `localStorage` / `navigator` 等浏览器 API，**在 Node 中调用会抛错或返回 `false`**，请仅在浏览器代码中使用：

| 模块        | 函数                                                                                 |
| ----------- | ------------------------------------------------------------------------------------ |
| 存储        | `localGet` / `localSet` / `localRm` / `localClear`                                   |
| Cookie      | `setCookie` / `getCookie` / `delCookie`                                              |
| 浏览器      | `getUrlParams` / `getUrlParam` / `toQueryString` / `copyToClipboard` / `downloadFile` / `exportJSON` / `scrollToTop` / `scrollToBottom` / `onScroll` / `observeIntersection` |
| 环境判断    | `isPC` / `isIOS` / `isWindow` / `isElement`                                          |

> 其余纯函数（类型判断、时间日期、格式化、拷贝、数组、数学、字符串生成/转义、格式校验等）在浏览器与 Node 中均可用。

---

## 📑 分类速查表

| 分类 | 函数 |
| ---- | ---- |
| 类型判断 | `isArray` `isObject` `is` `isFunction` `isAsyncFunction` `isPromise` `isDate` `isNumber` `isInt` `isFloat` `isString` `isBoolean` `isSymbol` `isPrimitive` `isBasicType` `isNull` `isDef` `isUnDef` `isNullOrUnDef` `isEmpty` `isEmptySv` `isEqual` `isHexColor` `isValidEmail` `isPC` `isWindow` `isElement` `isIOS` |
| 时间戳 | `timestamp` `isToday` `firstDay` `lastDay` |
| 时间日期格式化 | `formatFull` `formatFullReplace` `formatYMD` `formatWeek` |
| 数字与货币格式化 | `formatRmb` `formatNum` `percentCN` `compactEN` `compactCN` `signed` |
| 字符串处理（样式/转换/脱敏） | `maskPhone` `spacePhone` `capitalize` `kebabToCamel` `camelToKebab` `toCamel` `firstUpper` `firstLower` `reverse` `trimAll` `truncate` `truncateByWords` |
| 存储 | `localGet` `localSet` `localRm` `localClear` |
| 拷贝 | `deepClone` `deepCloneWithJSON` `structClone` `shallowClone` |
| 数组 | `unique` `uniqueByKey` `sortNumAsc` `sortNumDesc` `sortByKey` `toArray` `mergeArrays` `flatten` `arrFind` `groupBy` `filterEmptyValues` `createRange` |
| Cookie | `setCookie` `getCookie` `delCookie` |
| 浏览器 | `getUrlParams` `getUrlParam` `toQueryString` `copyToClipboard` `downloadFile` `exportJSON` `scrollToTop` `scrollToBottom` `onScroll` `observeIntersection` |
| 防抖与节流 | `debounce` `throttle` |
| 数学 | `clamp` `randomInt` `randomFloat` `round` `sum` `average` `inRange` `lerp` |
| 字符串（生成/转义/安全） | `randomString` `uuid` `escapeHtml` `unescapeHtml` `stripHtml` `ensurePrefix` `ensureSuffix` `removePrefix` `removeSuffix` `byteSize` `maskName` |
| 格式校验 | `checkCardNo` `isEmail` `isTel` |

---

## 📖 API 参考

### 类型判断

---

#### isArray(value)

> — 判断是否为数组（类型守卫）。

```ts
isArray([1, 2, 3]); // true
```

#### isObject(value)

> — 判断是否为对象（不含数组、不含 `null`）。

```ts
isObject({ a: 1 }); // true
isObject([]);       // false
```

#### is(val, type)

> — 通用类型判断（基于 `Object.prototype.toString`，内部工具）。

```ts
is([], "Array"); // true
```

#### isFunction(val)

> — 判断是否为函数（类型守卫）。

```ts
isFunction(() => {}); // true
```

#### isAsyncFunction(val)

> — 判断是否为异步函数。

```ts
isAsyncFunction(async () => {}); // true
```

#### isPromise(value)

> — 判断是否为 Promise（具有 `then` 方法）。

```ts
isPromise(Promise.resolve()); // true
```

#### isDate(val)

> — 判断是否为 Date 对象（类型守卫）。

```ts
isDate(new Date()); // true
```

#### isNumber(val)

> — 判断是否为数字（含 `NaN` / `Infinity`）。

```ts
isNumber(42); // true
```

#### isInt(val)

> — 判断是否为整数（有限且为整数）。

```ts
isInt(42); // true
```

#### isFloat(val)

> — 判断是否为浮点数（有限且含小数）。

```ts
isFloat(3.14); // true
```

#### isString(val)

> — 判断是否为字符串（类型守卫）。

```ts
isString("hello"); // true
```

#### isBoolean(val)

> — 判断是否为布尔值（类型守卫）。

```ts
isBoolean(true); // true
```

#### isSymbol(value)

> — 判断是否为 Symbol。

```ts
isSymbol(Symbol("foo")); // true
```

#### isPrimitive(value)

> — 判断是否为原始类型。

```ts
isPrimitive(42); // true
```

#### isBasicType(val)

> — 检查是否为基础类型（`string` / `number` / `boolean` / `symbol` / `bigint` / `null` / `undefined`）。

```ts
isBasicType("hello"); // true
isBasicType({});      // false
```

#### isNull(val)

> — 判断是否为 `null`（类型守卫）。

```ts
isNull(null); // true
```

#### isDef(val)

> — 判断是否不是 `undefined`（类型守卫）。

```ts
isDef("hello"); // true
```

#### isUnDef(val)

> — 判断是否为 `undefined`（类型守卫）。

```ts
isUnDef(undefined); // true
```

#### isNullOrUnDef(val)

> — 判断是否为 `null` 或 `undefined`（类型守卫）。

```ts
isNullOrUnDef(null); // true
```

#### isEmpty(value)

> — 判断是否为空（完备版：支持 Date / Map / Set 等）。

```ts
isEmpty("");    // true
isEmpty([]);    // true
isEmpty({});    // true
```

#### isEmptySv(value)

> — 判断是否为空（简化版：字符串 / 数组 / Map / Set / 普通对象）。

```ts
isEmptySv([]); // true
```

#### isEqual(x, y)

> — 深度相等比较（支持 Date / RegExp、递归比较、基于 `Object.is`）。

```ts
isEqual({ a: 1 }, { a: 1 }); // true
isEqual(NaN, NaN);           // true
```

#### isHexColor(str)

> — 判断是否为十六进制颜色（支持 `#RGB` / `#RRGGBB`）。

```ts
isHexColor("#fff"); // true
```

#### isValidEmail(email)

> — 判断是否为有效邮箱（宽松校验）。

```ts
isValidEmail("a@b.com"); // true
```

#### isPC()

> — 判断是否为浏览器环境（存在 `window`）。Node 中返回 `false`。

```ts
isPC(); // 浏览器中 true，Node 中 false
```

#### isWindow(val)

> — 判断是否为 `window` 对象。

```ts
isWindow(window); // true
```

#### isElement(val)

> — 判断是否为 DOM 元素。

```ts
isElement(document.body); // true
```

#### isIOS()

> — 判断设备是否为 iOS（依赖 `navigator.userAgent`）。

```ts
isIOS(); // 依 UA 而定
```

### 时间戳

---

#### timestamp()

> — 获取当前时间戳（毫秒），等价于 `Date.now()`。

```ts
timestamp(); // 1752772800000
```

#### isToday(date)

> — 判断日期是否为今天（接受 `Date` / 时间戳 / 日期字符串）。

```ts
isToday(new Date());        // true
isToday(new Date("2020-01-01")); // false
```

#### firstDay(y, m)

> — 获取指定年月的第一天（`m` 为 1–12 的人类习惯月份）。

```ts
firstDay(2026, 7); // new Date(2026, 6, 1)
```

#### lastDay(y, m)

> — 获取指定年月的最后一天（`m` 为 1–12 的人类习惯月份）。

```ts
lastDay(2026, 7);  // new Date(2026, 6, 31)
lastDay(2024, 2);  // new Date(2024, 1, 29)（闰年）
```

### 时间日期格式化

---

#### formatFull(date)

> — 完整日期时间（斜杠分隔，`YYYY/MM/DD HH:mm:ss`）。

```ts
formatFull(new Date()); // "2026/06/03 14:30:45"
```

#### formatFullReplace(date)

> — 完整日期时间（短横线分隔，`YYYY-MM-DD HH:mm:ss`）。

```ts
formatFullReplace(new Date()); // "2026-06-03 14:30:45"
```

#### formatYMD(date)

> — 中文年月日。

```ts
formatYMD(new Date()); // "2026年6月3日"
```

#### formatWeek(date)

> — 星期几。

```ts
formatWeek(new Date()); // "星期三"
```

### 数字与货币格式化

---

#### formatRmb(value, options)

> — 货币格式化（人民币）。`options` 固定为 `{ type: "zh-CN", currency: "CNY" }`。

```ts
formatRmb(1234.56, { type: "zh-CN", currency: "CNY" }); // "¥1,234.56"
```

#### formatNum(value)

> — 千位分隔符。

```ts
formatNum(1234567); // "1,234,567"
```

#### percentCN(value, digit)

> — 百分比格式化（`value` 为比例小数，`digit` 为小数位数，默认 `0`）。

```ts
percentCN(0.1234, 2); // "12.34%"
percentCN(0.25);      // "25%"
```

#### compactEN(value)

> — 大数简化（英文缩写）。

```ts
compactEN(12345);   // "12K"
compactEN(1000000); // "1M"
```

#### compactCN(value)

> — 大数简化（中文缩写）。

```ts
compactCN(12345); // "1.2万"
```

#### signed(value, digit)

> — 带正负号显示（正数强制 `+`，负数 `-`；`digit` 默认 `0`）。

```ts
signed(42, 1);  // "+42.0"
signed(-3.2, 1); // "-3.2"
```

### 字符串处理（样式/转换/脱敏）

---

#### maskPhone(phone)

> — 手机号脱敏（隐藏中间 4 位）。

```ts
maskPhone("13812345678"); // "138****5678"
```

#### spacePhone(phone)

> — 手机号空格分隔（`3 4 4` 规则）。

```ts
spacePhone("13812345678"); // "138 1234 5678"
```

#### capitalize(str)

> — 每个单词首字母大写。

```ts
capitalize("hello world"); // "Hello World"
```

#### kebabToCamel(str)

> — 短横线转小驼峰。

```ts
kebabToCamel("hello-world"); // "helloWorld"
```

#### camelToKebab(str)

> — 驼峰转短横线。

```ts
camelToKebab("helloWorld"); // "hello-world"
```

#### toCamel(str)

> — 下划线转驼峰。

```ts
toCamel("hello_world"); // "helloWorld"
```

#### firstUpper(str)

> — 首字母大写。

```ts
firstUpper("hello"); // "Hello"
```

#### firstLower(str)

> — 首字母小写。

```ts
firstLower("Hello"); // "hello"
```

#### reverse(str)

> — 反转字符串（按码点，正确处理 emoji）。

```ts
reverse("hello"); // "olleh"
```

#### trimAll(str)

> — 去除所有空白字符（含换行/制表符）。

```ts
trimAll(" h e l lo "); // "hello"
```

#### truncate(str, max, suffix?)

> — 超长文本截断（`max` 为含后缀的最大长度，`suffix` 默认 `"..."`）。

```ts
truncate("Hello World", 8); // "Hello..."
```

#### truncateByWords(str, max, suffix?)

> — 按字符数截断（中文按一个字计，更友好）。

```ts
truncateByWords("你好世界欢迎你", 4); // "你好世界..."
```

### 存储

> ⚠️ 以下函数依赖 `localStorage`，仅浏览器环境可用。

---

#### localGet\<T\>(key)

> — 获取 localStorage（自动 `JSON.parse`；非 JSON 内容原样返回字符串；键不存在返回 `null`）。

```ts
localGet("user"); // { name: '张三' }
```

#### localSet(key, value)

> — 设置 localStorage（自动 `JSON.stringify` 序列化）。

```ts
localSet("user", { name: "张三" });
```

#### localRm(key)

> — 移除指定 localStorage。

```ts
localRm("user");
```

#### localClear()

> — 清除所有 localStorage。

```ts
localClear();
```

### 拷贝

---

#### deepClone(obj)

> — 递归深拷贝（支持 Date / RegExp / Map / Set / 循环引用）。

```ts
deepClone({ a: 1, b: { c: 2 } });
```

#### deepCloneWithJSON(obj)

> — JSON 深拷贝（仅 JSON 安全类型，会丢失 Date / Map / Set / function 等）。

```ts
deepCloneWithJSON({ a: 1 });
```

#### structClone(obj, options?)

> — 基于原生 `structuredClone` 的深拷贝（不支持函数 / Symbol；需 Node 17+ / 现代浏览器）。

```ts
structClone({ a: 1, b: { c: 2 } });
```

#### shallowClone(obj)

> — 浅拷贝（仅第一层，嵌套对象仍为引用共享）。

```ts
shallowClone({ a: 1, b: { c: 2 } });
```

### 数组

---

#### unique(arr)

> — Set 去重（按 `===` 严格相等）。

```ts
unique([1, 2, 2, 3]); // [1, 2, 3]
```

#### uniqueByKey(arr, key)

> — 对象数组按 key 去重（保留首次出现）。

```ts
uniqueByKey([{ id: 1 }, { id: 1 }], "id");
```

#### sortNumAsc(arr)

> — 数值升序（不修改原数组）。

```ts
sortNumAsc([3, 1, 2]); // [1, 2, 3]
```

#### sortNumDesc(arr)

> — 数值降序（不修改原数组）。

```ts
sortNumDesc([1, 3, 2]); // [3, 2, 1]
```

#### sortByKey(arr, key, order?)

> — 对象数组按数值属性排序（`order` 默认 `"asc"`，可选 `"desc"`）。

```ts
sortByKey([{ age: 30 }, { age: 20 }], "age");
sortByKey([{ age: 30 }, { age: 20 }], "age", "desc");
```

#### toArray(arrayLike)

> — 类数组 / 可迭代对象转数组。

```ts
toArray(document.querySelectorAll("div"));
```

#### mergeArrays(...arrays)

> — 合并多个数组。

```ts
mergeArrays([1, 2], [3, 4], [5]); // [1, 2, 3, 4, 5]
```

#### flatten(arr, depth?)

> — 多维数组扁平化到指定层级（默认 1 层，传 `Infinity` 完全展开）。

```ts
flatten([1, [2, [3, 4]], 5]); // [1, 2, [3, 4], 5]
flatten([1, [2, [3, 4]], 5], Infinity); // [1, 2, 3, 4, 5]
```

#### arrFind(arr, key, value)

> — 对象数组中按 key-value 查找第一个匹配项。

```ts
arrFind([{ id: 1 }, { id: 2 }], "id", 2); // { id: 2 }
```

#### groupBy(arr, key)

> — 对象数组按指定属性分组。

```ts
groupBy([{ type: "fruit" }, { type: "vegetable" }], "type");
// => { fruit: [...], vegetable: [...] }
```

#### filterEmptyValues(obj)

> — 移除对象中值为空（`null` / `undefined` / 空字符串）的属性。

```ts
filterEmptyValues({ a: 1, b: "", c: null }); // { a: 1 }
```

#### createRange(length, mapFn?)

> — 快速生成范围数组（省略 `mapFn` 时返回索引序列）。

```ts
createRange(5); // [0, 1, 2, 3, 4]
createRange(3, (i) => i * 2); // [0, 2, 4]
```

### Cookie

> ⚠️ 以下函数操作 `document.cookie`，仅浏览器环境可用。

---

#### setCookie(name, value, days?)

> — 设置 Cookie。`days` 默认 `0`（会话级，关闭浏览器即失效）；负数立即过期。名称与值会自动 `encodeURIComponent`。

```ts
setCookie("token", "abc123", 30); // 30 天后过期
setCookie("theme", "dark");       // 会话级 Cookie
```

#### getCookie(name)

> — 获取 Cookie（值自动 `decodeURIComponent`；不存在返回 `null`）。

```ts
getCookie("token"); // "abc123"
```

#### delCookie(name)

> — 删除 Cookie（通过设置过期时间为过去实现）。

```ts
delCookie("token");
```

### 浏览器

> ⚠️ 以下函数依赖 `window` / `document` / `navigator` 等浏览器 API，仅浏览器环境可用。

---

#### getUrlParams(url?)

> — 获取 URL 参数对象（省略 `url` 时使用当前页面地址）。

```ts
getUrlParams("?a=1&b=2"); // { a: '1', b: '2' }
```

#### getUrlParam(key, url?)

> — 获取单个 URL 参数（不存在返回 `null`）。

```ts
getUrlParam("a"); // "1"
getUrlParam("a", "?a=1"); // "1"
```

#### toQueryString(params)

> — 对象转 URL 参数字符串（自动编码；忽略 `null` / `undefined`）。

```ts
toQueryString({ a: 1, b: "hello" }); // "a=1&b=hello"
```

#### copyToClipboard(text)

> — 复制文本到剪贴板（优先 `navigator.clipboard`，失败回退 `execCommand`）。返回 `Promise<boolean>`。

```ts
await copyToClipboard("Hello"); // true / false
```

#### downloadFile(content, filename, mimeType?)

> — 下载文件（Blob 方式）。`mimeType` 默认 `"text/plain"`。

```ts
downloadFile("Hello", "hello.txt");
```

#### exportJSON(data, filename?)

> — 导出 JSON 为文件。`filename` 默认 `"data.json"`。

```ts
exportJSON({ name: "张三" });
```

#### scrollToTop(behavior?)

> — 滚动到顶部（默认 `"smooth"`，可选 `"auto"` 瞬时）。

```ts
scrollToTop();
```

#### scrollToBottom(behavior?)

> — 滚动到底部（默认 `"smooth"`，可选 `"auto"` 瞬时）。

```ts
scrollToBottom();
```

#### onScroll(callback)

> — 监听页面滚动（rAF 节流，每帧最多回调一次）。返回清理函数。

```ts
const off = onScroll((y) => console.log(y));
// off() 取消监听
```

#### observeIntersection(target, onEnter, onLeave?, options?)

> — 基于 `IntersectionObserver` 监听元素进入 / 离开可视区域，返回清理函数。

```ts
const cleanup = observeIntersection(document.querySelector(".footer")!, () =>
  loadMore(10),
);
```

### 防抖与节流

---

#### debounce(fn, delay?, options?)

> — 防抖：停止调用 `delay` 毫秒后才执行（默认 `300`）。返回的防抖函数带 `cancel()` 方法可取消待执行调用。
> `options.leading`（默认 `false`）/ `options.trailing`（默认 `true`）。

```ts
const fn = debounce((val: string) => console.log(val), 500);
fn("a");
fn("b");
fn("c");
// => 'c'（仅执行最后一次）
fn.cancel(); // 取消尚未执行的调用
```

#### throttle(fn, interval?, options?)

> — 节流：固定间隔内最多执行一次（默认 `300`）。返回的函数带 `cancel()` 方法。
> `options.leading`（默认 `true`）/ `options.trailing`（默认 `true`）。

```ts
const fn = throttle((val: string) => console.log(val), 500);
fn("a");
fn("b");
fn("c");
// => 'a'，500ms 后输出一次 'c'
fn.cancel();
```

### 数学

---

#### clamp(value, min, max)

> — 将值限制在 `[min, max]` 闭区间内（自动纠正 `min` / `max` 顺序）。

```ts
clamp(5, 1, 10);  // 5
clamp(0, 1, 10);  // 1
clamp(20, 1, 10); // 10
```

#### randomInt(min, max)

> — 生成 `[min, max]` 闭区间内的随机整数（含两端；自动纠正顺序）。

```ts
randomInt(1, 10); // 7（随机，范围 1~10 含两端）
```

#### randomFloat(min, max)

> — 生成 `[min, max)` 区间内的随机浮点数（含 `min`，不含 `max`；自动纠正顺序）。

```ts
randomFloat(0, 1); // 0.374...（随机，范围 [0, 1)）
```

#### round(value, decimals?)

> — 四舍五入到指定小数位（默认 `0` 位）。

```ts
round(3.14159, 2); // 3.14
round(3.6);        // 4
```

#### sum(arr)

> — 数组求和（空数组返回 `0`）。

```ts
sum([1, 2, 3]); // 6
```

#### average(arr)

> — 数组平均值（空数组返回 `NaN`）。

```ts
average([1, 2, 3]); // 2
```

#### inRange(value, min, max)

> — 判断数值是否在 `[min, max]` 闭区间内（自动纠正顺序）。

```ts
inRange(5, 1, 10); // true
inRange(0, 1, 10); // false
```

#### lerp(start, end, t)

> — 线性插值，按比例 `t` 取 `start` 到 `end` 之间的值（`t` 通常取 `[0, 1]`）。

```ts
lerp(0, 100, 0.5); // 50
lerp(0, 100, 0);   // 0
lerp(0, 100, 1);   // 100
```

### 字符串（生成 / 转义 / 安全）

---

#### randomString(length?)

> — 生成指定长度的随机字母数字字符串（默认 8 位）。

```ts
randomString(6); // "aB3xY9"
```

#### uuid()

> — 生成 UUID v4（符合 RFC 4122）。

```ts
uuid(); // "550e8400-e29b-41d4-a716-446655440000"
```

#### escapeHtml(str)

> — 转义 HTML 特殊字符（`&` `<` `>` `"` `'`），防 XSS。

```ts
escapeHtml('<div class="a">&</div>');
// => '&lt;div class=&quot;a&quot;&gt;&amp;&lt;/div&gt;'
```

#### unescapeHtml(str)

> — 反转义 HTML 实体。

```ts
unescapeHtml("&lt;div&gt;hello&lt;/div&gt;");
// => '<div>hello</div>'
```

#### stripHtml(str)

> — 去除字符串中的 HTML 标签。

```ts
stripHtml("<p>hello</p>"); // "hello"
```

#### ensurePrefix(str, prefix)

> — 确保字符串以指定前缀开头（若没有则添加）。

```ts
ensurePrefix("world", "hello-"); // "hello-world"
ensurePrefix("hello-world", "hello-"); // "hello-world"
```

#### ensureSuffix(str, suffix)

> — 确保字符串以指定后缀结尾（若没有则添加）。

```ts
ensureSuffix("hello", ".txt"); // "hello.txt"
```

#### removePrefix(str, prefix)

> — 移除字符串的前缀（若存在）。

```ts
removePrefix("hello-world", "hello-"); // "world"
```

#### removeSuffix(str, suffix)

> — 移除字符串的后缀（若存在）。

```ts
removeSuffix("hello.txt", ".txt"); // "hello"
```

#### byteSize(str)

> — 获取字符串的 UTF-8 字节长度（中文约 3 字节/字）。

```ts
byteSize("hello"); // 5
byteSize("你好");  // 6
```

#### maskName(name)

> — 姓名脱敏（保留首字，其余替换为 `*`）。

```ts
maskName("张三");    // "张*"
maskName("张三丰");  // "张**"
maskName("欧阳娜娜"); // "欧***"
```

### 格式校验

---

#### checkCardNo(value)

> — 校验身份证号码（支持 15 / 18 位，末位可为 `X`；仅校验格式，不校验校验位真伪）。

```ts
checkCardNo("110101199003074519"); // true
checkCardNo("1234567890abcdef");  // false
```

#### isEmail(value)

> — 校验是否为邮箱地址。

```ts
isEmail("test@example.com"); // true
isEmail("invalid");          // false
```

#### isTel(value)

> — 校验是否为国内手机号（1 开头、第二位 3–9、共 11 位；接受字符串或数字）。

```ts
isTel("13812345678"); // true
isTel("12012345678"); // false
```

---

## ❓ 常见问题

**Q：和 lodash 比，有什么区别？**
A：fnvault 定位是「轻量、零依赖、按需引入」的小工具集合，适合不想为几个函数引入 lodash 重型依赖的场景。如果你需要函数式编程、集合高阶操作等完整能力，仍可使用 lodash。

**Q：如何只打包我用到的函数？**
A：直接按名 `import { xxx } from "fnvault"` 即可，打包器会 Tree-shaking 掉未引用的函数，无需额外配置。

**Q：能否在 Node 中使用？**
A：纯逻辑函数（类型判断、格式化、数组、数学、字符串生成/转义、校验等）在 Node 中可用；涉及 `localStorage` / `document` / `window` / `navigator` 的函数（见上方「仅浏览器环境的函数」）只能在浏览器中使用。

**Q：支持 TypeScript 吗？**
A：支持，自带 `.d.ts` 类型声明，`is*` 系列为类型守卫，可在条件判断中自动收窄类型。

**Q：ES5 / IE11 能用吗？**
A：不能直接使用，需通过 Babel 等工具对 `node_modules/fnvault` 二次编译并补充 polyfill。

---

## 📄 许可证

[MIT](https://opensource.org/licenses/MIT) © newborn_calf

- 源码仓库：<https://github.com/Libao-Jun/fnvault>
- 问题反馈：<https://github.com/Libao-Jun/fnvault/issues>
