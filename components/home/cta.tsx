'use client'
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';

const HomeCta = () => {
  return (
    <section className="pt-20 flex flex-col gap-9 max-w-4xl text-center">
      <h1 className=" text-5xl lg:text-6xl font-extrabold mx-auto">
        Draft Your <span className="text-primary">Will</span> on the{" "}
        <span className="text-primary">Blockchain</span>
      </h1>
      <p className="text-paragraph max-w-2xl mx-auto">
        Gift your digital assets to family, friends, and your favourite
        blockchain DAOs at a time of your choosing!
      </p>
      <div className="flex justify-center gap-4">
        <Button asChild className="custom-shrink custom-hover">
          <Link href="/">Get Started</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">How Does It Work?</Link>
        </Button>
      </div>
    </section>
  );
}

export default HomeCta