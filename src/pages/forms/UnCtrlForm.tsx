import { useRef, useState } from "react";
import styles from "./Forms.module.scss";
import * as yup from "yup";

import { Link, useNavigate } from "react-router-dom";
import { definePasswordStrength } from "./definePasswordStrength";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useDispatch } from "react-redux";
import { FormDataType, setFormData } from "./formDataSlice";

interface Errors {
  [key: string]: string;
}

function UnCtrlForm(): JSX.Element {
  const formRef = useRef<HTMLFormElement | null>(null);
  const inputRefAge = useRef<HTMLInputElement | null>(null);
  const inputRefMale = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const formDataArr = useAppSelector(
    (state: RootState) => state.formData.formData,
  );

  const [errors, setErrors] = useState<Errors>({});
  const [strength, setStrength] = useState({
    color: "darkred",
    fullness: "5%",
  });

  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .max(32)
      .required()
      .matches(/^[A-Z]/, "name must start with an uppercase letter"),
    age: yup
      .number()
      .typeError("enter your age as a number")
      .positive("age must be positive")
      .integer()
      .max(100),
    gender: yup.string().required("choose your gender"),
    country: yup.string().required("enter your country"),
    email: yup.string().email().required("enter your e-mail"),
    password: yup
      .string()
      .required("enter your password")
      .test("passwordStrength", `weak password`, function (value) {
        const passwordStrength = definePasswordStrength(value);
        setStrength(passwordStrength);
        return passwordStrength.fullness === "100%" ? true : false;
      })
      .matches(/[0-9]/, "at least 1 number")
      .matches(/[a-z]/, "at least 1 lowercase character")
      .matches(/[A-Z]/, "at least 1 uppercase character")
      .matches(/[@$!%*?&()_+\-=\[\]{};]/, "at least 1 special character"),
    confirmPassword: yup
      .string()
      .required("enter your password")
      .oneOf([yup.ref("password")], "passwords must match"),
    image: yup.string().required("image is required"),
    termsConditions: yup
      .string()
      .required("Terms & Сonditions must be accepted"),
  });

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setStrength({ color: "darkred", fullness: "5%" });
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      validationSchema
        .validate(Object.fromEntries(formData), {
          abortEarly: false,
        })
        .then((valid) => {
          if (valid) {
            const formDataObj = Object.fromEntries(formData) as FormDataType;
            const newFormDataArr = formDataArr.concat(formDataObj);
            dispatch(setFormData(newFormDataArr));
            console.log(Object.fromEntries(formData));
            navigate("/main");
          } else {
            console.log("Form validation failed");
          }
        })
        .catch((error) => {
          if (error instanceof yup.ValidationError) {
            setErrors(
              error.inner.reduce((allErrors, currentError) => {
                allErrors[currentError.path as string] = currentError.message;
                return allErrors;
              }, {} as Errors),
            );
          }
          console.log("Validation error: ", error);
          console.log("Validation errors: ", errors);
        });
    }
  };

  return (
    <>
      <div className={styles.title}>UNCONTROLLED FORM</div>
      <Link className={styles.backButton} to={"/main"}>
        ← BACK
      </Link>
      <form ref={formRef} onSubmit={onFormSubmit} noValidate>
        <div className={styles.fieldsContainer}>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name"></input>
          </div>
          {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
          <div className={styles.field}>
            <label htmlFor="age">Age</label>
            <input type="text" id="age" name="age" ref={inputRefAge}></input>
          </div>
          {errors.age && <p className={styles.errorMessage}>{errors.age}</p>}
          <div className={styles.field}>
            <label>Gender</label>
            <div className={styles.genderContainer}>
              <input
                type="radio"
                id="male"
                value="male"
                name="gender"
                className={styles.radio}
                ref={inputRefMale}
              ></input>
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="female"
                value="female"
                name="gender"
                className={styles.radio}
              ></input>
              <label htmlFor="female">Female</label>
            </div>
          </div>
          {errors.gender && (
            <p className={styles.errorMessage}>{errors.gender}</p>
          )}
          <div className={styles.field}>
            <label htmlFor="country">Country</label>
            <input type="input" id="country" name="country"></input>
          </div>
          {errors.country && (
            <p className={styles.errorMessage}>{errors.country}</p>
          )}
          <div className={styles.divider}></div>
          <div className={styles.field}>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" name="email"></input>
          </div>
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email}</p>
          )}
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"></input>
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
            <p className={styles.errorMessage}>{errors.password}</p>
          )}
          <div className={styles.field}>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            ></input>
          </div>
          {errors.confirmPassword && (
            <p className={styles.errorMessage}>{errors.confirmPassword}</p>
          )}
          <div className={styles.divider}></div>
          <div className={styles.field}>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg"
            ></input>
          </div>
          {errors.image && (
            <p className={styles.errorMessage}>{errors.image}</p>
          )}
          <div className={styles.field}>
            <label htmlFor="termsConditions">Terms & Сonditions</label>
            <input
              type="checkbox"
              id="termsConditions"
              value="accepted"
              name="termsConditions"
              className={styles.terms}
            ></input>
          </div>
          {errors.termsConditions && (
            <p className={styles.errorMessage}>{errors.termsConditions}</p>
          )}
        </div>
        <button type="submit" className={styles.submitButton}>
          SUBMIT
        </button>
      </form>
    </>
  );
}

export default UnCtrlForm;
