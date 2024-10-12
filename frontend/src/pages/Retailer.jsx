import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Retailer = () => {
  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center my-10 gap-2">
            <div className="flex flex-col" style={{ fontFamily: "Ubuntu" }}>
              <span className="text-3xl">InvoiceMaster&nbsp;/&nbsp;</span>
              <span className="text-base text-slate-500">Retailer</span>
            </div>
            <span className="mb-3">Retailer Name</span>
          </div>
        </div>
        <Table className="mt-5">
          <TableCaption>Invoices</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="p-4 w-[100px]">Date</TableHead>
              <TableHead className="p-4">Invoice Id</TableHead>
              <TableHead className="p-4">Issuer</TableHead>
              <TableHead className="p-4 text-center">Status</TableHead>
              <TableHead className="p-4 text-right">Value</TableHead>
              <TableHead className="p-4 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="p-4 font-medium">
                <span className="font-semibold">10/10/24</span>
              </TableCell>
              <TableCell className="p-4 text-left">
                <span className="font-semibold">INV001</span>
              </TableCell>
              <TableCell className="p-4 text-left">
                <span className="">johndoe@gmail.com</span>
              </TableCell>
              <TableCell className="p-4 text-center">
                <span className="font-semibold">
                  <Badge>Paid</Badge>
                </span>
              </TableCell>
              <TableCell className="p-4 text-center">
                <span className="font-semibold">$250.00</span>
              </TableCell>
              <TableCell className="p-4 text-right">
                <span className="font-semibold">Pay</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Retailer;
