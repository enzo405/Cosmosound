import React, { ReactElement } from "react";
import { Control, Controller } from "react-hook-form";

interface MediaLinkInputProps {
  name: string;
  icon: React.ReactNode;
  control: Control;
  placeholder: string;
  hostname?: string;
}

export default function MediaLinkInput({
  icon,
  name,
  control,
  placeholder,
  hostname,
}: MediaLinkInputProps): ReactElement {
  const hostnameRegex = hostname
    ? new RegExp(`^(https?://)?(www\\.)?${hostname.replace(/\./g, "\\.")}(/.*)?$`)
    : undefined;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 items-center">
        <label
          htmlFor={name}
          className="text-sm font-medium mm-size-8 flex justify-center text-gray-700">
          {icon}
        </label>
        <Controller
          name={name}
          control={control}
          rules={{
            pattern: hostnameRegex
              ? {
                  value: hostnameRegex,
                  message: `The URL must belong to ${hostname}`,
                }
              : undefined,
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <input
                {...field}
                type="text"
                id={name}
                placeholder={placeholder}
                className={`mt-1 text-dark-custom px-4 py-2 border rounded-lg focus:ring-1 focus:ring-primary-orange focus:outline-none ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
            </>
          )}
        />
      </div>
    </div>
  );
}
