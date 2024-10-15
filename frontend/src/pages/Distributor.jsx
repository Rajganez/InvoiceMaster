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
import useAuthStore from "@/zstore/zustore.js";
import { clientAPI } from "@/api/api-axios.js";
import { GET_INVOICE_ROUTE, LOGOUT_ROUTE } from "@/api/constants.js";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const Distributor = () => {
  const retailerId = useAuthStore((state) => state.Id);

  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("");

  const formData = {
    retailerid: retailerId,
  };
  const navigate = useNavigate();

  const handleBilling = () => {
    navigate("/billing");
  };

  const profileName = () => {
    const username = localStorage.getItem("auth_token");
    return username.split("")[0];
  };

  const handleLogout = async () => {
    try {
      const response = await clientAPI.get(LOGOUT_ROUTE);
      if (response.status === 200) {
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      setError(error);
      toast({
        variant: "destructive",
        title: `Uh oh! ${error}`,
        description: "Password must be 6-15 characters long and alphanumeric.",
      });
    }
  };
  //API to get the invoice for the selected retailer
  const getInvoiceAPI = async () => {
    try {
      const response = await clientAPI.post(GET_INVOICE_ROUTE, formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setTableData(response.data.invoices);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvoiceAPI();
    // eslint-disable-next-line
  }, [retailerId]);

  return (
    <>
      <div className="max-w-5xl lg:mx-auto mx-2">
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
              <TableHead className="p-4 text-center">Invoice Id</TableHead>
              <TableHead className="p-4">Retailer Name</TableHead>
              <TableHead className="p-4 text-center">Status</TableHead>
              <TableHead className="p-4 text-right">Value</TableHead>
              {/* <TableHead className="p-4 text-center">Action</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((val) => (
              <TableRow key={val._id}>
                <TableCell className="p-4 font-medium">
                  <span className="font-semibold">{val.date}</span>
                </TableCell>
                <TableCell className="p-4 text-center">
                  <span className="font-semibold">{val.billNo}</span>
                </TableCell>
                <TableCell className="p-4 text-left">
                  <span className="">{val.retailerName}</span>
                </TableCell>
                <TableCell className="p-4 text-center">
                  <span className="font-semibold">
                    <Badge
                      className={
                        val.status === "Paid"
                          ? "bg-green-500"
                          : val.status === "Pending"
                          ? "bg-zinc-600"
                          : "bg-red-500"
                      }
                    >
                      {val.status}
                    </Badge>
                  </span>
                </TableCell>
                <TableCell className="p-4 text-right">
                  <span className="font-semibold">{val.Amount}</span>
                </TableCell>
                {/* <TableCell className=" text-right">
                  <Button variant="link">
                    Edit
                  </Button>
                  <Button variant="link">
                    Delete
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {error && <Toaster />}
    </>
  );
};

export default Distributor;
