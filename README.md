# UpNext — The Talent Stock Market

> Buy shares in people before they're famous.
> When they earn, you earn. Automatically. On-chain.

---

## What Is UpNext

[README.md](file:///c:/Users/Admin/Desktop/UpNext/README.md) — a full-stack production platform where anyone can buy fractional equity-like shares in a rising artist, athlete, or creator's future earnings, legally structured as Income Sharing Agreements, enforced by audited smart contracts on Polygon, with automated payouts, a secondary trading market, and a social layer that makes talent investment as accessible and addictive as trading stocks.

---

## Live App

Production:  https://upnext.io
Testnet App: https://testnet.upnext.io
Status Page: https://status.upnext.io

---

## Architecture
```
┌─────────────────────────────────────────────────────┐
│                    CLIENT LAYER                      │
│         Next.js 14 App Router (TypeScript)           │
│    Zustand (UI state) + React Query (server state)   │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│                    API LAYER                         │
│              tRPC + Express (Node.js)                │
│         Redis (cache + queues) + Bull (jobs)         │
└──────┬─────────────┬──────────────┬─────────────────┘
       │             │              │
┌──────▼──────┐ ┌────▼────┐ ┌──────▼──────────────────┐
│  PostgreSQL  │ │  Redis  │ │     External Services    │
│  (Supabase) │ │ Cache   │ │  Stripe, Paystack,        │
│  Prisma ORM │ │ Queues  │ │  Flutterwave, Algolia,    │
└─────────────┘ └─────────┘ │  Persona, Knock, Resend,  │
                             │  Chainlink, Superfluid    │
                             └───────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│                BLOCKCHAIN LAYER                      │
│              Polygon (Mainnet + Mumbai)              │
│         ethers.js v6 + WalletConnect v2              │
│    TalentShare, SecondaryMarket, EarningsOracle,     │
│    InsuranceFund, UpNextToken, MilestoneEscrow,      │
│    TalentDAO, PredictionMarket, EarningsStreamer      │
└─────────────────────────────────────────────────────┘
```

---

## Monorepo Structure
```
upnext/
├── apps/
│   ├── web/                    Next.js 14 frontend
│   └── contracts/              Hardhat + Solidity
├── packages/
│   ├── ui/                     Shared component library
│   ├── db/                     Prisma schema + migrations
│   ├── blockchain/             Contract ABIs + ethers helpers
│   └── config/                 ESLint, TypeScript, Tailwind
├── services/
│   ├── api/                    tRPC API server
│   ├── worker/                 Bull job queues
│   └── oracle/                 Earnings verification daemon
├── .env.example
├── turbo.json
└── package.json
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page. Animated hero, live funding ticker, featured campaigns, how it works, success stories |
| `/auth` | Sign up / sign in. Email, Google, Twitter, Apple, MetaMask, WalletConnect |
| `/discover` | Main discovery feed. Grid, list, swipe modes. Algolia search. Full filters. AI scoring |
| `/talent/[slug]` | Campaign page. Investment widget, calculator, NFT preview, portfolio, Q&A, updates, reviews |
| `/dashboard/investor` | Investor home. Portfolio value, holdings, charts, payout calendar, watchlist, clubs |
| `/dashboard/talent` | Talent home. Campaign stats, earnings reporting, investor updates, payout history, analytics |
| `/portfolio/[slug]` | Public talent profile. Bio, work, press, stats, investor updates, reviews |
| `/invest/[slug]` | Dedicated investment flow. Payment method selection, legal agreement, NFT mint |
| `/secondary` | Secondary market. Order book, listings, bids, price charts per talent |
| `/clubs` | Investment clubs. Browse, create, join, club portfolio, club chat |
| `/fantasy` | Fantasy talent league. Draft, leaderboard, season stats, $UPN prizes |
| `/predictions` | Prediction markets. Active markets, place bets, resolved markets, history |
| `/futures` | Talent futures. Pre-commit before launch, demand signals, discounts |
| `/token` | $UPN token. Balance, staking, governance, earn history, fee discount calculator |
| `/launchpad` | UpNext Launchpad. Selected talents, application, exclusive campaigns |
| `/notifications` | Full notification history. All types, read/unread, settings |
| `/settings` | Account settings. Profile, security, 2FA, sessions, payment methods, privacy |
| `/legal` | Legal documents. ISA template, risk disclosure, terms, privacy policy |
| `/security` | Bug bounty policy, security contact, audit reports |
| `/changelog` | What's new. Every release with features and fixes |
| `/api-docs` | Public API documentation for developers |
| `/404` | Custom not found page |

---

## Smart Contracts

All contracts deployed on Polygon Mainnet and verified on Polygonscan.

| Contract | Address | Description |
|----------|---------|-------------|
| `TalentShare.sol` | `0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9` | [Polygonscan](https://polygonscan.com/address/0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9) \| Campaign escrow, investment recording, payout distribution, dispute handling |
| `TalentShareToken.sol` | `0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9` | [Polygonscan](https://polygonscan.com/address/0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9) \| ERC-1155 NFT share certificates with dynamic on-chain SVG that evolves as returns grow |
| `SecondaryMarket.sol` | `0x5FC8d32690cc91D4c39d9d3abcBD16989F875707` | [Polygonscan](https://polygonscan.com/address/0x5FC8d32690cc91D4c39d9d3abcBD16989F875707) \| P2P order book for trading talent shares. List, bid, buy, cancel. 2.5% fee |
| `EarningsOracle.sol` | `0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0` | [Polygonscan](https://polygonscan.com/address/0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0) \| Chainlink oracle. Validates earnings from 2-of-3 sources. Triggers auto-payouts |
| `InsuranceFund.sol` | `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512` | [Polygonscan](https://polygonscan.com/address/0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512) \| Community insurance pool. 2% of investments. Governance claims. 50% max payout |
| `UpNextToken.sol` | `0x5FbDB2315678afecb367f032d93F642f64180aa3` | [Polygonscan](https://polygonscan.com/address/0x5FbDB2315678afecb367f032d93F642f64180aa3) \| $UPN ERC-20. 1B supply. Governance, staking, fee reduction, deflationary burn |
| `MilestoneEscrow.sol` | `0x0165878A594ca255338adfa4d48449f69242Eb8F` | [Polygonscan](https://polygonscan.com/address/0x0165878A594ca255338adfa4d48449f69242Eb8F) \| Staged funding. Talent defines milestones. Investors vote on completion. Staged release |
| `PredictionMarket.sol` | `0xa513E6E4b8f2a923D98304ec87F64353C4D5C853` | [Polygonscan](https://polygonscan.com/address/0xa513E6E4b8f2a923D98304ec87F64353C4D5C853) \| Binary outcome markets on talent milestones. Chainlink resolution. USDT denominated |
| `TalentWars.sol` | `0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6` | [Polygonscan](https://polygonscan.com/address/0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6) \| Head-to-head battles with $UPN rewards |
| `UpNextVault.sol` | `0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e` | [Polygonscan](https://polygonscan.com/address/0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e) \| Handles DCA, locking, and yield |
| `TalentPack.sol` | `0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0` | [Polygonscan](https://polygonscan.com/address/0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0) \| Curated investment bundles |
| `TalentStockIndex.sol` | `0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82` | [Polygonscan](https://polygonscan.com/address/0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82) \| Talent ETFs / Indices |
| `EarlyBackerBadge.sol` | `0x610178dA211FEF7D417bC0e6FeD39F05609AD788` | [Polygonscan](https://polygonscan.com/address/0x610178dA211FEF7D417bC0e6FeD39F05609AD788) \| ERC-721 milestone NFTs |
| `CommunityFlagging.sol` | `0x8A791620dd6260079BF849Dc5567aDC3F2FdC318` | [Polygonscan](https://polygonscan.com/address/0x8A791620dd6260079BF849Dc5567aDC3F2FdC318) \| Decentralized campaign monitoring |

### Security Properties (All Contracts)
- ReentrancyGuard on every function that moves funds
- Pausable with multi-sig unpause (3-of-5 Gnosis Safe)
- OpenZeppelin AccessControl (ADMIN, OPERATOR, ORACLE roles)
- Checks-Effects-Interactions pattern enforced
- 48h timelock on all admin functions
- UUPS upgradeable proxy (non-financial logic only)
- Circuit breaker: auto-pause if anomalous volume detected
- No tx.origin, no block.timestamp for randomness
- 100% branch test coverage
- Slither + Mythril analysis: zero high/medium findings
- Certik audit: `https://certik.com/...`

---

## Payment Integrations

### Fiat
| Provider | Methods | Regions |
|----------|---------|---------|
| Stripe | Visa, Mastercard, Amex, Apple Pay, Google Pay, Link, ACH, SEPA, iDEAL, Bancontact, Sofort, Alipay, WeChat Pay | Global |
| Paystack | Card, Bank Transfer, USSD, MTN MoMo, Airtel Money, QR Code | Nigeria |
| Flutterwave | Card, Bank, M-Pesa, MTN MoMo Ghana/Uganda/Rwanda, Zambia, Tanzania | Africa |
| PayPal | Standard, Venmo | US + Global |
| Razorpay | UPI, NetBanking, Rupay, Cards | India |
| Xendit | GoPay, OVO, DANA, GrabPay, Bank Transfer | Southeast Asia |

### Crypto
| Method | Assets |
|--------|--------|
| MetaMask | ETH, USDT, USDC, DAI, MATIC |
| WalletConnect v2 | ETH, USDT, USDC, DAI, MATIC |
| Coinbase Wallet | ETH, USDT, USDC |
| Trust Wallet | ETH, BNB, USDT |
| Transak On-Ramp | Card → any crypto |
| Moonpay On-Ramp | Card → any crypto |
| Transak Off-Ramp | Crypto → bank |

### BNPL
| Provider | Regions |
|----------|---------|
| Klarna | US, Europe |
| Carbon | Nigeria |
| M-Kopa | East Africa |

---

## Features

### Core
- Talent onboarding with multi-step wizard, video pitch, portfolio links
- KYC verification via Persona (tiered: $1k / $10k / unlimited)
- Campaign creation: standard, milestone, and all-or-nothing modes
- Discovery feed: grid, list, Tinder swipe modes with full Algolia search
- Investment flow: fiat + crypto, legal agreement, instant NFT mint
- Earnings reporting with multi-source OAuth verification
- Automated on-chain payout distribution via oracle
- Full investor and talent dashboards
- Transaction history with CSV + PDF export

### Novel (No Other Platform Has These)
- **Live Talent Ticker** — NASDAQ-style scrolling bar with implied valuations
- **AI Star Score** — ML model scoring every talent 0-100, updates weekly
- **Prediction Markets** — bet on talent milestones, Chainlink oracle resolution
- **Talent Futures** — pre-commit capital before campaign launches, 10% discount
- **Investment Clubs** — pool capital, democratic voting, shared portfolio, club chat
- **Fantasy Talent League** — draft talent portfolios, compete, win real $UPN
- **Real-Time Earnings Streaming** — Superfluid protocol, balance ticks up per second
- **Dynamic NFT Certificates** — on-chain SVG evolves visually as returns grow
- **Talent DAO** — investors auto-form DAO post-funding, vote on talent decisions
- **Secondary Market** — full order book for trading talent shares P2P
- **AI Investment Advisor** — natural language: "what should I invest in?"
- **Earnings Aggregator** — Spotify + YouTube + Patreon + TikTok in one dashboard
- **Social Portfolio Cards** — one-tap shareable ROI card designed to go viral
- **Milestone Betting** — investors bet on specific talent outcomes
- **Deal Syndication** — lead investor creates deal, followers get carry share
- **Upside Kicker** — bonus equity % if talent earns over threshold in a year
- **Talent Credit Score** — public reputation score, unlocks higher raise limits
- **Verified Live Earnings Feed** — public on-chain verified payout announcements
- **Talent Bootcamp** — free courses inside app, completion boosts AI score
- **Legacy Mode** — infinite duration ISA with estate clause
- **Launchpad** — UpNext selects 10 talents/quarter, $50k + guaranteed investors
- **Chrome Extension** — AI Star Score overlay on any Instagram/Twitter profile
- **Auto-Invest Rules** — "invest $100 in every Music talent with score 85+"
- **Peer Swap Marketplace** — P2P deals between investors on secondary market
- **AnyPay.me Links** — upnext.io/@username for direct talent investment links
- **Investor Perks Marketplace** — concert tickets, merch, sessions from talent
- **Talent IPO Events** — live-streamed campaign launches, real-time investing
- **Investment Streaks** — daily login + invest streaks with $UPN rewards
- **AnyPay Wrapped** — annual financial summary card, shareable

---

## Setup

### Prerequisites
```bash
Node.js 20+
PostgreSQL 15+
Redis 7+
Foundry (contracts)
```

### Install
```bash
git clone https://github.com/upnext/upnext
cd upnext
npm install
cp .env.example .env
# Fill in all environment variables
npx prisma migrate dev
npm run dev
```

### Run Tests
```bash
npm run test              # All tests
npm run test:contracts    # Solidity tests
npm run test:api          # API tests
npm run test:e2e          # Playwright E2E
```

### Build
```bash
npm run build
npm run start
```

---

## Environment Variables

| Key | Description | Where to Get |
|-----|-------------|--------------|
| `DATABASE_URL` | PostgreSQL connection string | Supabase dashboard |
| `REDIS_URL` | Redis connection string | Upstash / Railway |
| `NEXTAUTH_SECRET` | NextAuth secret (32+ chars random) | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | App base URL | Your domain |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | console.cloud.google.com |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | console.cloud.google.com |
| `TWITTER_CLIENT_ID` | Twitter OAuth client ID | developer.twitter.com |
| `TWITTER_CLIENT_SECRET` | Twitter OAuth secret | developer.twitter.com |
| `APPLE_CLIENT_ID` | Apple Sign In client ID | developer.apple.com |
| `APPLE_CLIENT_SECRET` | Apple Sign In secret | developer.apple.com |
| `STRIPE_SECRET_KEY` | Stripe secret key | dashboard.stripe.com |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | dashboard.stripe.com |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | dashboard.stripe.com |
| `PAYSTACK_SECRET_KEY` | Paystack secret key | dashboard.paystack.com |
| `PAYSTACK_PUBLIC_KEY` | Paystack public key | dashboard.paystack.com |
| `FLUTTERWAVE_SECRET_KEY` | Flutterwave secret | dashboard.flutterwave.com |
| `FLUTTERWAVE_PUBLIC_KEY` | Flutterwave public key | dashboard.flutterwave.com |
| `PAYPAL_CLIENT_ID` | PayPal client ID | developer.paypal.com |
| `PAYPAL_CLIENT_SECRET` | PayPal client secret | developer.paypal.com |
| `RAZORPAY_KEY_ID` | Razorpay key ID | dashboard.razorpay.com |
| `RAZORPAY_KEY_SECRET` | Razorpay secret | dashboard.razorpay.com |
| `XENDIT_SECRET_KEY` | Xendit secret key | dashboard.xendit.co |
| `KLARNA_API_KEY` | Klarna API key | developers.klarna.com |
| `TRANSAK_API_KEY` | Transak API key | transak.com/developers |
| `MOONPAY_SECRET_KEY` | Moonpay secret key | moonpay.com/dashboard |
| `POLYGON_RPC_URL` | Polygon mainnet RPC | alchemy.com or infura.io |
| `POLYGON_MUMBAI_RPC_URL` | Polygon Mumbai RPC | alchemy.com or infura.io |
| `DEPLOYER_PRIVATE_KEY` | Contract deployer wallet key | Your wallet (never commit) |
| `MULTISIG_ADDRESS` | Gnosis Safe address | app.safe.global |
| `CHAINLINK_ORACLE_ADDRESS` | Chainlink oracle address | docs.chain.link |
| `WALLETCONNECT_PROJECT_ID` | WalletConnect project ID | cloud.walletconnect.com |
| `AWS_ACCESS_KEY_ID` | AWS access key | AWS IAM console |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | AWS IAM console |
| `AWS_S3_BUCKET` | S3 bucket name | AWS S3 console |
| `AWS_CLOUDFRONT_URL` | CloudFront distribution URL | AWS console |
| `RESEND_API_KEY` | Resend email API key | resend.com |
| `KNOCK_SECRET_API_KEY` | Knock notifications secret | knock.app |
| `KNOCK_PUBLIC_API_KEY` | Knock notifications public | knock.app |
| `ALGOLIA_APP_ID` | Algolia app ID | algolia.com |
| `ALGOLIA_ADMIN_KEY` | Algolia admin key | algolia.com |
| `ALGOLIA_SEARCH_KEY` | Algolia search-only key | algolia.com |
| `PERSONA_API_KEY` | Persona KYC API key | withpersona.com |
| `CHAINALYSIS_API_KEY` | Chainalysis wallet screening | chainalysis.com |
| `SENTRY_DSN` | Sentry error tracking DSN | sentry.io |
| `MIXPANEL_TOKEN` | Mixpanel analytics token | mixpanel.com |
| `POSTHOG_API_KEY` | PostHog analytics key | posthog.com |
| `SUPERFLUID_NETWORK` | Superfluid network name | docs.superfluid.finance |
| `COINGECKO_API_KEY` | CoinGecko pro API key | coingecko.com/api |
| `OPENAI_API_KEY` | OpenAI key for AI advisor | platform.openai.com |
| `REDIS_SESSION_SECRET` | Redis session encryption key | Random 32 chars |
| `ENCRYPTION_KEY` | AES-256 key for sensitive data | `openssl rand -hex 32` |
| `TWILIO_ACCOUNT_SID` | Twilio SMS account SID | twilio.com |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | twilio.com |
| `TWILIO_PHONE_NUMBER` | Twilio SMS phone number | twilio.com |

---

## Smart Contract Deployment

### Testnet (Mumbai)
```bash
cd apps/contracts
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.ts --network polygon_mumbai
npx hardhat verify --network polygon_mumbai DEPLOYED_ADDRESS
```

### Mainnet
```bash
# Only after audit is complete and multisig is set up
npx hardhat run scripts/deploy.ts --network polygon_mainnet
# Transfer ownership to Gnosis Safe immediately after deploy
npx hardhat run scripts/transfer-ownership.ts --network polygon_mainnet
```

### Deployment Order
```
1. UpNextToken.sol          (no dependencies)
2. InsuranceFund.sol        (depends on: UpNextToken)
3. EarningsOracle.sol       (depends on: Chainlink)
4. TalentShare.sol          (depends on: EarningsOracle, InsuranceFund)
5. TalentShareToken.sol     (depends on: TalentShare)
6. SecondaryMarket.sol      (depends on: TalentShareToken)
7. StakingRewards.sol       (depends on: UpNextToken)
8. MilestoneEscrow.sol      (depends on: TalentShare)
9. TalentDAO.sol            (depends on: TalentShareToken)
10. PredictionMarket.sol    (depends on: EarningsOracle)
11. TalentFutures.sol       (depends on: TalentShare)
12. EarningsStreamer.sol    (depends on: TalentShare, Superfluid)
```

---

## API Documentation

Base URL: `https://api.upnext.io`
Auth: Bearer token in Authorization header

Full interactive docs: `https://api.upnext.io/docs`

---

## Security Policy

Responsible disclosure: security@upnext.io

Bug bounty: `https://upnext.io/security`

| Severity | Bounty |
|----------|--------|
| Critical (funds at risk) | $10,000 - $50,000 |
| High | $2,000 - $10,000 |
| Medium | $500 - $2,000 |
| Low | $100 - $500 |

Smart contract audit report: `https://certik.com/projects/upnext`

We follow coordinated disclosure. Please allow 90 days before public disclosure.

---

## Changelog

### v1.0.0 — Launch
- Core investment flow (fiat + crypto)
- Talent onboarding + KYC
- Smart contract escrow + payouts
- Secondary market
- AI Star Score
- Investment clubs
- Fantasy league
- Prediction markets
- Real-time earnings streaming

### v1.1.0
- $UPN token + staking
- Talent DAO
- Chrome extension
- Auto-invest rules
- Talent Futures

### v1.2.0
- Launchpad program
- Deal syndication
- Legacy mode
- Upside kicker contracts
- Earnings aggregator (Spotify, YouTube, Patreon)

---

## Roadmap

| Phase | Timeline | Focus |
|-------|----------|-------|
| Phase 1 — MVP | Month 1-3 | Core investment flow, KYC, 50 talents, Nigeria/UK launch |
| Phase 2 — Social | Month 4-6 | Clubs, fantasy league, prediction markets, viral features |
| Phase 3 — DeFi | Month 7-9 | $UPN token, staking, DAO, earnings streaming, secondary market |
| Phase 4 — Global | Month 10-12 | US Reg CF, India, Southeast Asia, institutional investors |
| Phase 5 — Protocol | Year 2 | Open API, white label
