import { useState } from "react";
import styles from "./Forms.module.scss";
import * as yup from "yup";

import { Link, useNavigate } from "react-router-dom";
import { definePasswordStrength, toBase64 } from "./utils/functions";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useDispatch } from "react-redux";
import { FormDataType, setFormData } from "./formDataSlice";
import useCountrySelector from "../../app/hookCountrySelector";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ageSchema,
  countrySchema,
  emailSchema,
  genderSchema,
  imageSchemaFileList,
  nameSchema,
  termsConditionsSchema,
} from "./utils/validationScheme";

function CtrlForm(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formDataArr = useAppSelector(
    (state: RootState) => state.formData.formData,
  );
  const countryList = useAppSelector(
    (state: RootState) => state.formData.countryList,
  );

  const { countries, selectCountry, handleValueChange } = useCountrySelector();
  const [strength, setStrength] = useState({
    color: "darkred",
    fullness: "5%",
  });

  const validationSchema = yup.object().shape({
    name: nameSchema,
    age: ageSchema,
    gender: genderSchema,
    country: countrySchema,
    email: emailSchema,
    password: yup
      .string()
      .required("enter your password")
      .matches(/[0-9]/, "at least 1 number")
      .matches(/[a-z]/, "at least 1 lowercase character")
      .matches(/[A-Z]/, "at least 1 uppercase character")
      .matches(/[@$!%*?&()_+\-=\[\]{};]/, "at least 1 special character")
      .test("passwordStrength", `weak password`, function (value) {
        const passwordStrength = definePasswordStrength(value);
        setStrength(passwordStrength);
        return passwordStrength.fullness === "100%" ? true : false;
      }),
    confirmPassword: yup
      .string()
      .required("enter your password")
      .oneOf([yup.ref("password")], "passwords must match"),
    image: imageSchemaFileList,
    termsConditions: termsConditionsSchema,
  });

  const form = useForm({ resolver: yupResolver(validationSchema) });
  const { register, control, handleSubmit, formState, reset, setValue } = form;
  const { errors, isDirty } = formState;

  const onFormSubmit = (data: FormDataType): void => {
    validationSchema.validate(data).then((valid) => {
      if (valid) {
        const fileList = data.image as FileList;
        toBase64(fileList[0]).then((result) => {
          data.image = result as string;
          dispatch(setFormData(formDataArr.concat(data)));
          navigate("/main");
        });
        reset();
      } else {
        console.log("Form validation failed");
      }
    });
  };

  return (
    <>
      <div className={styles.title}>CONTROLLED FORM</div>
      <Link className={styles.backButton} to={"/main"}>
        ← BACK
      </Link>
      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <div className={styles.fieldsContainer}>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" {...register("name")}></input>
          </div>
          {errors.name && (
            <p className={styles.errorMessage}>{errors.name.message}</p>
          )}
          <div className={styles.field}>
            <label htmlFor="age">Age</label>
            <input type="text" id="age" {...register("age")}></input>
          </div>
          {errors.age && (
            <p className={styles.errorMessage}>{errors.age.message}</p>
          )}
          <div className={styles.field}>
            <label>Gender</label>
            <div className={styles.genderContainer}>
              <input
                type="radio"
                id="male"
                value="male"
                {...register("gender")}
                className={styles.radio}
              ></input>
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="female"
                value="female"
                {...register("gender")}
                className={styles.radio}
              ></input>
              <label htmlFor="female">Female</label>
            </div>
          </div>
          {errors.gender && (
            <p className={styles.errorMessage}>{errors.gender.message}</p>
          )}
          <div className={styles.field}>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              {...register("country")}
              onChange={(e) => {
                handleValueChange(e.target.value, countryList);
              }}
            ></input>
            <div className={styles.countries}>
              {countries.map((country) => (
                <div
                  className={styles.country}
                  key={country}
                  onClick={() => {
                    selectCountry(country);
                    setValue("country", country, {
                      shouldValidate: true,
                    });
                  }}
                >
                  {country}
                </div>
              ))}
            </div>
          </div>
          {errors.country && (
            <p className={styles.errorMessage}>{errors.country.message}</p>
          )}
          <div className={styles.divider}></div>
          <div className={styles.field}>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" {...register("email")}></input>
          </div>
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email.message}</p>
          )}
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password")}
            ></input>
          </div>
          <div className={styles.strengthBar}>
            <div
              className={styles.strength}
              style={{
                backgroundColor: strength.color,
                width: strength.fullness,
              }}
            ></div>
          </div>
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          )}
          <div className={styles.field}>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
            ></input>
          </div>
          {errors.confirmPassword && (
            <p className={styles.errorMessage}>
              {errors.confirmPassword.message}
            </p>
          )}
          <div className={styles.divider}></div>
          <div className={styles.field}>
            <label htmlFor="image">Image</label>
            <input type="file" id="image" {...register("image")}></input>
          </div>
          {errors.image && (
            <p className={styles.errorMessage}>{errors.image.message}</p>
          )}
          <div className={styles.field}>
            <label htmlFor="termsConditions">Terms & Сonditions</label>
            <input
              type="checkbox"
              id="termsConditions"
              {...register("termsConditions")}
              className={styles.terms}
            ></input>
          </div>
          {errors.termsConditions && (
            <p className={styles.errorMessage}>
              {errors.termsConditions.message}
            </p>
          )}
        </div>
        <button
          disabled={!isDirty}
          type="submit"
          className={styles.submitButton}
        >
          SUBMIT
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
}

export default CtrlForm;
