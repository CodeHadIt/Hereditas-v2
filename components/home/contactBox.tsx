import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from '../ui/button';

const ContactBox = () => {
  return (
    <section>
      <div className="pt-20 max-w-4xl">
        <Card className="flex flex-col gap-8 items-center py-20 px-16 text-center">
          <h3 className="text-3xl font-bold">Partner With Hereditas</h3>
          <p className="text-paragraph">
            Leave us a message, and we&apos;ll reach out to explore how we can
            partner with you.
          </p>
          <Button className="custom-scale custom-hover">Contact Us</Button>
        </Card>
      </div>
    </section>
  );
}

export default ContactBox