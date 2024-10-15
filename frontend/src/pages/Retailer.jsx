import { clientAPI } from "@/api/api-axios.js";
import { GET_INVOICE_ROUTE, LOGOUT_ROUTE } from "@/api/constants.js";
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
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Retailer = () => {
  const userName = localStorage.getItem("auth_token");
  const retailerId = localStorage.getItem("auth_Id");

  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const profileName = () => {
    return userName.split("")[0];
  };

  const formData = {
    retailerid: retailerId,
  };

  const getInvoicesAPI = async () => {
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

  const handlePaymentPage = (id, bill) => {
    navigate(`/payment/${id}?parameter=${bill}`);
  };

  const handleViewPage = (id, bill) => {
    navigate(`/view/${id}?parameter=${bill}`);
  }

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

  useEffect(() => {
    getInvoicesAPI();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="max-w-5xl lg:mx-auto mx-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center my-10 gap-2">
            <div className="flex flex-col" style={{ fontFamily: "Ubuntu" }}>
              <span className="lg:text-3xl text-xl">
                InvoiceMaster&nbsp;/&nbsp;
              </span>
              <span className="md:text-base text-xs text-slate-500">
                Retailer
              </span>
            </div>
            <span className="mb-3">{userName.toLocaleUpperCase()}</span>
            <button className="md:ml-96 lg:pl-48 ml-5">
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
              <TableHead className="p-4">Issuer</TableHead>
              <TableHead className="p-4 text-center">Status</TableHead>
              <TableHead className="p-4 text-center">Value</TableHead>
              <TableHead className="p-4 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((val) => (
              <TableRow key={val._id}>
                <TableCell className="p-4 font-medium">
                  <span className="font-semibold">{val.date}</span>
                </TableCell>
                <TableCell className="p-4 text-left">
                  <span className="font-semibold">{val.billNo}</span>
                </TableCell>
                <TableCell className="p-4 text-left">
                  <span className="">{val.distributorname}</span>
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
                <TableCell className="p-4 text-center">
                  <span className="font-semibold">{val.Amount}</span>
                </TableCell>
                {val.status !== "Paid" ? (
                  <TableCell className="p-4 text-right">
                    <Button
                      variant="link"
                      className="font-semibold"
                      onClick={() => handlePaymentPage(val._id, val.billNo)}
                    >
                      Pay
                    </Button>
                  </TableCell>
                ) : (
                  <TableCell className="p-4 text-right">
                    <Button
                      variant="link"
                      className="font-semibold"
                      onClick={() => handleViewPage(val._id, val.billNo)}
                    >
                      View
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {error && <Toaster />}
    </>
  );
};

export default Retailer;
