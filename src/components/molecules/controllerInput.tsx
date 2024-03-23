import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { TextInputProps } from "react-native";

import { InputComponent } from "../atoms/input";

interface ControllerInputProps<T extends FieldValues> extends TextInputProps {
  name: FieldPath<T>;
  label: string;
  control: Control<T>;
  type?: "text" | "password";
}

export function ControllerInput<T extends FieldValues>({
  name,
  type,
  label,
  control,
  ...props
}: ControllerInputProps<T>) {
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, value, disabled }, fieldState: { error, invalid } }) => (
        <InputComponent
          type={type}
          label={label}
          value={value}
          invalid={invalid}
          disabled={disabled}
          error={error?.message}
          onChangeText={onChange}
          {...props}
        />
      )}
      name={name}
    />
  );
}
