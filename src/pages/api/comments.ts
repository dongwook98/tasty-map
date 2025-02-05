import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { CommentApiResponse, CommentInterface } from '@/interface';

interface RequestQueryType {
  id?: string;
  page?: string;
  limit?: string;
  storeId?: string;
  user?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommentInterface | CommentApiResponse>
) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'POST') {
    // 댓글 생성 처리
    if (!session?.user) {
      return res.status(401);
    }

    const { storeId, body }: { storeId: number; body: string } = req.body;
    const comment = await prisma.comment.create({
      data: {
        storeId,
        body,
        userId: session.user.id,
      },
    });

    return res.status(200).json(comment);
  } else if (req.method === 'DELETE') {
    // 댓글 삭제 처리
    const { id }: RequestQueryType = req.query;

    if (!session?.user || !id) {
      return res.status(401);
    }

    const result = await prisma.comment.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json(result);
  } else {
    // 댓글 조회 처리
    const {
      page = '1',
      limit = '10',
      storeId = '',
      user = false,
    }: RequestQueryType = req.query;

    const skipPage = parseInt(page) - 1;
    const count = await prisma.comment?.count({
      where: {
        storeId: storeId ? parseInt(storeId) : {},
        userId: user ? session?.user.id : {},
      },
    });

    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        storeId: storeId ? parseInt(storeId) : {},
        userId: user ? session?.user.id : {}, // user 쿼리 파라미터 값이 true면 현재 로그인한 유저의 댓글 가져오기
      },
      skip: skipPage * parseInt(limit),
      take: parseInt(limit),
      include: {
        user: true,
        store: true,
      },
    });

    return res.status(200).json({
      data: comments,
      page: parseInt(page),
      totalPage: Math.ceil(count / parseInt(limit)),
    });
  }
}
