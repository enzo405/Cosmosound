import { ReactElement, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Container from "components/box/Container";
import { Icon } from "components/icons/Icon";
import UserService from "services/userService";
import { useConfirmDialog } from "hooks/useConfirm";
import { useUser } from "hooks/useUser";
import { displayPictureProfile } from "utils/user";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export interface AccountFormData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  image?: File;
}

function AccountPage(): ReactElement {
  const { user } = useUser();
  const navigate = useNavigate();
  if (!user) navigate("/");

  const { openDialog } = useConfirmDialog();

  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(displayPictureProfile(user?.pictureProfile));
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm<AccountFormData>({
    defaultValues: {
      username: user?.name,
      email: user?.email,
      password: "",
      confirmPassword: "",
      image: undefined,
    },
  });

  const password = watch("password");

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("image", file, { shouldDirty: true });
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: AccountFormData) => {
    const { email, password, username, image } = data;

    const description = (
      <div className="flex flex-col">
        {username != user?.name && <p>New Username: {username}</p>}
        {email != user?.email && <p>New Email: {email}</p>}
        {password && <p>Password: Updated</p>}
        {image && <p>Profile Picture: {typeof image === "string" ? image : image.name}</p>}
        {!email && !password && !username && !image && <p>No changes were made.</p>}
      </div>
    );

    openDialog({
      title: "Are you sure?",
      description: description,
      onConfirm: async () =>
        await UserService.saveData(data, user!)
          .then(() => {
            enqueueSnackbar("Account updated", { variant: "success" });
          })
          .catch((err) => {
            const defaultErrMessage = "An error occured while trying to update your account";
            if (err instanceof AxiosError) {
              setError(err.response?.data?.message || defaultErrMessage);
            } else {
              setError(defaultErrMessage);
            }
            enqueueSnackbar(defaultErrMessage, {
              variant: "error",
            });
          }),
    });
  };

  return (
    <div className="flex flex-col items-center sm:items-start mt-4 w-full">
      <span className="text-4xl font-bs font-bold text-dark-custom ml-2">Account</span>
      <Container className="h-full w-5/6 sm:w-min sm:min-w-96 p-6 md:p-8">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-14 lg:gap-24 xl:gap-32">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Username
                </label>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="username"
                      placeholder="Enter username"
                      className="mt-1 text-dark-custom px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertio-orange focus:outline-none"
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center">
                      <Icon className="mm-size-5 fill-dark-custom" iconName="lock" />
                    </span>
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters long.",
                        },
                        pattern: {
                          value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                          message:
                            "Password must contain at least one uppercase letter, one number, and one special character.",
                        },
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          id="password"
                          placeholder="Enter new password"
                          className={`px-10 text-dark-custom py-3 border ${
                            errors.password ? "border-red-500" : "border-gray-300"
                          } rounded-lg w-full focus:ring-2 focus:ring-tertio-orange focus:outline-none`}
                        />
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-0 h-full inset-y-0 right-3 flex items-center text-gray-500">
                      <Icon
                        className="mm-size-5 fill-dark-custom"
                        iconName={showPassword ? "eye" : "eye-blocked"}
                      />
                    </button>
                  </div>
                  {!password && (
                    <span className="text-xs text-gray-500 mt-1">
                      Password must be at least <b className="text-gray-600">8 Characters</b> and
                      must contain at least a <b className="text-gray-600">Capital Letter</b>, a{" "}
                      <b className="text-gray-600">Number</b>, and a{" "}
                      <b className="text-gray-600">Special Character</b>.
                    </span>
                  )}
                  {errors.password && (
                    <span className="text-xs text-red-500 mt-1">{errors.password.message}</span>
                  )}
                </div>

                {password && (
                  <div className="flex flex-col">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center">
                        <Icon className="mm-size-5 fill-dark-custom" iconName="lock" />
                      </span>
                      <Controller
                        name="confirmPassword"
                        control={control}
                        rules={{
                          required: "Confirm Password is required.",
                          validate: (value) =>
                            value === getValues("password") || "Passwords do not match.",
                        }}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm password"
                            className={`px-10 text-dark-custom py-3 border ${
                              errors.confirmPassword ? "border-red-500" : "border-gray-300"
                            } rounded-lg w-full focus:ring-2 focus:ring-tertio-orange focus:outline-none`}
                          />
                        )}
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      Password must be at least <b className="text-gray-600">8 Characters</b> and
                      must contain at least a <b className="text-gray-600">Capital Letter</b>, a{" "}
                      <b className="text-gray-600">Number</b>, and a{" "}
                      <b className="text-gray-600">Special Character</b>.
                    </span>
                    {errors.confirmPassword && (
                      <span className="text-xs text-red-500 mt-1">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      className="mt-1 px-5 text-dark-custom py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tertio-orange focus:outline-none"
                    />
                  )}
                />
              </div>
            </div>
            <div className="w-full flex justify-end">
              <Controller
                name="image"
                control={control}
                render={() => (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      id="profileImage"
                      className="hidden"
                      onChange={onImageChange}
                    />
                    <label
                      htmlFor="profileImage"
                      className="relative w-min h-min cursor-pointer hover:opacity-90 flex justify-end">
                      <img
                        src="/img/form/edit-background.png"
                        alt="Edit background"
                        className="absolute z-10 top-0 right-0 mm-size-20 md:mm-size-32 opacity-90"
                      />
                      <img
                        src={preview}
                        alt="Profile"
                        className="mm-size-20 md:mm-size-32 rounded-full border border-gray-300 object-cover"
                      />
                    </label>
                  </>
                )}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-6 justify-end sm:justify-start">
            {error && <span className="text-red-500 font-normal tracking-tight">{error}</span>}
            <button
              onClick={() => reset()}
              type="button"
              className="px-4 py-2 text-tertio-orange border-2 border-tertio-orange rounded-lg hover:bg-secondary-orange">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isDirty}
              className={`px-5 py-3 rounded-lg text-white ${
                isDirty
                  ? "bg-tertio-orange hover:bg-primary-orange"
                  : "bg-gray-300 cursor-not-allowed"
              }`}>
              Save
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default AccountPage;
