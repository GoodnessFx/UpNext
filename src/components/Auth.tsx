import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

function useQueryParam(name: string): string | null {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search).get(name), [name, search]);
}

type AuthTab = "signin" | "signup" | "wallet";

function asAuthTab(raw: string | null): AuthTab {
  if (raw === "signup" || raw === "wallet" || raw === "signin") return raw;
  return "signin";
}

export function Auth() {
  const nav = useNavigate();
  const tab = asAuthTab(useQueryParam("tab"));
  const { config } = useAppContext();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>
            Email/password, OAuth, and wallet sign-in are wired through your backend. Configure it first.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={(v) => nav(`/auth?tab=${v}`)} className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="signin" className="flex-1">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex-1">
                Create Account
              </TabsTrigger>
              <TabsTrigger value="wallet" className="flex-1">
                Connect Wallet
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-6">
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!config.apiBaseUrl) {
                    toast.error("Set your API base URL in Settings first.");
                    nav("/settings");
                    return;
                  }
                  toast.error("Sign-in endpoint not configured in this frontend yet.");
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" autoComplete="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" autoComplete="current-password" required />
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button type="submit">Sign In</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => toast.message("OAuth is configured via backend + redirect URLs.")}
                  >
                    Continue with Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => toast.message("OAuth is configured via backend + redirect URLs.")}
                  >
                    Continue with Twitter/X
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => toast.message("OAuth is configured via backend + redirect URLs.")}
                  >
                    Continue with Apple
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-6">
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!config.apiBaseUrl) {
                    toast.error("Set your API base URL in Settings first.");
                    nav("/settings");
                    return;
                  }
                  toast.error("Sign-up endpoint not configured in this frontend yet.");
                }}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full name</Label>
                    <Input id="fullName" autoComplete="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" autoComplete="country-name" placeholder="Nigeria" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupEmail">Email</Label>
                  <Input id="signupEmail" type="email" autoComplete="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupPassword">Password</Label>
                  <Input id="signupPassword" type="password" autoComplete="new-password" required />
                  <p className="text-xs text-muted-foreground">
                    Password strength meter is enforced by backend policy (zxcvbn + breach checks).
                  </p>
                </div>
                <Button type="submit">Create Account</Button>
              </form>
            </TabsContent>

            <TabsContent value="wallet" className="mt-6 space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Wallet sign-in (SIWE)</div>
                <p className="text-sm text-muted-foreground">
                  Requires WalletConnect Project ID and a backend SIWE nonce/session endpoint.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => {
                    if (!config.walletConnectProjectId) {
                      toast.error("Set WalletConnect Project ID in Settings first.");
                      nav("/settings");
                      return;
                    }
                    toast.error("WalletConnect integration not wired in this frontend yet.");
                  }}
                >
                  Connect Wallet
                </Button>
                <Button variant="outline" onClick={() => nav("/settings")}>
                  Open Settings
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}

