import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 返回 4 位的随机字符串
 * @returns
 */
function getStr4() {
  return Math.floor((Math.random() + 1) * 0x10000)
    .toString(16)
    .substring(1);
}

/**
 * 返回指定倍数的 4 位随机字符串
 * @returns
 */
export function getUuid(n = 1, eq = '') {
  const uuid = [];
  for (let i = 0; i < n; i++) {
    uuid.push(getStr4());
  }
  return uuid.join(eq);
}

/**
* 参数处理
*/
export function tansParams(params: Record<string, any>) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value: Record<string, any> | string | null = params[propName];
    const part = encodeURIComponent(propName) + "=";

    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            const params = propName + '[' + key + ']';
            const subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key] as string) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result
}