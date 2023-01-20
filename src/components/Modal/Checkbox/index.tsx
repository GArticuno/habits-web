import * as CheckboxRadix from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

import { CheckboxComponentProps } from "./types";

const CheckboxModal = ({ title, ...props }: CheckboxComponentProps) => {
  return (
    <CheckboxRadix.Root className="flex items-center gap-3 group" {...props}>
      <div
        className={`
          w-8
          h-8
          rounded-lg
          flex
          items-center
          justify-center
          bg-zinc-900
          border-2
          border-zinc-800
          group-data-[state=checked]:bg-green-500
          group-data-[state=checked]:border-green-500
        `}
      >
        <CheckboxRadix.Indicator>
          <Check size={20} className="text-white" />
        </CheckboxRadix.Indicator>
      </div>
      <span
        className="text-white leading-tight"
      >
        {title}
      </span>
    </CheckboxRadix.Root>
  );
};

export default CheckboxModal;