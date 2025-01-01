import { routesConfig } from "config/app-config";
import { useState, useEffect, type ReactElement, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import genresService from "services/genresService";
import UserService from "services/userService";
import { Genre } from "models/Music";
import { AxiosError } from "axios";
import Divider from "components/Divider";
import { enqueueSnackbar } from "notistack";

interface RegisterDataForm {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  pictureProfile: File | string;
  genres: string[];
}

const defaultPictureProfile = "/img/header/default_avatar.png";

function RegisterPage(): ReactElement {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [displayedGenres, setDisplayedGenres] = useState<Genre[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

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
      genres: [],
    },
    mode: "onChange",
  });

  const pictureProfile = watch("pictureProfile");
  const genres = watch("genres");

  useEffect(() => {
    setDisplayedGenres(genresService.getAllGenres());
  }, []);

  useEffect(() => {
    setError(null);
  }, [currentStep]);

  const filteredGenres = displayedGenres.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleNextStep = async () => {
    const valid = await trigger(
      currentStep === 1 ? ["name", "email", "password", "passwordConfirm"] : ["pictureProfile"],
    );
    if (valid) setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep === 3 && isLoading) {
      abortControllerRef.current?.abort();
    }
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: RegisterDataForm) => {
    try {
      setLoading(true);
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const { name, email, password, passwordConfirm, genres, pictureProfile } = data;

      await UserService.register(
        name,
        email,
        password,
        passwordConfirm,
        pictureProfile,
        genres,
        abortController.signal,
      )
        .then(() => {
          if (!abortController.signal.aborted) {
            navigate(routesConfig.login.path);
          } else {
            enqueueSnackbar("Account creation canceled", { variant: "success" });
          }
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
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const title = () => {
    switch (currentStep) {
      case 1:
        return "Welcome to CosmoSound!!";
      case 2:
        return "Select a profile picture (optional):";
      case 3:
        return "Select your favorite genres (Max. 5):";
    }
  };

  const handleClickGenreList = (genre: Genre) => {
    if (genres.find((g) => g === genre.name)) {
      const newGenres = genres.filter((name) => genre.name !== name);
      setValue("genres", newGenres);
      return;
    }
    if (genres.length < 5) {
      const newList = [...genres, genre.name];
      setValue("genres", newList);
    }
  };

  const onGenreClick = (genreName: string) => {
    const newGenres = genres.filter((name) => genreName !== name);
    setValue("genres", newGenres);
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
      <div className="w-auto min-w-0 flex flex-col flex-grow justify-center items-center gap-2 p-2">
        <span className="flex flex-col items-center text-center font-semibold text-2xl p-4">
          {title()}
          {currentStep === 3 && (
            <span className="flex text-center font-extralight text-sm p-0.5 text-slate-600">
              (at least one)
            </span>
          )}
        </span>
        <div className="flex flex-col xsm:w-4/5 sm:w-2/3 max-w-72">
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
                  {typeof pictureProfile === "string" ? (
                    <>
                      <img
                        src={pictureProfile}
                        alt="Profile Preview"
                        className="rounded-full object-cover size-24"
                      />
                      <span className="text-sm font-light text-gray-500 mb-3">Default image</span>
                    </>
                  ) : (
                    <img
                      src={URL.createObjectURL(pictureProfile as File)}
                      alt="Profile Preview"
                      className="rounded-full object-cover size-24"
                    />
                  )}
                  <div>
                    <label className="flex flex-col text-center bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md px-4 py-2 mt-4 cursor-pointer">
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 10000000) {
                              setError("File size must be less than 10MB");
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
                    <span className="font-bold">Max. file size: 10 MB</span>
                  </div>
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
                    {genres.length !== 0 && (
                      <div className="flex flex-col justify-start">
                        <span>Selected genres:</span>
                        <div className="flex flex-wrap gap-1">
                          {genres.map((name) => {
                            return (
                              <span
                                key={name}
                                onClick={() => onGenreClick(name)}
                                className="rounded-md bg-slate-200 p-1 cursor-pointer hover:bg-slate-300">
                                {name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
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
                        onClick={() => handleClickGenreList(g)}
                        className={`p-2 hover:bg-gray-200 cursor-pointer ${
                          genres.find((name) => name === g.name) ? "bg-gray-300 font-bold" : ""
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
                    {isLoading ? (
                      <div role="status" className="flex w-full justify-center">
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      "Submit"
                    )}
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
              Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
