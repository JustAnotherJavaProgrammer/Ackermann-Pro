console.log(ackermann(5, 3));
console.log(597 + 1109);
console.log(add("597", "1109"));

function ackermann(n, m) {
  let str = toAString(n, m);
  while (str.includes("a")) {
    let innerA = str.substring(str.lastIndexOf("a"));
    innerA = innerA.substring(0, innerA.indexOf(")") + 1);
    str = str.substring(0, str.lastIndexOf("a")) + a(innerA) + str.substring(str.lastIndexOf("a") + innerA.length);
    break;
  }
  return str;
}

function toAString(n, m) {
  return "a(" + n + ", " + m + ")";
}

function a(str) {
  const n = str.substring(2, str.indexOf(",")).trim();
  const m = str.substring(str.indexOf(",") + 1, str.length).trim();
  console.log({ n, m });
  return str;
}

function add(a, b) {
  let u = repeat("0", a.length);
  let i = 1;
  let result = a;
  while (i <= result.length && (u > 0 || i <= 1)) {
    console.log("u: " + u);
    console.log("result: " + result);
    const addDigitResult = addDigit(result[result.length - i], b[b.length - i]);
    result[length - i] = addDigitResult.dig;
    u = add(u, addDigitResult.u.toString() + repeat("0", i));
    i++;
  }
  if (b.length > result.length)
    result = b.substring(0, b.length-result.length);
  return add(result + u);
}

function repeat(str, num) {
  let result = "";
  for (let i = 0; i < num; i++) {
    result += str;
  }
  return result;
}

function addDigit(digA, digB) {
  console.log({digA, digB})
  const a = parseInt(digA);
  const b = parseInt(digB);
  const sum = a + b;
  return { dig: sum % 10, u: Math.floor(sum / 10) };
}

function ackermann_simple(n, m) {
  if (n === 0)
    return m + 1;
  if (m == 0)
    return ackermann_simple(n - 1, 1);
  return ackermann_simple(n - 1, ackermann_simple(n, m - 1));
}