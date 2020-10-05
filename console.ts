import { ackermann_bigint } from "./ackermann.ts";
console.log("Now running Ackermann-Pro - developed by JustAnotherJavaProgrammer");
if (Deno.args.length < 2) {
    incorrectUsage();
}
if (Deno.args[0].includes(".") || Deno.args[1].includes(".")) {
    invalidArgumentError();
}
let n = 0n;
let m = 0n;
try {
    n = BigInt(Deno.args[0]);
    m = BigInt(Deno.args[1]);
} catch (e) {
    incorrectUsage();
}
const logging = Deno.args.includes("-l") || Deno.args.includes("--logging");
if (n < 0n || m < 0n) {
    invalidArgumentError();
}
console.log(ackermann_bigint(n, m, logging).toString());

function incorrectUsage() {
    console.info("Usage: ackermann [n] [m] OPTIONS\nValid options are:\n--logging, -l\tenable logging of intermediate steps");
    Deno.exit(1);
}

function invalidArgumentError() {
    console.error("ERROR: The ackermann function only accepts positive integers.");
    Deno.exit(2);
}