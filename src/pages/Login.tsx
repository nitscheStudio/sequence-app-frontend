import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const form = useForm<FormValues>();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  // Wird ausgeführt wenn alle Felder korrekt validiert sind
  const onSubmit = async () => {
    console.log("Form submit");
  };

  // Wird ausgeführt wenn Fehler vorhanden sind
  const onError = () => {
    console.log("Form error");
  };
  return (
    <>
      <h1 className="form-headline">Login To Your Account</h1>
      <section className="form-section">
        <form
          className="form"
          onSubmit={handleSubmit(onSubmit, onError)}
          noValidate
        >
          <label htmlFor="">E-Mail:</label>
          <input
            type="email"
            aria-onInvalid={errors.email ? "true" : "false"}
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

          <label htmlFor="">Password:</label>
          <input
            type="password"
            aria-onInvalid={errors.password ? "true" : "false"}
            {...register("password", {
              required: {
                value: true,
                message: "Please enter a password",
              },
            })}
          />
          <p className="error-message">{errors.password?.message}</p>

          <button disabled={isSubmitting}>Login</button>
        </form>
        <DevTool control={control} />
      </section>
    </>
  );
};

export default Login;
