import { EmployeeProfile } from "@/components/component/employee-profile";
import Header from "@/components//component/header";

function Profile() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 relative">
        <EmployeeProfile />
      </div>
    </div>
  );
}

export default Profile;
