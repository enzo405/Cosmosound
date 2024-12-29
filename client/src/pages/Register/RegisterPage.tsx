import { routesConfig } from "config/app-config";
import { useState, useEffect, type ReactElement } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import genresService from "services/genresService";
import UserService from "services/userService";
import { Genre } from "models/Music";
import { AxiosError } from "axios";
import Divider from "components/Divider";

interface RegisterDataForm {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  pictureProfile: File | string;
  genre: string;
}

const defaultPictureProfile = "/img/header/default_avatar.png";

function RegisterPage(): ReactElement {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [search, setSearch] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<RegisterDataForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      pictureProfile: defaultPictureProfile,
      genre: "",
    },
    mode: "onChange",
  });

  const pictureProfile = watch("pictureProfile");
  const genre = watch("genre");

  useEffect(() => {
    setGenres(genresService.getAllGenres());
  }, []);

  useEffect(() => {
    setError(null);
  }, [currentStep]);

  const filteredGenres = genres.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()));

  const handleNextStep = async () => {
    const valid = await trigger(
      currentStep === 1 ? ["name", "email", "password", "passwordConfirm"] : ["pictureProfile"],
    );
    if (valid) setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: RegisterDataForm) => {
    try {
      const { name, email, password, passwordConfirm, genre, pictureProfile } = data;

      await UserService.register(name, email, password, passwordConfirm, pictureProfile, genre)
        .then(() => {
          navigate(routesConfig.login.path);
        })
        .catch(() => {
          throw new Error("An error occurred while creating the user.");
        });
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "An error occurred while creating the user.");
      } else {
        setError("An error occurred while creating the user.");
      }
    }
  };

  const title = () => {
    switch (currentStep) {
      case 1:
        return "Welcome !!";
      case 2:
        return "Choose a profile picture:";
      case 3:
        return "Choose your most liked music genre:";
    }
  };

  return (
    <div className="flex flex-row w-full h-full font-bs">
      <div className="hidden xsm:block xsm:w-2/5 md:w-[45%] lg:w-1/2">
        <img
          className="object-cover h-full w-full select-none"
          src="/img/login.jpg"
          alt="Happy CosmoSound user"
        />
      </div>
      <div className="w-auto min-w-0 flex flex-col flex-grow justify-center items-center gap-6 p-2">
        <div className="flex flex-col xsm:w-4/5 sm:w-2/3 max-w-72">
          <span className="font-semibold text-2xl p-4">{title()}</span>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {currentStep === 1 && (
              <>
                <div className="flex flex-col gap-4">
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Name"
                        className={`border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } rounded-md px-2 py-1`}
                      />
                    )}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs">{errors.name.message}</span>
                  )}

                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Email"
                        className={`border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-md px-2 py-1`}
                      />
                    )}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">{errors.email.message}</span>
                  )}

                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="password"
                        placeholder="Password"
                        className={`border ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        } rounded-md px-2 py-1`}
                      />
                    )}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-xs">{errors.password.message}</span>
                  )}

                  <Controller
                    name="passwordConfirm"
                    control={control}
                    rules={{
                      required: "Confirm your password",
                      validate: (value) => value === watch("password") || "Passwords do not match",
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="password"
                        placeholder="Confirm Password"
                        className={`border ${
                          errors.passwordConfirm ? "border-red-500" : "border-gray-300"
                        } rounded-md px-2 py-1`}
                      />
                    )}
                  />
                  {errors.passwordConfirm && (
                    <span className="text-red-500 text-xs">{errors.passwordConfirm.message}</span>
                  )}
                </div>

                {error && <span className="text-red-500 font-normal tracking-tight">{error}</span>}

                <Divider />

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-blue-500 text-white rounded-md px-4 py-2">
                  Next
                </button>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="flex flex-col items-center gap-1">
                  <label className="flex flex-col bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md px-4 py-2 cursor-pointer">
                    Choose File
                    <span className="text-sm font-light text-gray-500">
                      (or click Next to use default avatar)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 512 * 512) {
                            setError("File size must be less than 5MB");
                            setValue("pictureProfile", defaultPictureProfile);
                          } else {
                            setError(null);
                            setValue("pictureProfile", file);
                          }
                        } else {
                          setValue("pictureProfile", defaultPictureProfile);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                  <span className="text-sm font-light text-gray-500 mb-3">
                    {"Should not exceed "}
                    <span className="font-bold">512 MB</span>
                  </span>
                  {typeof pictureProfile === "string" ? (
                    <img
                      src={pictureProfile}
                      alt="Profile Preview"
                      className="rounded-full object-cover size-24"
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(pictureProfile as File)}
                      alt="Profile Preview"
                      className="rounded-full object-cover size-24"
                    />
                  )}
                </div>

                {error && <span className="text-red-500 font-normal tracking-tight">{error}</span>}

                <Divider />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="w-1/2 bg-blue-400 text-white rounded-md px-4 py-2">
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-1/2 bg-blue-500 text-white rounded-md px-4 py-2">
                    Next
                  </button>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-start items-center gap-1">
                    {genre !== "" && (
                      <>
                        <span>Selected Genre:</span>
                        <span className="rounded-md bg-slate-200 p-1">{genre}</span>
                      </>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Search genres"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1"
                  />
                  <ul className="border border-gray-300 rounded-md max-h-40 overflow-y-scroll">
                    {filteredGenres.map((g) => (
                      <li
                        key={g.name}
                        onClick={() => setValue("genre", g.name)}
                        className={`p-2 hover:bg-gray-200 cursor-pointer ${
                          genre === g.name ? "bg-gray-300 font-bold" : ""
                        }`}>
                        {g.name}
                      </li>
                    ))}
                  </ul>
                </div>

                {error && <span className="text-red-500 font-normal tracking-tight">{error}</span>}

                <Divider />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="w-1/2 bg-blue-400 text-white rounded-md px-4 py-2">
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-blue-500 text-white rounded-md px-4 py-2">
                    Submit
                  </button>
                </div>
              </>
            )}
          </form>
          <div className="flex gap-1 text-sm mt-2 select-none">
            <span className="font-light">Already have an account ?</span>
            <span
              className="underline text-blue-500 hover:text-blue-400 cursor-pointer"
              onClick={() => navigate(routesConfig.login.path)}>
              Sign in now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
