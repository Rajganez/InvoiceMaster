import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Billing = () => {
  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center my-10 gap-2">
            <div className="flex flex-col" style={{ fontFamily: "Ubuntu" }}>
              <span className="text-3xl">InvoiceMaster&nbsp;/&nbsp;</span>
              <span className="text-base text-slate-500">Distributor</span>
            </div>
            <div className="text-3xl mb-6 font-bold">Create Invoice</div>
          </div>
        </div>
        <div className="">
          <form className="grid gap-4 max-w-xs">
            <div>
              <Label className="block my-2 font-semibold text-lg">
                Retailer Name
              </Label>
              <Input type="text" />
            </div>
            <div>
              <Label
                htmlFor="value"
                className="block my-2 font-semibold text-lg"
              >
                Value
              </Label>
              <Input id="value" name type="text" />
            </div>
            <div>
              <Label htmlFor className="block my-2 font-semibold text-lg">
                Description
              </Label>
              <Textarea id="description"></Textarea>
            </div>
            <div>
              <Button className="w-full font-semibold">Generate Bill</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Billing;
