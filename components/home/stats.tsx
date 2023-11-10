import React from 'react'
import { Card, CardContent } from "../ui/card";
import { statCardItems } from '@/constants/home';

const Stats = () => {
  return (
    <section>
      <div className="pt-20 flex flex-col gap-9 max-w-4xl text-center">
        <div className="space-y-6">
          <h2 className="text-4xl opacity-90">Stats</h2>
          <p className="text-paragraph">
            Hereditas is an all inclusive platform made with you in mind
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-auto gap-6">
          {statCardItems.map((item, index) => (
            <Card
              key={index}
              className="flex flex-col items-center justify-center gap-1 py-14 px-8 "
            >
              <div className="text-3xl font-bold">
                {item.heading}{" "}
                <span className="text-primary">{item.extra}</span>
              </div>
              <p className="text-paragraph">{item.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats