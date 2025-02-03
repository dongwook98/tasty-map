import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

import prisma from '@/lib/prisma';
import { StoreApiResponse, StoreType } from '@/interface';

interface RequestQueryType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
  id?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[] | StoreType | null>
) {
  const {
    page = '',
    limit = '',
    q,
    district,
    id,
  }: RequestQueryType = req.query;
  const session = await getServerSession(req, res, authOptions);

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
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });

    return res.status(200).json(result);
  }

  if (req.method === 'PUT') {
    const formData = req.body;

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

    const result = await prisma.store.update({
      where: {
        id: formData.id,
      },
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });

    return res.status(200).json(result);
  }

  if (req.method === 'DELETE') {
    if (id) {
      const result = await prisma.store.delete({
        where: {
          id: parseInt(id),
        },
      });

      return res.status(200).json(result);
    }
    return res.status(500).json(null);
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
      include: {
        likes: {
          where: session ? { userId: session.user.id } : {},
        },
      },
    });
    res.status(200).json(id ? stores[0] : stores);
  }
}
