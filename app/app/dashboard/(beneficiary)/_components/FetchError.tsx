'use client'
import { Button } from '@/components/ui/button';

const FetchError = ({gift}: { gift? : string}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="space-y-1">
        <p className="text-destructive">
          An Error occured fetching {gift} gift data.{" "}
        </p>
        <span className="text-muted-foreground text-sm">
          This is typically because the address is wrong
        </span>
      </div>
      <Button onClick={() => window.location.reload()}>Try Again</Button>
    </div>
  );
}

export default FetchError