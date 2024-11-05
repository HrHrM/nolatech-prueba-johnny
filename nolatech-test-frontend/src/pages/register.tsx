import { EmployeeProfile } from "@/components/component/employee-profile";
import Header from "@/components//component/header";
import LoginForm from "@/components/component/login-form";
import RegisterForm from "@/components/component/register-form";

function Register() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 relative">
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
