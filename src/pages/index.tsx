import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <h1>Map Index Page</h1>
      <ul>
        <li>
          <Link href='/stores'>맛집 목록</Link>
        </li>
        <li>
          <Link href='/stores/new'>맛집 생성</Link>
        </li>
        <li>
          <Link href='/stores/1'>맛집 상세 페이지</Link>
        </li>
        <li>
          <Link href='/stores/1/edit'>맛집 수정 페이지</Link>
        </li>
        <li>
          <Link href='/users/login'>로그인 페이지</Link>
        </li>
        <li>
          <Link href='/users/mypage'>마이 페이지</Link>
        </li>
        <li>
          <Link href='/users/likes'>찜 페이지</Link>
        </li>
      </ul>
    </div>
  );
}
