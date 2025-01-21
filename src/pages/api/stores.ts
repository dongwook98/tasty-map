import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

import { StoreType } from '@/interface';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreType[]>
) {
  const prisma = new PrismaClient();
  const stores = await prisma.store.findMany({
    orderBy: {
      id: 'asc',
    },
  });

  res.status(200).json(stores);
}
