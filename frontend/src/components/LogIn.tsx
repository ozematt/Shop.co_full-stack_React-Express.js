import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Footer, Newsletter } from "../sections";
import { Button } from "./";
import { user, lock } from "../assets";
import { type LoginSchema, loginSchema } from "../lib/types";
import authenticate from "../api/queries/authorization";
import { getUserName } from "../lib/helpers/getUserNameFromEmail";
import { AppDispatch, useAppDispatch } from "../redux/store";
import { logUser } from "../redux/userSlice";

const LogIn = () => {
  //
  ////DATA
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  ////LOGIC
  //handling responses from the server
  const mutation = useMutation({
    mutationFn: authenticate,
    onError: () => {
      setError("username", {
        type: "custom",
        message: "User does not exist",
      });
    },
    onSuccess: (data) => {
      clearErrors(["username"]);
      reset(); //form fields reset

      navigate("/shop");
    },
  });

  //handle submit form data
  const onSubmit = (data: LoginSchema) => {
    const dataToSend = {
      auth: "login",
      username: data.username,
      password: data.password,
    };
    mutation.mutate(dataToSend);
    const username = getUserName(data.username); //make username out of email
    dispatch(logUser(username));
  };

  ////UI
  return (
    <>
      <section className="max-container bg-grayBG px-4 sm:px-[100px]">
        <div className="mx-auto flex w-full max-w-[400px] flex-col">
          <h2 className="pt-[60px] font-integralCFBold text-[32px] max-sm:leading-9 sm:pt-[100px] sm:text-5xl">
            Welcome Back!
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-[400px] space-y-4 pb-9 pt-8 sm:pb-[80px]"
          >
            <div className="relative w-full">
              <img
                src={user}
                alt="envelope"
                width={20}
                height={20}
                className="absolute left-6 top-[30%] opacity-60"
              />
              <input
                {...register("username")}
                type="text"
                placeholder="Enter your user name"
                className="h-[48px] w-full rounded-full bg-white pl-[60px] focus:outline-none focus:ring-1 focus:ring-black max-sm:placeholder:text-[14px]"
              />
            </div>
            {errors.username && (
              <p className="pb-2 pl-5 leading-[1px] text-red-500">
                {errors.username.message}
              </p>
            )}

            <div className="relative w-full">
              <img
                src={lock}
                alt="lock"
                width={20}
                height={20}
                className="absolute left-6 top-[30%] opacity-60"
              />
              <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className="h-[48px] w-full rounded-full bg-white pl-[60px] focus:outline-none focus:ring-1 focus:ring-black max-sm:placeholder:text-[14px]"
              />
            </div>
            {errors.password && (
              <p className="pb-2 pl-5 leading-[1px] text-red-500">
                {errors.password.message}
              </p>
            )}
            <div className="flex justify-between space-x-2">
              <Button type="submit">Login</Button>
              <button
                onClick={() => navigate("/register")}
                className="mt-6 w-full rounded-full px-[50px] py-[15px] text-black opacity-30 ring-1 ring-black transition duration-100 ease-in-out hover:scale-95 hover:opacity-100 sm:mt-[32px] dark:text-white dark:ring-white"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </section>
      <div className="max-container">
        {" "}
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default LogIn;
