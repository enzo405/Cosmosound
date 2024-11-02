import { Dispatch, SetStateAction } from "react";

type ToggleSwitchProps = {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
};

function ToggleSwitch({ checked, setChecked }: ToggleSwitchProps) {
  return (
    <label className="items-center cursor-pointer inline-flex relative ml-auto mr-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="sr-only peer"
      />
      <div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
    </label>
  );
}

export default ToggleSwitch;
