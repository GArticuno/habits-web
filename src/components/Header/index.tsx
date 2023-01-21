import { Plus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

import logoImage from "../../assets/logo.svg";
import Modal from "../Modal";

const Header = () => {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={logoImage} alt="Habits" />

      <Dialog.Root>
        <Dialog.Trigger
          type="button"
          className={`
            border
            border-violet-500
            font-semibold
            rounded-lg
            px-6
            py-4
            flex
            items-center
            gap-3
            transition-colors
            hover:border-violet-300
            focus:outline-none
            focus:ring-2
            focus:ring-violet-700
            focus:ring-offset-2
            focus:ring-offset-background
          `}
        >
          <Plus className="text-violet-500" />
          Novo hábito
        </Dialog.Trigger>
        <Modal />
      </Dialog.Root>
    </div>
  )
};

export default Header;