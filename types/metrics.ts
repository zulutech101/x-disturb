// store/metrics/types.ts
export interface RevenueCategory {
    name: string;
    revenue: number;
    percentage: number;
  }
  
  export interface RevenueCategoryDetails {
    name: string;
    revenueThisPeriod: number;
    targetRevenue: number;
    percentageOfTarget: number;
  }
  
  export interface RevenueTrendDataset {
    categoryName: string;
    data: number[];
  }
  
  export interface RevenueMetricsResponse {
    selectedPeriodLabel: string;
    dateRange: {
      start: string;
      end: string;
    };
    totalRevenueByCategory: {
      categories: RevenueCategory[];
      overallTotalRevenue: number;
    };
    categoryDetails: RevenueCategoryDetails[];
    revenueTrend: {
      timeUnit: string;
      labels: string[];
      datasets: RevenueTrendDataset[];
    };
  }
  
  export interface UserGrowthMetricsResponse {
    totalUsers: number;
    growthRate: string;
    earliestDate: string;
    currentDate: string;
    monthlyGrowth: Record<string, number>;
  }
  