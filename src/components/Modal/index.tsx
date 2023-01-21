import * as Dialog from "@radix-ui/react-dialog";
import { Check, X } from "phosphor-react";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import ReactLoading from "react-loading";
import colors from "tailwindcss/colors";

import { createHabit } from "../../services";

import CheckboxModal from "./Checkbox";
import { weekDaysFullName } from "./constants";

const Modal = () => {
  const [title, setTitle ] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [daysOfTheWeek, setDaysOfTheWeek] = useState<number[]>([]);

  const handleToggleDaysOfTheWeek = (weekDay: number) => {
    if(daysOfTheWeek.includes(weekDay)) {
      setDaysOfTheWeek(prevState => [...prevState.filter(day => day !== weekDay)]);
    } else {
      setDaysOfTheWeek(prevState => [...prevState, weekDay]);
    }
  };

  const onSubmit = async (event: FormEvent) => {
    setIsLoading(true);
    event.preventDefault();

    const response = await createHabit({
      title,
      weekDays: daysOfTheWeek
    });

    if(response) {
      setTitle("");
      setDaysOfTheWeek([]);
      toast.success("Hábito criado com sucesso!");
    } else {
      toast.error("Um erro inesperado aconteceu! Por favor tente novamente.");
    }

    setIsLoading(false);
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0">
        <Dialog.Content
          className={`
            absolute
            p-10
            bg-zinc-900
            rounded-2xl
            w-full
            max-w-md
            top-1/2
            left-1/2
            -translate-x-1/2
            -translate-y-1/2
          `}
        >
          <Dialog.Close
            className={`
              absolute
              right-6
              top-6
              rounded-lg
              text-zinc-400
              hover:text-zinc-200
              focus:outline-none
              focus:ring-2
              focus:ring-violet-600
              focus:ring-offset-2
              focus:ring-offset-background
            `} 
          >
            <X size={24} aria-label="Fechar" />
          </Dialog.Close>
          <Dialog.Title className="text-3xl landing-tight font-extrabold">
            Criar hábito
          </Dialog.Title>
          <form onSubmit={onSubmit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
              Qual o seu comprometimento?
            </label>
            <input
              id="title"
              type="text"
              placeholder="Ex: Exercícios, dormir bem, etc..."
              autoFocus
              className={`
                mt-4
                p-4
                rounded-lg
                bg-zinc-800
                text-white
                placeholder:text-zinc-400
                focus:outline-none
                focus:ring-2
                focus:ring-violet-600
                focus:ring-offset-2
                focus:ring-offset-zinc-900
              `}
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
            <label htmlFor="" className="font-semibold leading-tight mt-6">
              Qual a recorrência?
            </label>
            <div className="mt-6 flex flex-col gap-2 mt-3">
              {weekDaysFullName.map((weekDay, index) => (
                <CheckboxModal
                  key={weekDay}
                  title={weekDay}
                  checked={daysOfTheWeek.includes(index)}
                  onCheckedChange={() => handleToggleDaysOfTheWeek(index)}
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={!title || daysOfTheWeek.length === 0}
              className={`
                mt-6
                rounded-lg
                p-4
                gap-3
                flex
                items-center
                justify-center
                font-semibold
                transition-colors
                bg-green-600
                hover:bg-green-500
                disabled:bg-zinc-800
                disabled:text-zinc-500
                focus:outline-none
                focus:ring-2
                focus:ring-green-600
                focus:ring-offset-2
                focus:ring-offset-zinc-900
              `}
            >
              {isLoading && (
                <ReactLoading type="spin" color={colors.white} height={24} width={24} />
              )}
              {!isLoading && (
                <>
                  <Check size={24} weight="bold" />
                  Confirmar
                </>
              )}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
};

export default Modal;