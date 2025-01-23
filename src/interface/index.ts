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
  foodCertifyName?: string | null;
}

export interface StoreApiResponse {
  data: StoreType[];
  totalPage: number;
  totalCount: number;
  page: number;
}
