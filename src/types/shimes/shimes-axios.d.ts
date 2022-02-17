import type { AxiosRequestConfig } from 'axios';
declare module 'axios' {
  interface AxiosRequestConfig {
    isNotIntercept?: boolean;
    isNotTips?: boolean;
    isNotRefreshToken?: boolean;
  }
  export interface AxiosResponse<T = IPageData> {
    code: number;
    msg: string;
    data: T;
    test:string;
    [key: string]: any;
  }

  export interface IPageData {
    current: string;
    list: any[];
    size: string;
    total: string;
    [key: string]: any;
  }

  // 分页设置
  export interface IPagination {
    current: number;
    pageSize: number;
    total: number;
    defaultPageSize?: number;
    disabled?: boolean;
    hideOnSinglePage?: boolean;
    pageSizeOptions?: string[];
    showLessItems?: boolean;
    showQuickJumper?: boolean;
    showSizeChanger?: boolean;
    // eslint-disable-next-line no-unused-vars
    showTotal?: (total: number) => string;
    simple?: boolean;
    size?: 'default' | 'small';
  }
}