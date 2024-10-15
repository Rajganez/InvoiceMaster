import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { clientAPI } from "@/api/api-axios";
import { RETAILERS_ROUTE } from "@/api/constants";
import useAuthStore from "@/zstore/zustore.js";

export function RetailersDropDown() {
  const setId = useAuthStore((state) => state.setId);
  const setName = useAuthStore((state) => state.setName);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [frameworks, setFrameWorks] = useState([]);

  // API call to fetch all the retailers
  const retailersDetails = async () => {
    try {
      const response = await clientAPI.get(RETAILERS_ROUTE, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setFrameWorks(response.data.retailer);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setIdFunc = (id, value) => {
    setId(id);
    setName(value);
  };

  useEffect(() => {
    retailersDetails();
  }, [setFrameWorks]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select Retailer..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Retailer..." />
          <CommandList>
            <CommandEmpty>No Retailer found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.id}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                    setIdFunc(framework.id, framework.value);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
