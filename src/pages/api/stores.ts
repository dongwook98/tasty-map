import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import { StoreApiResponse, StoreType } from '@/interface';
import axios from 'axios';

interface RequestQueryType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[] | StoreType | null>
) {
  const { page = '', limit = '', q, district }: RequestQueryType = req.query;

  if (req.method === 'POST') {
    const formData = req.body;

    // 카카오 Local API call (주소 -> 좌표)
    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address
      )}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
        },
      }
    );

    const result = await prisma.store.create({
      data: { ...formData, lat: data.documents[0].x, lng: data.documents[0].y },
    });

    return res.status(200).json(result);
  }

  // GET 요청 처리
  if (page) {
    const count = await prisma.store.count();
    const skipPage = parseInt(page) - 1;
    const stores = await prisma.store.findMany({
      orderBy: { id: 'asc' },
      where: {
        name: q ? { contains: q } : {},
        address: district ? { contains: district } : {},
      },
      take: parseInt(limit),
      skip: skipPage * 10,
    });

    res.status(200).json({
      page: parseInt(page),
      data: stores,
      totalCount: count,
      totalPage: Math.ceil(count / 10),
    });
  } else {
    const { id }: { id?: string } = req.query;

    const stores = await prisma.store.findMany({
      orderBy: { id: 'asc' },
      where: {
        id: id ? parseInt(id) : {},
      },
    });
    res.status(200).json(id ? stores[0] : stores);
  }
}
