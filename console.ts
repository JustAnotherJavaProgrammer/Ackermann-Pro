import { ackermann, ackermann_simple } from "./ackermann.ts";
console.log("Now running Ackermann-Pro - developed by JustAnotherJavaProgrammer");
const n = parseInt(Deno.args[0], 10);
const m = parseInt(Deno.args[1], 10);
const logging = Deno.args.includes("-l") || Deno.args.includes("--logging");
if (Deno.args.length < 2 || Number.isNaN(n) || Number.isNaN(m)) {
    console.info("usage: ackermann [n] [m] OPTIONS\nValid options are:\n-logging, -l\tenable logging of intermediate steps");
    Deno.exit(1);
}
if (Deno.args[0].includes(".") || Deno.args[1].includes(".") || n < 0 || m < 0) {
    console.error("ERROR: The ackermann function only accepts positive integers.");
    Deno.exit(2);
}

console.log(ackermann(parseInt(Deno.args[0]), parseInt(Deno.args[1]), logging));