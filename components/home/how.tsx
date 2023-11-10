import React from 'react'
import { homeCardItems } from '@/constants/home';
import Howcard from '../common/howcard';

const How = () => {
  return (
    <section id='#how' className="pt-20 flex flex-col gap-9 max-w-4xl text-center">
      <h2 className="text-4xl opacity-90">How It Works</h2>
      <div className="space-y-4">
        <p className="text-paragraph">
          Hereditas operates on a simple yet sophisticated mechanism. You choose
          the assets you want to gift and pick designated beneficiaries.
        </p>
        <p className="text-paragraph">
          You then set a specific date when these gifts can be claimed by the
          named beneficiaries. You&apos;re at liberty to cancel the gifts
          anytime before they&apos;re claimed!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-auto gap-6">
        {homeCardItems.map((item, index) => (
          <Howcard
            title={item.heading}
            icon={item.icon}
            text={item.paragraph}
            key={index}
          />
        ))}
      </div>
    </section>
  );
}

export default How