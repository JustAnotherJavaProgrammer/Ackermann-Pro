# Ackermann-Pro
**Calculate the the value of ackermann(n, m) for arbitrarily large integers**

### Command line usage
#### Installation
You can use this script directly via Deno. To do that, first install Deno by following the instructions listed at [deno.land](https://deno.land/).

You can now enter the following command in your terminal to automatically install Ackermann-Pro and add it to your PATH:
```
deno install -n ackermann https://raw.githubusercontent.com/JustAnotherJavaProgrammer/Ackermann-Pro/master/console.ts
```

#### Command line options
The Ackermann-Pro command line can be used in this way:
```
ackermann [n] [m] OPTIONS
```
Valid options are:
* `-logging`, `-l`: enable logging of intermediate steps

### What is included
#### String math
`stringMath.ts` contains code to perform simple arithmetic operations (currently only addition and subtraction) and some checks on integers represented as Base-10 strings. 
~This might be helpful if you are working with numbers that are too large for even `BigInt`s.~ This is to be seen as a proof of concept.

**Note:** The functions contained in `stringMath.ts` aren't well-optimized and computationally expensive. Avoid using them if `BigInt` fits your needs (it should; learn more about `BigInt`s at [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#BigInt_type)).
#### Three implementations of the ackermann function
1. A recursive, `Number`-based one: This version is a very simple implementation, which will quickly reach its limits by reaching the [recursion limit](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Too_much_recursion) of the JavaScript runtime.
1. A non-recursive, computationally expensive, `String`-based one: This implementation treats numbers as `String`s, which allows for larger numbers and eliminates the need for recursion by also representing the current state of the computation as a `String`.
1. A non-recursive, less computationally expensive, `BigInt`-`Array`-based on (used in the command line & exported by default): This implementation represents the current state of the computation as an `Array` of `BigInt`s, which results in the largest representable number values and less RAM-usage.