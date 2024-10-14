import { RetailersDropDown } from "@/components/project/RetailersDropDown";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Distributor = () => {
  const navigate = useNavigate();

  const handleBilling = () => {
    navigate("/billing");
  };

  const profileName = () => {
    const username = localStorage.getItem("auth_token");
    return username.split("")[0];
  };
  const handleLogout = () => {
    alert("Logged out");
  };
  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="md:flex flex-row justify-between">
          <div className="flex flex-row items-center my-10 gap-2">
            <div className="flex flex-col" style={{ fontFamily: "Ubuntu" }}>
              <span className="lg:text-3xl text-xl">
                InvoiceMaster&nbsp;/&nbsp;
              </span>
              <span className="md:text-base text-xs text-slate-500">
                Distributor
              </span>
            </div>
            <span className="mb-3">
              <RetailersDropDown />
            </span>
          </div>
          <div className="md:flex-none flex flex-row">
            <div className="md:mt-12">
              <Button
                variant="ghost"
                className="inline-flex gap-2"
                onClick={handleBilling}
              >
                <CirclePlus className="h-4 w-4" />
                <span>Create Invoice</span>
              </Button>
            </div>
            <button className="ml-16">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="text-slate-200">
                    <AvatarFallback className="bg-gray-800 text-xl pb-2">
                      {profileName()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <button onClick={handleLogout}>Log Out</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </button>
          </div>
        </div>
        <Table className="mt-5">
          <TableCaption>Invoices</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="p-4 w-[100px]">Date</TableHead>
              <TableHead className="p-4">Invoice Id</TableHead>
              <TableHead className="p-4">Email</TableHead>
              <TableHead className="p-4 text-center">Status</TableHead>
              <TableHead className="p-4 text-right">Value</TableHead>
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
              <TableCell className="p-4 text-right">
                <span className="font-semibold">$250.00</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Distributor;
