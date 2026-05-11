export interface Customer {
  id: string;
  name: string;
  stampCount: number;
  visitCount: number;
  lastVisitDate: string | null;
  rewardUsed: boolean;
}

export interface CustomerInput {
  name: string;
}
