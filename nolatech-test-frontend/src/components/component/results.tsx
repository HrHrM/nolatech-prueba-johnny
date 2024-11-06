import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import backgroundImage from "../../assets/backgroundImage.jpg";

import { toast, ToastContainer } from "react-toastify";
import endpoints from "@/utils/endpoints";
import { service } from "@/services/service";
import { Input } from "../ui/input";

export function EmployeeSearchAndResults() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFirstSearch, setIsFirstSearch] = useState<boolean>(true);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Solicitar Empleados
  const fetchEmployees = async () => {
    // console.log("### REQUEST EMPLOYEES");
    setLoading(true);
    try {
      // Usamos el servicio `service.get` en lugar de `fetch` directamente
      const response = await service.get(`${endpoints.endpoints.employees}`);
      const data = await response.json();
      // console.log("### DATA", data);

      // Actualizamos el estado con los empleados y el total
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = Array.isArray(employees)
    ? employees.filter((employee) =>
        Object.values(employee).some((value: any) =>
          value.toString().toLowerCase().includes(filterText.toLowerCase())
        )
      )
    : [];

  const handleFilter = (event: any) => {
    setFilterText(event.target.value);
  };

  const fetchEvaluationData = async (
    employeeId: string
  ): Promise<any | null> => {
    try {
      const response = await service.get(
        `${endpoints.endpoints.evaluations_results}${employeeId}`
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching evaluation results:", error);
      toast("There are no evaluations for this user");
      return null;
    }
  };

  const exportToExcel = async (employeeID: string, username: string) => {
    // console.log("ID:", employeeID);
  
    // Fetch evaluation data
    const evaluationData = await fetchEvaluationData(employeeID);
    // console.log("RESPONSE:", evaluationData);
  
    // Check if evaluationData has results
    if (
      !evaluationData ||
      !evaluationData.averageScore ||
      !evaluationData.evaluationsCount ||
      Object.keys(evaluationData).length === 0
    ) {
      toast("There are no evaluations for this user");
      return; // Exit the function if no data is found
    }
  
    // Prepare data for export
    const exportData = [
      {
        "Employee ID": username,
        "Average Score": evaluationData.averageScore,
        "Evaluations Count": evaluationData.evaluationsCount,
      },
    ];
  
    // Create and write the workbook
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Evaluations");
    XLSX.writeFile(workbook, "employee_evaluations.xlsx");
  };
  

  return (
    <div className="relative min-h-full">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm opacity-40"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800 opacity-70"></div>
      </div>
      <div className="relative z-10 p-6 backdrop-blur-sm">
        <Card className="animate__animated animate__fadeIn w-full shadow-xl rounded-lg bg-white/80 backdrop-blur-lg">
          <CardHeader className="border-b border-gray-200 p-4">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Search Employee Evaluations
            </CardTitle>
            <CardDescription className="text-gray-600">
              Search for employees and see their evaluation statistics.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Input
                type="text"
                placeholder="Search for an employee..."
                aria-label="Search for employee by name or email"
                value={filterText}
                onChange={handleFilter}
                className="flex-1"
                id="search"
              />
              {/* <InputField
                id="search"
                type="search"
                placeholder="Search employees..."
                className="pl-10"
                value={filterText}
                onChange={handleFilter}
              /> */}
              {/* <Button
                variant="default"
                onClick={handleSearch}
                className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:from-purple-600 hover:to-purple-800 transition"
              >
                Search
              </Button> */}
              {/* {employees.length > 0 && (
                <Button
                  variant="secondary"
                  onClick={exportToExcel}
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-green-600 hover:to-green-800 transition"
                >
                  Export current search to Excel
                </Button>
              )} */}
            </div>

            {loading && (
              <div className="flex justify-center items-center py-6">
                <Loader aria-label="Loading employees..." />
              </div>
            )}

            <div className="mt-6">
              {!loading && employees.length === 0 && !isFirstSearch && (
                <p className="text-center text-gray-500">
                  No employees found matching your search.
                </p>
              )}

              {employees.length > 0 && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredEmployees.map((employee) => (
                    <div
                      key={employee._id}
                      className="relative p-4 border border-gray-300 rounded-lg shadow-lg bg-white/90 hover:shadow-xl transition focus-within:outline focus-within:outline-blue-600"
                      role="region"
                      aria-labelledby={`employee-${employee._id}`}
                    >
                      <button
                        onClick={() =>
                          exportToExcel(employee._id, employee.username)
                        }
                        className="absolute bottom-2 right-2 p-2 bg-purple-700 text-white rounded-full shadow-sm hover:bg-purple-400 transition-transform duration-200 transform hover:scale-105"
                        aria-label="Export results"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3h18M3 9h18m-9 6h9m-12 6l-6-6h6m-6 0v6"
                          />
                        </svg>
                      </button>
                      <h3
                        id={`employee-${employee._id}`}
                        className="text-lg font-semibold mb-2 text-gray-900"
                      >
                        {employee.username}{" "}
                        <span className="text-sm text-gray-600">
                          (info@example.com)
                        </span>
                      </h3>
                      <p className="text-gray-700">Role: {employee.role}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <ToastContainer />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
