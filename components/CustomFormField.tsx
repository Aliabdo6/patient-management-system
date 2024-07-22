"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import React from "react";
import Image from "next/image";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (
    field: any
  ) => React.ReactNode;
}

type E164Number = string;
const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomProps;
}) => {
  const {
    control,
    fieldType,
    name,
    label,
    placeholder,
    iconSrc = "", // Provide a default value for iconSrc
    iconAlt,
    disabled,
  } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className=" flex rounded-md  border border-dark-500 bg-dark-400  ">
          <Image
            src={iconSrc}
            alt={iconAlt || "icon"}
            width={24}
            height={24}
            className="ml-2"
          />
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              className=" shad-input border-0  "
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="EG"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={
              field.value as
                | E164Number
                | undefined
            }
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
  }
};

export default function CustomFormField(
  props: CustomProps
) {
  const { control, fieldType, name, label } =
    props;
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className=" flex-1 ">
            {fieldType !==
              FormFieldType.CHECKBOX &&
              label && (
                <FormLabel> {label} </FormLabel>
              )}
            <RenderField
              field={field}
              props={props}
            />
            <FormMessage className=" shad-error " />
          </FormItem>
        )}
      />
    </>
  );
}
