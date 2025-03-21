import { NextResponse } from 'next/server';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';

import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') as string;
  const limit = searchParams.get('limit') as string;
  const q = searchParams.get('q') as string;
  const district = searchParams.get('district') as string;
  const id = searchParams.get('id') as string;

  const session = await getServerSession(authOptions);

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

    return NextResponse.json(
      {
        page: parseInt(page),
        data: stores,
        totalCount: count,
        totalPage: Math.ceil(count / 10),
      },
      { status: 200 }
    );
  } else {
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

    return NextResponse.json(id ? stores[0] : stores, { status: 200 });
  }
}

export async function POST(req: Request) {
  const formData = await req.json();

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

  return NextResponse.json(result, { status: 200 });
}

export async function PUT(req: Request) {
  const formData = await req.json();

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

  return NextResponse.json(result, { status: 200 });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id') as string;

  if (id) {
    const result = await prisma.store.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(result, { status: 200 });
  }
  return NextResponse.json(null, { status: 500 });
}
