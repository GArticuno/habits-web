import { ProgressBarProps } from "./types";

const ProgressBar = ({ progress } : ProgressBarProps) => {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        role="progressbar"
        aria-label="Progresso de hábitos completados nesse dia"
        className="h-3 rounded-xl bg-violet-600"
        style={{ width: `${progress}%` }}
        aria-valuenow={progress}
      />
    </div>
  );
};

export default ProgressBar;