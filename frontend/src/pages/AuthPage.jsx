// import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/project/Login";

const AuthPage = () => {
  return (
    <>
      {/* <h1>Ayyappa</h1> */}
      <div className="md:flex flex-row bg-slate-50">
        <div
          className="md:flex flex-col justify-center items-center md:h-screen ml-10 md:my-0 my-8 text-2xl 
          md:text-5xl md:w-[50%]"
          style={{ fontFamily: "Ubuntu" }}
        >
          <h3>InvoiceMaster</h3>
          <p className="md:text-base text-xs md:mt-3 md:mx-5 text-slate-600">
            Experience the Ease of Invoicing as a Distributor and Retailer
          </p>
        </div>
        <div className="md:flex flex-col md:w-[50%] justify-center items-center ">
          <Tabs defaultValue="Distributor" style={{ fontFamily: "Montserrat" }}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="Distributor">Distributor</TabsTrigger>
              <TabsTrigger value="Retailer">Retailer</TabsTrigger>
            </TabsList>
            <TabsContent value="Distributor">
              <Login role="distributor" />
            </TabsContent>
            <TabsContent value="Retailer">
              <Login role="retailer" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
