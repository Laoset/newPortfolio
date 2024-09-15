import Link from 'next/link';
export default function NotFound() {
  return (
    <main className='min-h-screen min-w-full from-[#030a14] dark:to-[#161b21] bg-gradient-to-b '>
      <div className='flex h-screen flex-col items-center justify-center text-[#ffedd5] gap-12'>
        <p className='w-auto title text-[3rem] sm:text-[4rem] lg:text-[5rem] 2xl:text-[6rem] text-shadow-pink  glitchAnimationTitle '>
          {/* <span>Page not found</span> */}
          Page not found
          {/* <span>Page not found</span> */}
        </p>
        <Link
          href='/'
          className='w-full title text-[2rem] sm:text-[3rem] lg:text-[4rem] text-center'
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
