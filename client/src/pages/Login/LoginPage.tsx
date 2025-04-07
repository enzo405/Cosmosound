import Divider from "./../../components/Divider";
import { routesConfig } from "./../../config/app-config";
import { useUser } from "./../../hooks/useUser";
import { useState, type ReactElement } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserService from "./../../services/userService";

interface LoginDataForm {
  email: string;
  password: string;
}

function LoginPage(): ReactElement {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginDataForm) => {
    const { email, password } = data;

    await UserService.login(email, password)
      .then(async () => {
        await UserService.getMe()
          .then((user) => {
            setUser(user);
            navigate(routesConfig.home.path);
          })
          .catch(() => {
            setError("An error occured please refresh the page");
          });
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  return (
    <div className="flex flex-row w-full h-full font-bs">
      <div className="hidden xsm:block xsm:w-2/5 sm:w-1/2 md:w-[55%] lg:w-[60%]">
        <img
          loading="eager"
          className="object-cover h-full w-full select-none"
          src="/img/homepage.jpg"
          alt="Cosmosound Homepage"
        />
      </div>
      <div className="w-auto min-w-0 flex flex-col flex-grow justify-center items-center gap-6 p-2">
        <div className="w-full flex flex-row justify-center items-center gap-1">
          <img loading="eager" className="size-10" src="/img/cosmosound.png" alt="Cosmosound" />
          <span className="flex h-full items-center pt-0.5 font-semibold text-dark-custom text-lg">
            CosmoSound
          </span>
          <span className="flex h-full items-center pt-0.5 text-dark-custom"> Ⓒ</span>
        </div>
        <div className="flex flex-col xsm:w-4/5 sm:w-2/3 max-w-72">
          <span className="font-semibold text-xl p-4">Nice to see you again</span>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="email" className="font-medium text-xs mb-1">
                  Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="email"
                      className={`border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-md px-2 py-1 focus:outline-none`}
                    />
                  )}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">{errors.email.message}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="font-medium text-xs mb-1">
                  Password
                </label>
                <div className="relative">
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className={`border ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        } rounded-md px-2 py-1 w-full focus:outline-none`}
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700 outline-none focus:outline-none group">
                    <span className="group-focus:outline-2 pl-1 pr-0.5 group-focus:outline group-focus:outline-white-orange rounded-lg">
                      {showPassword ? "Hide" : "Show"}
                    </span>
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-xs">{errors.password.message}</span>
                )}
              </div>
            </div>

            <Divider />

            <div className="flex flex-col">
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
              <button
                type="submit"
                className="bg-primary-orange hover:bg-tertio-orange text-white font-medium rounded-md py-2 focus:outline-1">
                Sign In
              </button>
            </div>
          </form>

          <div className="flex gap-1 text-sm mt-2">
            <span className="font-light">Don't have an account ?</span>
            <span
              className="underline text-primary-orange hover:text-tertio-orange cursor-pointer"
              onClick={() => navigate(routesConfig.register.path)}>
              Sign up now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
