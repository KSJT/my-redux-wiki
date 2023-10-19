import React, { FC } from "react";
import styles from "./Form.module.scss";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const userEmail = {
  required: "이메일을 입력해주세요.",
  pattern: {
    value:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: "이메일 형식이 올바르지 않습니다.",
  },
};

const userPassword = {
  required: "비밀번호를 입력해주세요.",
  minLength: {
    value: 6,
    message: "6글자 이상 입력해주세요.",
  },
  maxLength: {
    value: 13,
    message: "13글자 이하로 입력해주세요.",
  },
};

type FormProps = {
  title: string;
  button: string;
  getDataForm: (email: string, password: string) => void;
  firebaseError: string;
};

type Inputs = {
  email: string;
  password: string;
};

const Form: FC<FormProps> = ({
  title,
  button,
  getDataForm,
  firebaseError,
}: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ mode: "onSubmit" });
  // react hook form 에서 정해준 타입 지정 방식을 이용해서 useForm에 input type을 넣어준다

  const onSubmit: SubmitHandler<FieldValues> = ({ email, password }) => {
    // react hook form에서 제공해주는 타입 사용
    console.log(email, password);
    getDataForm(email, password);
    reset();
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <p>{title}</p>
        <input
          {...register("email", userEmail)}
          type="email"
          placeholder="abc@gmail.com"
        />
        {errors?.email && (
          <span className={styles.form_error}>{errors?.email?.message}</span>
        )}
        <input
          {...register("password", userPassword)}
          type="password"
          placeholder="password"
        />
        {errors?.password && (
          <span className={styles.form_error}>{errors?.password?.message}</span>
        )}
        <button className={styles.form_button} type="submit">
          {button}
        </button>
        {firebaseError && (
          <span className={styles.form_error}>{firebaseError}</span>
        )}
      </form>
    </>
  );
};

export default Form;
