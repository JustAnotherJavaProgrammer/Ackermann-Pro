export function add(a: string, b: string): string {
    if (!isNegative(a) && isNegative(b))
        return sub(a, flipSign(b));
    if (isNegative(a) && !isNegative(b))
        return sub(b, flipSign(a));
    if (isNegative(a) && isNegative(b))
        return "-" + add(flipSign(a), flipSign(b));
    let u = 0n;
    let i = 1;
    let result = a;
    if (result.length < b.length)
        result = repeat("0", b.length - a.length) + result;
    if (b.length < result.length)
        b = repeat("0", result.length - b.length) + b;
    while (i <= result.length) {
        // console.log("u:", u);
        // console.log("result:", result);
        const addDigitResult = addDigit(result[result.length - i], b[b.length - i]);
        // console.log("addDigitResult:", addDigitResult)
        result = setCharAt(result, result.length - i, addDigitResult.dig.toString());
        const uString = u.toString();
        const addUResult = addDigit(result[result.length - i], uString[uString.length - 1]);
        // console.log("addUResult:", addUResult);
        result = setCharAt(result, result.length - i, addUResult.dig.toString());
        u = uString.length > 1 ? BigInt(uString.substring(0, uString.length - 1)) : 0n;
        u += BigInt(addDigitResult.u + addUResult.u);
        i++;
    }
    if (u !== 0n)
        result = u.toString() + result;
    return removeLeadingZeroes(result, false);
}

export function sub(a: string, b: string): string {
    if (isNegative(a) && !isNegative(b))
        return "-" + add(flipSign(a), b);
    if (!isNegative(a) && isNegative(b))
        return add(a, flipSign(b));
    if (isNegative(a) && isNegative(b))
        return sub(flipSign(b), flipSign(a));
    {
        const comp = compare(a, b);
        if (comp == 0)
            return "0";
        if (comp < 0)
            return flipSign(sub(b, a));
    }
    let u = 0n;
    let i = 1;
    let result = a;

    if (result.length < b.length)
        result = repeat("0", b.length - a.length) + result;
    if (b.length < result.length)
        b = repeat("0", result.length - b.length) + b;
    while (i <= result.length) {
        // console.log("u:", u);
        // console.log("result:", result);
        const subDigitResult = subDigit(result[result.length - i], b[b.length - i]);
        // console.log("subDigitResult:", subDigitResult)
        result = setCharAt(result, result.length - i, subDigitResult.dig.toString());
        const uString = u.toString();
        const subUResult = subDigit(result[result.length - i], uString[uString.length - 1]);
        // console.log("subUResult:", subUResult);
        result = setCharAt(result, result.length - i, subUResult.dig.toString());
        u = uString.length > 1 ? BigInt(uString.substring(0, uString.length - 1)) : 0n;
        u += BigInt(subDigitResult.u + subUResult.u);
        i++;
    }
    if (u !== 0n)
        result = u.toString() + result + " ERROR";
    return removeLeadingZeroes(result, false);
}

export function repeat(str: string, num: number): string {
    let result = "";
    for (let i = 0; i < num; i++) {
        result += str;
    }
    return result;
}

export function addDigit(digA: string, digB: string): { dig: number, u: number } {
    // console.log({ digA, digB });
    const a = parseInt(digA);
    const b = parseInt(digB);
    const sum = a + b;
    // console.log({ a, b });
    return { dig: sum % 10, u: Math.floor(sum / 10) };
}

export function subDigit(digA: string, digB: string): { dig: number, u: number } {
    // console.log({ digA, digB });
    const a = parseInt(digA);
    const b = parseInt(digB);
    const diff = (a < b ? a + 10 : a) - b;
    // console.log({ a, b, diff });
    return { dig: diff, u: a < b ? 1 : 0 };
}

export function setCharAt(str: string, position: number, char: string): string {
    return str.substring(0, position) + char + str.substring(position + 1);
}

/**
 * Compares two numbers represented as strings
 * 
 * @param a The first number
 * @param b The second number
 * 
 * @returns 0 if a and b are equal, 1 if a is larger than b and -1 if a is smaller than b
 */
export function compare(a: string, b: string): 1 | 0 | -1 {
    // check sign
    if (isNegative(a) && !isNegative(b)) {
        return -1;
    }
    if (!isNegative(a) && isNegative(b)) {
        return 1;
    }
    let changeSign = 1;
    if (isNegative(a) && isNegative(b)) {
        changeSign = -1;
    }
    const cleanA = removeLeadingZeroes(a, true);
    const cleanB = removeLeadingZeroes(b, true);
    if (cleanA === cleanB)
        return 0;
    if (cleanA.length > cleanB.length)
        return (1 * changeSign) as 1 | 0 | -1;
    if (cleanA.length < cleanB.length)
        return (-1 * changeSign) as 1 | 0 | -1;
    // a and b are of equal length, compare digits, starting with the most significant one
    for (let i = 0; i < a.length; i++) {
        const compareResult = compareDigit(cleanA[i], cleanB[i]);
        if (compareResult !== 0) {
            return (compareResult * changeSign) as 1 | -1;
        }
    }
    // a and b must be equal, but that hasn't been detected before (if you reach this part, panic)
    console.error("a and b must be equal, but this hasn't been detected before. PANIK");
    return 0;
}

export function compareDigit(digA: string, digB: string): 1 | 0 | -1 {
    if (digA === digB)
        return 0;
    if (parseInt(digA) > parseInt(digB))
        return 1;
    return -1;
}

export function removeLeadingZeroes(str: string, removeSign: boolean): string {
    str = str.trim();
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== "0" && (!removeSign || str[i] !== "-")) {
            if (removeSign)
                return str.substring(i);
            const shortened = str.substring(i);
            if (shortened.startsWith("-"))
                return "-" + removeLeadingZeroes(shortened, true);
            return shortened;
        }
    }
    return "0";
}

export function isNegative(num: string): boolean {
    return num.trim().startsWith("-");
}

export function removeSign(num: string): string {
    num = num.trim();
    if (num.startsWith("-"))
        return num.substring(1);
    return num;
}

export function flipSign(num: string): string {
    num = num.trim();
    if (num.startsWith("-"))
        return removeLeadingZeroes(num, true);
    return "-" + removeLeadingZeroes(num, false);
}