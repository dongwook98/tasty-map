import { atom } from 'recoil';

import { LocationType, SearchType, StoreType } from '@/interface';

const DEFAULT_LAT = '37.497625203';
const DEFAULT_LNG = '127.03088379';
const DEFAULT_ZOOM = 3;

export const mapState = atom({
  key: 'map',
  default: null,
  dangerouslyAllowMutability: true,
});

export const currentStoreState = atom<StoreType | null>({
  key: 'currentStore',
  default: null,
});

export const locationState = atom<LocationType>({
  key: 'location',
  default: {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
    zoom: DEFAULT_ZOOM,
  },
});

export const searchState = atom<SearchType | null>({
  key: 'search',
  default: null,
});
