import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  value: string;
  name: string;
  error?: string;
};

export default function SearchBox({ value, name, error }: Props) {
  return (
    <div className="space-y-1">
      <Label htmlFor="search-input">Search</Label>
      <Input
        id="search-input"
        name={name}
        type="text"
        defaultValue={value}
        placeholder="Search by breed name or description..."
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
