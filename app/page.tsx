import Image from 'next/image'
import HomeMain from '@/components/home/HomeMain';

export default function Home() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-between gap-20 py-24 px-6">
      <HomeMain />
    </section>
  );
}
