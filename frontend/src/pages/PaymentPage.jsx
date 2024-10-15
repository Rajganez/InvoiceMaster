import { clientAPI } from "@/api/api-axios.js";
import {
  BILLING_INVOICE_ROUTE,
  PAYMENT_INVOICE,
  PAYMENT_VERIFICATION,
  UPDATE_INVOICE_ROUTE,
} from "@/api/constants.js";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const PaymentPage = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [searchParams] = useSearchParams();
  const { id } = useParams();

  const billNo = searchParams.get("parameter");

  const navigate = useNavigate();

  const getInvoiceDetails = async () => {
    try {
      const response = await clientAPI.post(`${BILLING_INVOICE_ROUTE}/${id}`);
      if (response.status === 200) {
        setInvoiceData(response.data);
      }
    } catch (error) {
      setError(error.response.msg);
      toast({
        variant: "destructive",
        title: `Uh oh! Error in Retrieving Invoice`,
      });
    }
  };

  const changeInvoiceStatus = async (receipt) => {
    const id = receipt.slice(6);
    const formData = { id: id };
    try {
      const response = await clientAPI.post(UPDATE_INVOICE_ROUTE, formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      setError(error.response.msg);
      toast({
        variant: "destructive",
        title: `Uh oh! Error in Updating Invoice`,
      });
    }
  };

  const initPayment = (data) => {
    // Initialize payment gateway verification
    const options = {
      key: import.meta.env.VITE_PAYMENT_KEY_ID,
      amount: data.amount,
      currency: "INR",
      receipt: data.receipt,
      description: `Test payment ${data.receipt}`,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyPayment = await clientAPI.post(
            PAYMENT_VERIFICATION,
            response,
            { withCredentials: true }
          );
          if (verifyPayment.status === 200) {
            setError("");
            changeInvoiceStatus(data.receipt);
            setPaymentStatus(verifyPayment.data.msg);
            toast({
              title: "Success Message",
              description: "Payment Done Successfully!",
            });
          }
        } catch (error) {
          setError(error.response.msg);
          toast({
            variant: "destructive",
            title: `Uh oh! Something went wrong In Payment Transaction Please try again`,
          });
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzpy1 = new window.Razorpay(options);
    rzpy1.open();
  };

  const handlePayment = async () => {
    const formData = {
      id: id,
    };
    try {
      const response = await clientAPI.post(PAYMENT_INVOICE, formData, {
        withCredentials: true,
      });
      initPayment(response.data.data);
    } catch (error) {
      console.log(error);
      setError("Error in Making Payment Please Try Again!");
      toast({
        variant: "destructive",
        title: `Uh oh! Error in Making Payment Please Try Again!`,
      });
    }
  };

  const handlePageBack = () => {
    navigate("/retailer");
  };

  useEffect(() => {
    getInvoiceDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

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
                Billing
              </span>
            </div>
            <span className="mb-5 font-semibold">
              {/* <RetailersDropDown /> */}
              {billNo}
            </span>
          </div>
        </div>
        {invoiceData.map((val) => (
          <div key={val._id}>
            <div className="text-2xl">₹ {val.Amount}</div>
            <div className="font-semibold">{val.Description}</div>
            <div className="font-bold text-xl mt-5">
              Billing Details&nbsp;
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
            </div>
            <div className="mt-2">Invoice ID : {val.billNo}</div>
            <div className="mt-2">Invoice Date : {val.date}</div>
            <div className="mt-2">Billing Name : {val.retailerName}</div>
            <div className="mt-2">Issuer Email : {val.issuerEmail}</div>
          </div>
        ))}
        <div className="mt-10 flex">
          {/* Disable the button if status is "Paid" */}
          <Button
            disabled={invoiceData.some((val) => val.status === "Paid")}
            className={`px-5 ${
              invoiceData.some((val) => val.status === "Paid")
                ? "bg-gray-400"
                : "bg-green-700"
            }`}
            onClick={handlePayment}
          >
            <CreditCard />
            &nbsp;&nbsp;&nbsp;Pay Invoice
          </Button>
          <div>
            <Button
              variant="outline"
              className="mx-5 text-gray-700"
              onClick={handlePageBack}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
      {paymentStatus && <Toaster />}
      {error && <Toaster />}
    </>
  );
};

export default PaymentPage;
