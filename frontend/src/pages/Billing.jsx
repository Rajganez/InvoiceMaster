import { clientAPI } from "@/api/api-axios.js";
import { CREATE_INVOICE_ROUTE } from "@/api/constants.js";
import { RetailersDropDown } from "@/components/project/RetailersDropDown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import useAuthStore from "@/zstore/zustore.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Billing = () => {
  const retailerId = useAuthStore((state) => state.Id);
  const retailerName = useAuthStore((state) => state.Name);
  const distributorId = localStorage.getItem("auth_Id");
  const userName = localStorage.getItem("auth_token");

  const intialData = {
    retailerid: "",
    retailername: "",
    value: "",
    description: "",
    distributorId: distributorId,
    distributorName: userName,
  };

  const [formData, setFormData] = useState(intialData);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleValueChange = (e) => {
    const { value } = e.target;

    // Regular expression for validating numeric input with max 2 decimal places
    const regex = /^\d{0,6}(\.\d{0,2})?$/;

    // Allow clearing the input (empty string)
    if (value === "") {
      setFormData({
        ...formData,
        value: "",
      });
      setError("");
      return;
    }

    // Convert to number and check if it exceeds 3,00,000
    const numValue = parseFloat(value);

    if (!regex.test(value)) {
      setError(
        "Invalid format! Only numbers and max 2 decimal places allowed."
      );
    } else if (numValue > 300000) {
      setError("Value cannot exceed ₹3,00,000.");
    } else {
      setError("");
    }

    // Update state only if the input is valid
    if (regex.test(value) && numValue <= 300000) {
      setFormData({
        ...formData,
        value,
      });
    }
  };

  const BillingAPI = async () => {
    try {
      const response = await clientAPI.post(CREATE_INVOICE_ROUTE, formData, {
        withCredentials: true,
      });
      if (response.status === 201) {
        setApiError("");
        setError("");
        setSuccess(true);
        toast({
          title: "Success Message",
          description: "Invoice Created successfully",
        });
      }
    } catch (error) {
      setSuccess("");
      setApiError(error.response.data.msg);
      toast({
        variant: "destructive",
        title: `Uh oh! ${apiError}`,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.retailerid !== "" &&
      formData.value !== "" &&
      formData.description !== ""
    ) {
      setApiError("");
      setError("");
      BillingAPI();
    } else {
      setApiError("Please check all fields are filled.");
      toast({
        variant: "destructive",
        title: `Uh oh! Please check all fields are filled.`,
      });
    }
  };

  const handleNavigateBack = () => {
    navigate("/distributor");
  };

  useEffect(() => {
    formData.retailerid = retailerId;
    formData.retailername = retailerName;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retailerId]);

  return (
    <>
      <div className="max-w-5xl lg:mx-auto ml-5">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center my-10 gap-2">
            <div className="flex flex-col" style={{ fontFamily: "Ubuntu" }}>
              <span className="md:text-3xl text-lg">
                InvoiceMaster&nbsp;/&nbsp;
              </span>
              <span className="md:text-base text-xs text-slate-500">
                Distributor
              </span>
            </div>
            <div className="md:text-3xl text-lg mb-6 font-bold">
              Create Invoice
            </div>
          </div>
        </div>
        <div>
          <form className="grid gap-4 max-w-xs">
            <div>
              <Label
                htmlFor="ID"
                className="block my-2 font-semibold text-xs md:text-lg"
              >
                Select Retailer
              </Label>
              <RetailersDropDown />
              {retailerName ? (
                <span className="font-semibold text-xs md:text-lg ml-5">
                  {retailerName}
                </span>
              ) : (
                ""
              )}
              {/* <input id="ID" type="text" hidden required /> */}
            </div>
            <div>
              <Label
                htmlFor="value"
                className="block my-2 font-semibold text-xs md:text-lg"
              >
                Value<span className="text-xs md:text-lg">&nbsp;(₹)</span>
              </Label>
              <Input
                id="value"
                name="value"
                type="text"
                value={formData.value}
                onChange={handleValueChange}
                required
              />
              {error && <p className="text-red-600 text-xs">{error}</p>}
            </div>
            <div>
              <Label
                htmlFor="description"
                className="block my-2 font-semibold text-xs md:text-lg"
              >
                Description
              </Label>
              <Textarea
                required
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div>
              <Button
                className="md:w-full font-semibold"
                onClick={handleSubmit}
              >
                Generate Bill
              </Button>
            </div>
            <div>
              <Button
                variant="outline"
                className="md:w-full font-semibold"
                onClick={handleNavigateBack}
              >
                Back
              </Button>
            </div>
          </form>
        </div>
      </div>
      {apiError && <Toaster />}
      {success && <Toaster />}
    </>
  );
};

export default Billing;
