import { add, sub } from "./stringMath.ts";

export function ackermann_bigint(n: bigint, m: bigint, logging?: boolean): bigint {
  const arr = [n, m];
  while (arr.length > 1) {
    if (logging)
      console.log(bigintArrToString(arr));
    arr.push(...a_bigint(...(arr.splice(arr.length - 2, 2) as [bigint, bigint])));
  }
  return arr[0];
}

function bigintArrToString(arr: bigint[]): string {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    if (i < arr.length - 1) {
      str += `a(${arr[i]}, `
      continue;
    }
    str += arr[i];
  }
  return str.padEnd(str.length + (arr.length - 1), ")");
}

function a_bigint(n: bigint, m: bigint): bigint[] {
  if (n === 0n)
    return [m + 1n];
  if (m === 0n)
    return [n - 1n, 1n];
  return [n - 1n, n, m - 1n];
}

export function ackermann_string(n: number, m: number, logging?: boolean): string {
  let str = toAString(n, m);
  while (str.includes("a")) {
    if (logging) console.log(str);
    let innerA = str.substring(str.lastIndexOf("a"));
    innerA = innerA.substring(0, innerA.indexOf(")") + 1);
    str = str.substring(0, str.lastIndexOf("a")) + a_string(innerA) + str.substring(str.lastIndexOf("a") + innerA.length);
    // break;
  }
  return str;
}

function toAString(n: string | number, m: string | number): string {
  return `a(${n}, ${m})`;
}

function a_string(str: string): string {
  const n = str.substring(2, str.indexOf(",")).trim();
  const m = str.substring(str.indexOf(",") + 1, str.length - 1).trim();
  // console.log({ n, m });
  if (n === "0")
    return add(m, "1");
  if (m === "0")
    return toAString(sub(n, "1"), "1");
  // console.log(m, "-", 1);
  // console.log(sub(m, "1"));
  return toAString(sub(n, "1"), toAString(n, sub(m, "1")));
}

export function ackermann_simple(n: number, m: number): number {
  if (n === 0)
    return m + 1;
  if (m === 0)
    return ackermann_simple(n - 1, 1);
  return ackermann_simple(n - 1, ackermann_simple(n, m - 1));
}

export default ackermann_bigint;