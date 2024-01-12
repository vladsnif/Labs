import java.math.BigInteger;
import java.security.SecureRandom;

public class Util {

    private static final SecureRandom secureRandom = new SecureRandom();


    public static BigInteger[] generateSignature(BigInteger hash, BigInteger g, BigInteger p, BigInteger q, BigInteger x) {
        BigInteger r, s, k;
        do {
            k = new BigInteger(q.bitLength(), secureRandom);
            r = g.modPow(k, p).mod(q);
            s = k.modInverse(q).multiply(hash.add(x.multiply(r))).mod(q);
        } while (r.equals(BigInteger.ZERO) || s.equals(BigInteger.ZERO));

        return new BigInteger[]{r, s};
    }

    public static boolean verifySignature(BigInteger hash, BigInteger[] signature, BigInteger g, BigInteger p, BigInteger q, BigInteger y) {
        BigInteger r = signature[0];
        BigInteger s = signature[1];

        if (r.compareTo(BigInteger.ONE) < 0 || r.compareTo(q) >= 0) return false;
        if (s.compareTo(BigInteger.ONE) < 0 || s.compareTo(q) >= 0) return false;

        BigInteger w = s.modInverse(q);
        BigInteger u1 = hash.multiply(w).mod(q);
        BigInteger u2 = r.multiply(w).mod(q);
        BigInteger v = g.modPow(u1, p).multiply(y.modPow(u2, p)).mod(p).mod(q);

        return v.equals(r);
    }

    public static BigInteger[] generateDSAParams(int bitLengthP, int bitLengthQ) {
        BigInteger q = BigInteger.probablePrime(bitLengthQ, secureRandom);
        BigInteger p;
        BigInteger k;

        do {
            k = new BigInteger(bitLengthP - bitLengthQ, secureRandom);
            p = k.multiply(q).add(BigInteger.ONE);
        } while (!p.isProbablePrime(100));

        return new BigInteger[]{p, q};
    }


    public static BigInteger findPrimitiveRoot(BigInteger p, BigInteger q) {
        BigInteger h = BigInteger.valueOf(2);
        BigInteger exponent = p.subtract(BigInteger.ONE).divide(q);

        while (true) {
            BigInteger g = h.modPow(exponent, p);
            if (!g.equals(BigInteger.ONE)) {
                return g;
            }
            h = h.add(BigInteger.ONE);
        }
    }
}
