import React, { useEffect } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  id: string;
  name: string;
  initialValue: string;
  countries: {
    value: string;
    label: string;
  }[];
};

export default function CountrySelect({
  id,
  name,
  initialValue,
  countries,
}: Props) {
  const [selectedOption, setSelectedOption] = React.useState(initialValue);

  useEffect(() => {
    setSelectedOption(initialValue);
  }, [initialValue]);

  return (
    <div className="space-y-1">
      <Label htmlFor={id}>Origin country</Label>
      <Select value={selectedOption} onValueChange={setSelectedOption}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Origin" />
        </SelectTrigger>
        <SelectContent id={id}>
          {countries.map((country) => (
            <SelectItem key={country.value} value={country.value}>
              {country.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input type="hidden" value={selectedOption} name={name} />
    </div>
  );
}
