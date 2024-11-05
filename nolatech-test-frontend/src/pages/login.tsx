import { EmployeeProfile } from "@/components/component/employee-profile";
import Header from "@/components//component/header";
import LoginForm from "@/components/component/login-form";

function Login() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 relative">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
