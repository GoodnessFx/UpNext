import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

function isValidHttpUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function Settings() {
  const { config, setConfig } = useAppContext();

  const [apiBaseUrl, setApiBaseUrl] = useState<string>(config.apiBaseUrl);
  const [walletConnectProjectId, setWalletConnectProjectId] = useState<string>(
    config.walletConnectProjectId,
  );
  const [preferredChainId, setPreferredChainId] = useState<string>(
    String(config.preferredChainId),
  );

  const normalizedApi = useMemo(() => apiBaseUrl.trim().replace(/\/+$/, ""), [apiBaseUrl]);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Configure real integrations. This UI does not ship demo markets.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setApiBaseUrl(config.apiBaseUrl);
            setWalletConnectProjectId(config.walletConnectProjectId);
            setPreferredChainId(String(config.preferredChainId));
            toast.message("Reset to saved settings.");
          }}
        >
          Reset
        </Button>
      </div>

      <div className="mt-6 grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Backend API</CardTitle>
            <CardDescription>
              Required for discover feed, campaign pages, dashboards, and payment intents.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="apiBaseUrl">API base URL</Label>
              <Input
                id="apiBaseUrl"
                inputMode="url"
                placeholder="https://api.upnext.com"
                value={apiBaseUrl}
                onChange={(e) => setApiBaseUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Must be an absolute URL. Example: <span className="font-mono">https://api.upnext.com</span>
              </p>
            </div>
            <Button
              onClick={() => {
                if (!normalizedApi) {
                  setConfig({ apiBaseUrl: "" });
                  toast.success("API URL cleared.");
                  return;
                }
                if (!isValidHttpUrl(normalizedApi)) {
                  toast.error("Invalid API URL. Use http(s)://…");
                  return;
                }
                setConfig({ apiBaseUrl: normalizedApi });
                toast.success("API URL saved.");
              }}
            >
              Save API URL
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wallet</CardTitle>
            <CardDescription>WalletConnect configuration for SIWE and on-chain investing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="wcProjectId">WalletConnect project ID</Label>
              <Input
                id="wcProjectId"
                placeholder="WalletConnect Project ID"
                value={walletConnectProjectId}
                onChange={(e) => setWalletConnectProjectId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chainId">Preferred chain ID</Label>
              <Input
                id="chainId"
                inputMode="numeric"
                placeholder="137"
                value={preferredChainId}
                onChange={(e) => setPreferredChainId(e.target.value)}
              />
            </div>
            <Button
              onClick={() => {
                const cid = Number(preferredChainId);
                if (!Number.isInteger(cid) || cid <= 0) {
                  toast.error("Chain ID must be a positive integer.");
                  return;
                }
                setConfig({ walletConnectProjectId, preferredChainId: cid });
                toast.success("Wallet settings saved.");
              }}
            >
              Save wallet settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Markets</CardTitle>
            <CardDescription>Prediction markets and secondary trading surfaces.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-medium">Enable markets UI</div>
              <div className="text-xs text-muted-foreground">
                Hides market routes if your backend/oracle isn’t ready.
              </div>
            </div>
            <Switch
              checked={config.enableMarkets}
              onCheckedChange={(checked) => {
                setConfig({ enableMarkets: checked });
                toast.success(checked ? "Markets enabled." : "Markets disabled.");
              }}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

