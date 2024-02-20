import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Link } from "react-router-dom";
import { useState } from "react";
import http from "../utils/http";
import { useNavigate } from "react-router-dom";


//Image & Icon Imports
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import sequenceLogo from "../assets/sequence-logo_new.svg";


type FormValues = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const Register = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const navigate = useNavigate();
  const form = useForm<FormValues>();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = form;

  const onSubmit = async (data: FormValues) => {
    try {
      await http.get("/sanctum/csrf-cookie");
      const response = await http.post("/register", data);

      const { username } = response.data;

      // console.log(response.data);
      // console.log(username);
      navigate("/login", {
        state: { accountCreated: true, username },
      });
    } catch (exception: any) {
      const errors = exception.response.data.errors;

      for (let [fieldName, errorList] of Object.entries(errors)) {
        type Field = "username" | "email" | "password" | "root";
        const errors = (errorList as any[]).map((message) => ({ message }));
        console.log(fieldName, errors);
        setError(fieldName as Field, errors[0]);
      }
    }
  };
  // Wird ausgeführt wenn Fehler vorhanden sind
  const onError = () => {
    console.log("Form error");
  };

  const togglePasswordVisibility = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setPasswordIsVisible(!passwordIsVisible);
  };

  return (
    <>
      <section className="landingpage">
        <img
          className="sequence-logo-form"
          src={sequenceLogo}
          alt="Sequence Logo"
        />
        <section className="headline-form-section">
          <h1 className="form-headline">Create your free account</h1>
          <p>Discover the Ultimate Samples to Transform Your Tracks.</p>
        </section>

        <section className="form-section">
          <form
            className="form"
            onSubmit={handleSubmit(onSubmit, onError)}
            noValidate
          >
            <label htmlFor="Username">Username:</label>
            <input
              type="text"
              // aria-onInvalid={errors.email ? "true" : "false"}
              {...register("username", {
                required: {
                  value: true,
                  message: "Please enter a username",
                },
              })}
            />
            <p className="error-message">{errors.username?.message}</p>

            <label htmlFor="E-Mail">E-Mail:</label>

            <input
              type="email"
              // aria-onInvalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: {
                  value: true,
                  message: "Please enter an email adress",
                },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            <p className="error-message">{errors.email?.message}</p>

            <label htmlFor="Password">Password:</label>
            <div className="input-container">
              <input
                type={passwordIsVisible ? "text" : "password"}
                // aria-onInvalid={errors.password ? "true" : "false"}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter a password",
                  },
                })}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="toggle-password-visibility"
              >
                {!passwordIsVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </div>
            <p className="error-message">{errors.password?.message}</p>

            <label htmlFor="password_confirmation">Repeat Password:</label>
            <div className="input-container">
              <input
                type={passwordIsVisible ? "text" : "password"}
                // aria-onInvalid={errors.password ? "true" : "false"}
                {...register("password_confirmation", {
                  required: {
                    value: true,
                    message: "Please confirm your password",
                  },
                  validate: (value) =>
                    value === form.getValues().password ||
                    "The passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="toggle-password-visibility"
              >
                {!passwordIsVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </div>

            <p className="error-message">
              {errors.password_confirmation?.message}
            </p>
            <p className="error-message">{errors.root?.message}</p>

            <button
              className="submit-btn margin-auto-center"
              disabled={isSubmitting}
            >
              Register
            </button>
            <p>
              Already have an account?
              <Link to="/login" className="margin-l-s">
                Login here
              </Link>
            </p>
          </form>

          <DevTool control={control} />
        </section>
      </section>
    </>
  );
};

export default Register;
