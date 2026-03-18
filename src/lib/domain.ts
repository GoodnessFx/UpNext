export type CampaignCategory =
  | "Music"
  | "Sports"
  | "Art"
  | "Gaming"
  | "Content"
  | "Tech"
  | "Fashion"
  | "Comedy"
  | "Other";

export interface CampaignSummary {
  id: string;
  slug: string;
  talentName: string;
  talentPhotoUrl: string | null;
  category: CampaignCategory;
  minInvestmentUsd: number;
  targetAmountUsd: number;
  totalRaisedUsd: number;
  fundingDeadline: string; // ISO
  investorsCount: number;
  starScore: number; // 0..100
  status: "OPEN" | "FUNDED" | "ACTIVE" | "COMPLETED" | "REFUNDING";
}

export interface DiscoverResponse {
  campaigns: CampaignSummary[];
}

