import * as yup from "yup";

export const nameSchema = yup
  .string()
  .max(32)
  .required()
  .matches(/^[A-Z]|[А-ЯЁ]/, "name must start with an uppercase letter");
export const ageSchema = yup
  .number()
  .required("enter your age")
  .typeError("enter your age as a number")
  .positive("age must be positive")
  .integer()
  .max(100);
export const genderSchema = yup.string().required("choose your gender");
export const countrySchema = yup.string().required("type and select country");
export const emailSchema = yup.string().email().required("enter your e-mail");

export const imageSchemaFile = yup
  .mixed<File>()
  .required("attach a file")
  .test("fileFormat", "png and jpeg formats only", (value) => {
    return value.type === "image/png" || value.type === "image/jpeg";
  });
export const imageSchemaFileList = yup
  .mixed<FileList>()
  .required("attach a file")
  .test("fileFormat", "png and jpeg formats only", (value) => {
    return (
      value[0] &&
      (value[0].type === "image/png" || value[0].type === "image/jpeg")
    );
  });

export const termsConditionsSchema = yup
  .string()
  .required()
  .test("isAccepted", "Terms & Сonditions must be accepted", (value) => {
    return value === "true" ? true : false;
  });
