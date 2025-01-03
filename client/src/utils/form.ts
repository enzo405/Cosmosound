import { FieldValues } from "react-hook-form";

type DirtyFields<T> = {
  [K in keyof T]?: boolean | DirtyFields<T[K]>;
};

export const getDirtyFieldsValue = <TFieldValues extends FieldValues>(
  dirtyFields: DirtyFields<TFieldValues>,
  fieldsValue: TFieldValues,
): Partial<TFieldValues> => {
  const data: Partial<TFieldValues> = {};
  for (const [fieldName, fieldIsDirty] of Object.entries(dirtyFields)) {
    if (fieldIsDirty) {
      data[fieldName as keyof TFieldValues] = fieldsValue[fieldName as keyof TFieldValues];
    }
  }
  return data;
};
