import { ReactElement, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Container from "components/box/Container";
import { Icon } from "components/icons/Icon";
import UserService from "services/userService";
import { useConfirmDialog } from "hooks/useConfirm";
import { useUser } from "hooks/useUser";
import { displayPictureProfile } from "utils/user";
import { enqueueSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import SettingsOptions from "components/settings/SettingsOptions";
import { routesConfig } from "config/app-config";
import { getDirtyFieldsValue } from "utils/form";
import PlaylistLink from "./components/PlaylistLink";

export interface AccountFormData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  image?: File;
}

function AccountPage(): ReactElement {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  if (!user) navigate("/");

  const { openDialog } = useConfirmDialog();

  const [isEditing, setIsEditing] = useState(false);
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
    formState: { errors, isDirty, dirtyFields },
  } = useForm<AccountFormData>({
    defaultValues: {
      username: user?.name,
      email: user?.email,
      password: "",
      confirmPassword: "",
      image: undefined,
    },
  });

  const toggleEditAccount = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    reset({
      username: user?.name,
      email: user?.email,
      password: "",
      confirmPassword: "",
      image: undefined,
    });
  }, [user]);

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
    const dirtyFieldsValue = getDirtyFieldsValue(dirtyFields, data);

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
        await UserService.updateAccount(dirtyFieldsValue)
          .then((user) => {
            enqueueSnackbar("Account updated", { variant: "success" });
            setUser(user);
          })
          .catch((err) => {
            const defaultErrMessage = "An error occured while trying to update your account";
            if (err instanceof AxiosError) {
              setError(err.response?.data.error || defaultErrMessage);
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
    <div className="flex flex-col w-full">
      {user?.role === "USER" && (
        <div className="flex flex-col items-center sm:items-start mt-4 w-full">
          <span className="text-2xl font-bs font-bold text-dark-custom ml-2">Become an Artist</span>
          <Container className="h-full w-5/6 sm:w-min sm:min-w-96 p-2">
            <SettingsOptions
              className="cursor-pointer gap-2 text-dark-grey text-base"
              onClick={() => navigate(routesConfig.artistPanel.path)}>
              <Icon iconName="artistPanel" className="mr-1 w-5 h-5" />
              Go to Artist Panel
            </SettingsOptions>
          </Container>
        </div>
      )}
      <div className="flex flex-col items-center sm:items-start mt-4 w-full">
        <span className="flex flex-row items-center gap-2 text-4xl font-bs font-bold text-dark-custom ml-2">
          Account
          <span className="cursor-pointer" onClick={toggleEditAccount}>
            <Icon className="mm-size-6 fill-dark-custom hover:fill-dark-glassy" iconName="pencil" />
          </span>
        </span>
        <Container className="h-full w-5/6 sm:w-min sm:min-w-96 p-6 md:p-8">
          {isEditing ? (
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
                          Password must be at least <b className="text-gray-600">8 Characters</b>{" "}
                          and must contain at least a{" "}
                          <b className="text-gray-600">Capital Letter</b>, a{" "}
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
                        <label
                          htmlFor="confirmPassword"
                          className="text-sm font-medium text-gray-700">
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
                          Password must be at least <b className="text-gray-600">8 Characters</b>{" "}
                          and must contain at least a{" "}
                          <b className="text-gray-600">Capital Letter</b>, a{" "}
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
                      rules={{
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      }}
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
                            loading="eager"
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
              <div className="flex flex-col">
                {error && <span className="text-red-500 font-normal tracking-tight">{error}</span>}
                <div className="flex gap-4 mt-6 justify-end sm:justify-start">
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
              </div>
            </form>
          ) : (
            <div className="w-fit max-w-md p-2 sm:p-4 bg-gray-100 rounded-lg shadow-md">
              <div className="flex flex-col sm:flex-row items-center mb-4">
                <img
                  src={displayPictureProfile(user?.pictureProfile)}
                  alt={`${user?.name}'s profile`}
                  className="w-16 h-16 rounded-full border-2 border-blue-500"
                />
                <div className="ml-1 sm:ml-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">{user?.name}</h2>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-600">
                  <strong>Joined:</strong> {new Date(user?.createdAt!).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <strong>Followers:</strong> {user?.followers}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Liked Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {user?.likedGenres.slice(0, 6).map((genre) => (
                    <Link
                      key={genre}
                      className="px-3 py-1 hover:bg-blue-400 bg-blue-500 text-white text-sm rounded-full"
                      to={routesConfig.genres.getParameter(genre)}>
                      {genre}
                    </Link>
                  ))}
                  {user?.likedGenres && user.likedGenres.length > 6 && (
                    <Link
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
                      to={routesConfig.library.path}>
                      +{user.likedGenres.length - 6}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
      {user?.playlists && user.playlists?.length > 0 && (
        <div className="flex flex-col items-center sm:items-start mt-4 w-full">
          <span className="items-center gap-2 text-4xl font-bs font-bold text-dark-custom ml-2">
            Your Playlists
          </span>
          <Container className="h-full w-5/6 sm:w-min sm:min-w-96 p-6 md:p-8">
            <div className="w-full flex flex-col gap-4">
              {user?.playlists.map((playlist) => (
                <PlaylistLink key={playlist.id} playlist={playlist} />
              ))}
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}

export default AccountPage;
