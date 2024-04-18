import { useForm, SubmitHandler } from "react-hook-form";
import { useAppStore } from "../../store/app-store";
import { validatePassword } from "../../utils/validate-password";
import { getPasswordStrength } from "../../utils/password-strength";
import { useState } from "react";

type InputFields = {
  email: string;
  password: string;
};

type RegisterFormProps = {
  isSettingSet: boolean;
  handleOnSubmit: (data: InputFields) => void;
};

const RegistrationForm = (props: RegisterFormProps) => {
  const { isSettingSet, handleOnSubmit } = props;
  const settings = useAppStore((state) => state.setting);
  const [passwordStrength, setPasswordStrength] = useState("");
  const passwordValidationPattern = validatePassword(settings);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<InputFields>({ mode: "onChange" });
  const onSubmit: SubmitHandler<InputFields> = (data) => handleOnSubmit(data);

  return (
    <div className=" w-96 mx-auto">
      <h2 className="mb-5 text-xl text-center">Registration Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              disabled={!isSettingSet}
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
          </label>
          {errors.email && (
            <p role="alert" className=" text-red-500 text-[12px]">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              disabled={!isSettingSet}
              {...register("password", {
                required: true,
                pattern: {
                  value: new RegExp(`^${passwordValidationPattern}$`),
                  message: "Password not valid",
                },
                onChange: (e) => {
                  const passwordStrength = getPasswordStrength(e.target.value);
                  setPasswordStrength(passwordStrength);
                },
              })}
            />
            <span>{passwordStrength}</span>
          </label>
          {errors.password && (
            <p className=" text-red-500 text-[12px]">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          className="btn btn-primary btn-block"
          disabled={!isValid || !isSettingSet}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
