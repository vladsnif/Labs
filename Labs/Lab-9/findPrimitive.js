export function isPrime(n) {
    // Corner cases
    if (n <= 1n)
        return false;
    if (n <= 3n)
        return true;

    // This is checked so that we can skip
    // middle five numbers in below loop
    if (n % 2n === 0n || n % 3n === 0n)
        return false;

    for (let i = 5n; i * i <= n; i = i + 6n)
        if (n % i === 0n || n % (i + 2n) === 0n)
            return false;

    return true;
}

/* Iterative Function to calculate (x^n)%p in
O(logy) */
function power(x, y, p) {
    let res = 1n;     // Initialize result

    x = x % p; // Update x if it is more than or
    // equal to p

    while (y > 0n) {
        // If y is odd, multiply x with result
        if (y & 1n)
            res = (res * x) % p;

        // y must be even now
        y = y >> 1n; // y = y/2
        x = (x * x) % p;
    }
    return res;
}

// Utility function to store prime factors of a number
export function findPrimefactors(s, n) {
    // Print the number of 2s that divide n
    while (n % 2n === 0n) {
        s.add(2n);
        n = n / 2n;
    }

    // n must be odd at this point. So we can skip
    // one element (Note i = i +2)
    for (let i = 3n; i <= BigInt(Math.sqrt(Number(n))); i = i + 2n) {
        // While i divides n, print i and divide n
        while (n % i === 0n) {
            s.add(i);
            n = n / i;
        }
    }

    // This condition is to handle the case when
    // n is a prime number greater than 2
    if (n > 2n)
        s.add(n);
}

// Function to find the smallest primitive root of n
export function findPrimitive(n) {
    let s = new Set();

    // Check if n is prime or not
    if (isPrime(n) === false)
        return -1n;

    // Find the value of Euler Totient function of n
    // Since n is a prime number, the value of Euler
    // Totient function is n-1 as there are n-1
    // relatively prime numbers.
    let phi = n - 1n;

    // Find prime factors of phi and store in a set
    findPrimefactors(s, phi);

    // Check for every number from 2 to phi
    for (let r = 2n; r <= phi; r++) {
        // Iterate through all prime factors of phi.
        // and check if we found a power with value 1
        let flag = false;
        for (let it of s) {

            // Check if r^((phi)/primefactors) mod n
            // is 1 or not
            if (power(r, phi / it, n) === 1n) {
                flag = true;
                break;
            }
        }

        // If there was no power with value 1.
        if (flag === false)
            return r;
    }

    // If no primitive root found
    return -1n;
}
