export interface StoreType {
  id: number;
  /**
   * 업소 번호
   */
  phone?: string | null;
  /**
   * 업소 주소
   */
  address?: string | null;
  /**
   * 위도
   */
  lat?: string | null;
  /**
   * 경도
   */
  lng?: string | null;
  /**
   * 업소명
   */
  name?: string | null;
  /**
   * 업태명
   */
  category?: string | null;
  /**
   * 업종명
   */
  storeType?: string | null;
  // 식품인증 구분
  foodCertifyName?: string | null;
  likes?: LikeInterface[];
}

export interface LikeInterface {
  id: number;
  storeId: number;
  userId: number;
  store?: StoreType;
}

export interface LikeApiResponse {
  data: LikeInterface[];
  totalPage: number;
  page: number;
}

export interface StoreApiResponse {
  data: StoreType[];
  totalPage: number;
  totalCount: number;
  page: number;
}

export interface LocationType {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export interface SearchType {
  q?: string;
  district?: string;
}
