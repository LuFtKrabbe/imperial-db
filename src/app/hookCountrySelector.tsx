import { useState } from "react";

const useCountrySelector = () => {
  const [value, setValue] = useState<string>("");
  const [countries, setCountries] = useState<string[]>([]);

  const handleValueChange = (newValue: string, countriesList: string[]) => {
    setValue(newValue);
    setCountries(
      countriesList.filter((country) => {
        const matchPart = country.slice(0, newValue.length);
        return matchPart && matchPart.toLowerCase() === newValue.toLowerCase();
      }),
    );
  };

  const selectCountry = (value: string) => {
    setValue(value);
    setCountries([]);
  };

  return { value, countries, selectCountry, handleValueChange };
};

export default useCountrySelector;
