'use client'
import React, { useContext, useState } from 'react'
import * as z from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createEtherGift, createNFTGift, createTokenGift } from '@/lib/createGifts';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CalendarIcon, Info, Loader } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from "@/components/ui/use-toast";
import { useEthersSigner } from '@/lib/hooks/useEthersSigner';
import { JsonRpcSigner } from 'ethers';
import { GiftContext, GiftsContextInterface } from '@/context/GiftContext';
import { useRouter } from 'next/navigation';


type formState = "initial" | "creating" | "error" | "finished";

const currentDate = new Date();
const oneDayAhead = new Date(currentDate);
oneDayAhead.setDate(currentDate.getDate() + 1);

const FormSchema = z
  .object({
    giftType: z.enum(["ether", "nft", "token"]),
    contractAddress: z.string(),
    beneficiaryAddress: z
      .string()
      .trim()
      .min(1, { message: "Beneficiary Address is Required" })
      .min(42, { message: "Must be at least 42 characters" }),
    value: z.string().min(1, { message: "Gift Value is required" }),
    releasedDate: z
      .date()
      .min(new Date(), { message: "Date must be in the future" }),
  })
  .refine(
    ({ giftType, contractAddress }) =>
      giftType !== "ether" && contractAddress.length < 42 ? false : true,
    {
      message:
        "Contract Address is required and must be at least 42 characters",
      path: ["contractAddress"],
    }
  );

const CreateGiftForm = () => {
  const [formState, setFormState] = useState<formState>("initial")
  const {
    giftsData: { setGiftState },
  } = useContext(GiftContext) as GiftsContextInterface;
  const signer = useEthersSigner();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      giftType: "ether",
      beneficiaryAddress: "",
      contractAddress: "",
      value: "",
      releasedDate: oneDayAhead,
    },
  });

  const handleCreate = async (data: z.infer<typeof FormSchema>) => {
      setFormState("creating")
      let response;
      if(data.giftType === "ether") {
        response = await createEtherGift(data, signer!)
      } else if(data.giftType === "nft") {
        response = await createNFTGift(data, signer!)
      } else {
        response = await createTokenGift(data, signer!)
      }
      if(response.ok) {
        toast({
          title: "Congratulations 🎉",
          description: response.message,
        });
        setFormState("finished");
        setGiftState("initial")
        router.push("/app/dashboard/all-gifts")
      } else if(response.error) {
        toast({
          variant: "destructive",
          title: "Oops!",
          description: response.message,
        });
        setFormState("error")
      }
  };

  return (
    <div className="border rounded-md p-4 min-w-[500px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreate)}
          className="space-y-6 pt-6"
        >
          <FormField
            control={form.control}
            name="giftType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between space-x-1">
                  <div className="space-x-1">
                    <span className="text-[16px] font-medium">Gift Type</span>
                    <span className="text-red-600 font-medium">*</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={20} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Select type/nature of gift.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="select..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ether">Ether</SelectItem>
                    <SelectItem value="nft">Nft</SelectItem>
                    <SelectItem value="token">Token</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contractAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <div className="space-x-1">
                    <span className="text-[16px] font-medium">
                      Contract Address
                    </span>
                    <span className="text-red-600 font-medium">*</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={20} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Contract Address of the asset to be gifted. <br />{" "}
                          Leave blank if gifting Ether
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="0x200...A9Y0"
                    className="text-[16px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="beneficiaryAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <div className="space-x-1">
                    <span className="text-[16px] font-medium">
                      Beneficiary Address
                    </span>
                    <span className="text-red-600 font-medium">*</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={20} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Address of gift beneficiary</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="0x240...B960"
                    className="text-[16px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <div className="space-x-1">
                    <span className="text-[16px] font-medium">Gift Value</span>
                    <span className="text-red-600 font-medium">*</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={20} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Enter the amount of Ether/Token to gift. <br /> If
                          gift is an Nft, enter Nft TokenId
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="100"
                    className="text-[16px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="releasedDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex items-center justify-between">
                  <div className="space-x-1">
                    <span className="text-[16px] font-medium">
                      Release Date
                    </span>
                    <span className="text-red-600 font-medium">*</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={20} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Enter the amount of Ether/Token to gift. <br /> If
                          gift is an Nft, enter Nft TokenId
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a release date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full space-x-2"
            disabled={formState === "creating"}
          >
            {formState === "creating" && (
              <Loader className="h-5 w-5 animate-spin" />
            )}
            {formState === "creating" ? (
              <span>Creating...</span>
            ) : (
              <span>Create Gift</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateGiftForm