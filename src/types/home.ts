export interface DataItem {
  _id: string;
  createdAt: string;
  desc: string;
  image?: string[];
  publishedAt: string;
  source: string;
  type: string;
  url: string;
  used: boolean;
  who: string;
}

export interface Data {
  error: boolean;
  results: DataItem[];
}

export interface State {
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  hasError: boolean;
  pageIndex: number;
  data: DataItem[] | never[];
}

