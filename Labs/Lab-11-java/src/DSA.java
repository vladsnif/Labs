import java.math.BigInteger;
import java.security.SecureRandom;

public class DSA {
    private static final SecureRandom secureRandom = new SecureRandom();

    public static void main(String[] args) {
        int bitLengthP = 1024;
        int bitLengthQ = 160;

        BigInteger[] params = Util.generateDSAParams(bitLengthP, bitLengthQ);
        BigInteger p = params[0];
        BigInteger q = params[1];
        BigInteger g = Util.findPrimitiveRoot(p, q);

        BigInteger x = new BigInteger(bitLengthQ - 1, secureRandom);
        BigInteger y = g.modPow(x, p);

        BigInteger hash = new BigInteger("1206212019512053528979580233526017047056064403458");
        BigInteger[] signature = Util.generateSignature(hash, g, p, q, x);

        boolean isValid = Util.verifySignature(hash, signature, g, p, q, y);
        System.out.println("Чи валідний підпис: " + isValid);
    }
}
