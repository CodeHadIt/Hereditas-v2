"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BeneficiaryContext, BeneficiaryContextInterface } from "@/context/BeneficiaryContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const FormSchema = z.object({
  address: z.string().trim().min(42, {
    message: "Address must be at least 42 characters.",
  }),
});

const BeneficiaryForm = () => {
  const {beneficiaryData} = useContext(BeneficiaryContext) as BeneficiaryContextInterface
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: "",
    },
  });

  function handleAddressSubmit(data: z.infer<typeof FormSchema>) {
    beneficiaryData.setTestatorAddress(data.address);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAddressSubmit)} className="w-2/3 space-y-6 border p-4 rounded-md">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start gap-2">
              <FormLabel>Testator Address</FormLabel>
              <FormControl>
                <Input placeholder="0x4c....99A4" {...field} />
              </FormControl>
              <FormDescription>
                Add address of a testator whose gift you want to view/claim
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">See Gifts</Button>
      </form>
    </Form>
  );
};

export default BeneficiaryForm;
