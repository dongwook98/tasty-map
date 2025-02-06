import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { LikeInterface, LikeApiResponse } from '@/interface';

interface RequestQueryType {
  page?: string;
  limit?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LikeInterface | LikeApiResponse>
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(401);
  }

  if (req.method === 'POST') {
    const { storeId } = req.body;

    // Like 데이터가 있는지 확인
    let like = await prisma.like.findFirst({
      where: {
        storeId,
        userId: session?.user.id,
      },
    });

    // 만약 이미 찜을 했다면 해당 like 데이터 삭제, 아니라면 생성
    if (like) {
      // 좋아요 삭제
      like = await prisma.like.delete({
        where: {
          id: like.id,
        },
      });
      return res.status(204).json(like);
    } else {
      // 좋아요 생성
      like = await prisma.like.create({
        data: {
          storeId,
          userId: session?.user.id,
        },
      });
      return res.status(201).json(like);
    }
  } else {
    // GET 요청 처리
    const count = await prisma.like.count({
      where: {
        userId: session?.user.id,
      },
    });

    const { page = '1', limit = '10' }: RequestQueryType = req.query;
    const skipPage = parseInt(page) - 1;
    const likes = await prisma.like.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        userId: session?.user.id,
      },
      include: {
        store: true,
      },
      skip: skipPage * parseInt(limit),
      take: parseInt(limit),
    });

    return res.status(200).json({
      data: likes,
      page: parseInt(page),
      totalPage: Math.ceil(count / parseInt(limit)),
    });
  }
}
