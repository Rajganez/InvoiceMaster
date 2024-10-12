import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";
import { useGoogleLogin } from "@react-oauth/google";

const Login = ({ role }) => {
  const initialData = {
    email: "",
    password: "",
    Role: role,
  };

  const [formdata, setformData] = useState(initialData);
  const [error, setError] = useState("");
  const [user, setUser] = useState([]);

  const handleFormChange = (e) => {
    setformData({ ...formdata, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|dev|co\.in)$/;
    const passwordPattern = /^[a-zA-Z0-9]{6,15}$/;

    if (!emailPattern.test(formdata.email)) {
      setError("Please Validate your Email");
      toast({
        variant: "destructive",
        title: `Uh oh! ${error}`,
      });
    } else if (!passwordPattern.test(formdata.password)) {
      setError(
        "Password should be 6-15 characters long and contain only alphanumeric characters"
      );
      toast({
        variant: "destructive",
        title: `Uh oh! ${error}`,
        description: "Password must be 6-15 characters long and alphanumeric.",
      });
    } else {
      setError("");
      setformData({ ...formdata, Role: role });
      console.log(formdata);
      alert(formdata.Role);
    }
  };
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => setUser(response.access_token),
    onError: (error) => console.log("Login Failed:", error),
  });

  const googleLogin = async () => {
    await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    })
      .then((response) => response.json())
      .then((userInfo) => {
        console.log("User Info:", userInfo);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  };

  useEffect(() => {
    googleLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-center w-full">
            Login{" "}
            <span className="text-lg text-slate-500">
              &nbsp;&nbsp;or&nbsp;&nbsp;
            </span>{" "}
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="">
            <div className="grid grid-cols-2 w-full items-center">
              <div>
                <label htmlFor="email" className="lg:text-xl text-sm">
                  Enter Email{" "}
                </label>
              </div>
              <div>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formdata.email}
                  placeholder="Enter Your Email"
                  required
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:gap-5 mt-5">
              <div>
                <label htmlFor="password" className="lg:text-xl text-sm">
                  Enter Password{" "}
                </label>
              </div>
              <div>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={formdata.password}
                  required
                  onChange={handleFormChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-center w-full">
          <Button onClick={handleSubmit}>Enter</Button>
          <Button
            variant="outline"
            className="mt-8"
            onClick={() => handleGoogleLogin()}
          >
            {/* <div className="mt-8">
            <GoogleLogin onSuccess={handleResponse} onError={handleError} />
          </div> */}
            <FcGoogle className="text-3xl" />{" "}
            <span className="ml-2">Login or Sign up</span>
          </Button>
        </CardFooter>
      </Card>
      {error && <Toaster />}
    </>
  );
};

export default Login;
Login.propTypes = {
  role: PropTypes.string,
};
