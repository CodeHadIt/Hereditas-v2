import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface IProps {
    title: string;
    icon: LucideIcon;
    text: string;
}


const Howcard = ({title, icon, text}: IProps) => {
 const IconComponent = icon; 

  return (
    <Card
      className={`text-left `}
    >
      <CardHeader className="gap-[20px]">
        <div className="bg-background w-14 h-14 rounded-lg relative">
          <IconComponent
            color="hsl(217.2 91.2% 59.8%)"
            size={30}
            className="absolute inset-0 m-auto"
          />
        </div>
        <CardTitle className="text-[20px]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-paragraph">{text}</p>
      </CardContent>
    </Card>
  );
}

export default Howcard