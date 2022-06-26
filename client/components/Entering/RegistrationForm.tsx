import MainSvg from "../svg/MainSvg";
import PasswordSvg from "../svg/PasswordSvg";
import { SubmitHandler, useForm } from "react-hook-form";
import { tabs } from "../../sections/EnterSection";
import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeInMotion } from "../../motions/FadeMotion";

interface IRegisterForm {
  activeTab: tabs;
  setActiveTab: Dispatch<SetStateAction<tabs>>;
}

interface Inputs {
  Email: string;
  Password: string;
}

const RegistrationForm = ({ activeTab, setActiveTab }: IRegisterForm) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();
  // { resolver: yupResolver(schema) }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <AnimatePresence>
      {activeTab == 1 && (
        <motion.div
          variants={FadeInMotion()}
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0}
          className={"RegisterWindow"}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <motion.span variants={FadeInMotion(1)}>
              To register please input your Innopolis email and password.
            </motion.span>
            <motion.h3 variants={FadeInMotion(2)}>Welcome</motion.h3>
            <motion.div variants={FadeInMotion(3)} className="inputWrapper">
              {errors.Email ? (
                <p className="errorLabel">{errors.Email?.message}</p>
              ) : null}
              <MainSvg />
              <input
                placeholder="Enter your email address"
                {...register("Email", { required: true })}
                type="text"
              />
            </motion.div>

            <motion.div variants={FadeInMotion(4)} className="inputWrapper">
              <PasswordSvg />
              <input
                placeholder="Enter your password"
                {...register("Password", { required: true })}
                type="password"
              />
            </motion.div>
            <motion.button variants={FadeInMotion(5)} type="submit">
              Log In
            </motion.button>
            <motion.p variants={FadeInMotion(6)} className="switcher">
              Already registered?{" "}
              <span onClick={() => setActiveTab(0)}>Login.</span>
            </motion.p>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationForm;
