export interface GirlsItem {
  _id: string;
  createdAt: string;
  desc: string;
  publishedAt: string;
  source: string;
  type: string;
  url: string;
  used: boolean;
  who: string;
}

export interface GirlsData {
  error: boolean;
  results: GirlsItem[];
}

export interface State {
  isLoading: boolean;
  isLoadingMore: boolean;
  hasError: boolean;
  pageIndex: number;
  data: GirlsItem[] | never[];
}

