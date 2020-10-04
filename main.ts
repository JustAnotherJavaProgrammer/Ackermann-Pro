import { add, sub } from "./stringMath.ts";

console.log(ackermann(5, 3));

function ackermann(n: number, m: number): string {
  let str = toAString(n, m);
  while (str.includes("a")) {
    console.log(str);
    let innerA = str.substring(str.lastIndexOf("a"));
    innerA = innerA.substring(0, innerA.indexOf(")") + 1);
    str = str.substring(0, str.lastIndexOf("a")) + a(innerA) + str.substring(str.lastIndexOf("a") + innerA.length);
    // break;
  }
  return str;
}

function toAString(n: string | number, m: string | number): string {
  return `a(${n}, ${m})`;
}

function a(str: string): string {
  const n = str.substring(2, str.indexOf(",")).trim();
  const m = str.substring(str.indexOf(",") + 1, str.length-1).trim();
  // console.log({ n, m });
  if (n === "0")
    return add(m, "1");
  if (m === "0")
    return toAString(sub(n, "1"), "1");
  // console.log(m, "-", 1);
  // console.log(sub(m, "1"));
  return toAString(sub(n, "1"), toAString(n, sub(m, "1")));
}

function ackermann_simple(n: number, m: number): number {
  if (n === 0)
    return m + 1;
  if (m === 0)
    return ackermann_simple(n - 1, 1);
  return ackermann_simple(n - 1, ackermann_simple(n, m - 1));
}