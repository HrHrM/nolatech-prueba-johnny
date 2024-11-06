import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "../ui/loader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import backgroundImage from "../../assets/backgroundImage.jpg";
import profile from "../../assets/2.png";
import { service } from "@/services/service";
import endpoints from "@/utils/endpoints";
import { RootState } from '../../redux/store/store';

export function EmployeeProfile() {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentID = useSelector((state: RootState) => state.auth.id);
  const currentRole = useSelector((state: RootState) => state.auth.role);
  let currentName = useSelector((state: RootState) => state.auth.name);

  const fetchEmployeeData = async () => {
    setLoading(true);
    try {
      const response = await service.get(
        `${endpoints.endpoints.evaluations_employee}${currentID}/`
      );
      const data = await response.json();
      setEvaluations(data);
      // console.log("Evaluations:", data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [currentID]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm opacity-30"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="relative z-10 p-8">
        <div className="animate__animated animate__fadeIn container mx-auto flex flex-col md:flex-row gap-6">
          {/* Left Profile Card */}
          <div className="md:w-1/3">
            <Card className="p-4 shadow-lg">
              <div className="flex flex-col items-center">
                <img
                  src={profile}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mb-4 border-2 border-gray-300"
                />
                <h2 className="text-xl font-semibold mb-2">{currentName || 'John Doe'}</h2>
                <p className="text-gray-600">Role: {currentRole}</p>
                <div className="mt-4 w-full text-left space-y-2">
                  <p className="flex justify-between">
                    <span>Evaluations applied:</span>
                    <span className="text-purple-700 font-bold">32</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Evaluations completed:</span>
                    <span className="text-orange-600 font-bold">26</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Evaluations awaiting:</span>
                    <span className="text-green-600 font-bold">6</span>
                  </p>
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  View Public Profile
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Content - Account Settings */}
          <div className="md:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>Evaluations Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-4">Evaluations History</h3>
                {evaluations.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Score</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {evaluations.map((item: any) => (
                        <TableRow key={item._id}>
                          <TableCell>{item.score}</TableCell>
                          <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button variant="outline" onClick={() => null}>
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p>No evaluations found.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
