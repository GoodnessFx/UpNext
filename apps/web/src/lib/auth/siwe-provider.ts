import CredentialsProvider from "next-auth/providers/credentials";
import { SiweMessage } from "siwe";

export const siweProvider = CredentialsProvider({
  id: "siwe",
  name: "Ethereum",
  credentials: {
    message: { label: "Message", type: "text" },
    signature: { label: "Signature", type: "text" },
    csrfToken: { label: "CSRF Token", type: "text" },
  },
  async authorize(credentials, req) {
    try {
      const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"));
      const result = await siwe.verify({
        signature: credentials?.signature || "",
        domain: req.headers?.host || "",
        nonce: credentials?.csrfToken,
      });

      if (result.success) {
        return {
          id: siwe.address,
        };
      }
      return null;
    } catch (e) {
      return null;
    }
  },
});
