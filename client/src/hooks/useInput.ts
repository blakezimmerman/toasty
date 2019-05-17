import { SyntheticEvent, useState } from "react";

export const useInput = (
  initialValue: string,
): [string, (e: SyntheticEvent<HTMLInputElement> | string) => void] => {
  const [value, setValue] = useState(initialValue);

  const updateValue = (e: SyntheticEvent<HTMLInputElement> | string) => {
    setValue(typeof e === "object" ? e.currentTarget.value : e);
  };

  return [value, updateValue];
};
