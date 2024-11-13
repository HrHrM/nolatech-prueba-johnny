import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Pagination } from "../ui/pagination";
import { RootState } from "@/redux/store/store";
import endpoints from "@/utils/endpoints";
import { service } from "@/services/service";
import background from "@/assets/backgroundImage.jpg";
import { Input } from "../ui/input";
import { AddEmployeeModal } from "./add-employee-modal";
import { AddEvaluationModal } from "./add-evaluation-modal";

export function Home() {
  let currentRole = useSelector((state: RootState) => state.auth.role);
  const [employees, setEmployees] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sortColumn, setSortColumn] = useState("username");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [itemsPerPage] = useState<any>(10);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, itemsPerPage]);

  const fetchEmployees = async () => {
    setLoading(true);

    try {
      const response = await service.get(`${endpoints.endpoints.employees}`);
      const data = await response.json();
      setEmployees(data);
      setTotalEmployees(data.total || 0);
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

  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (column: any) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleFilter = (event: any) => {
    setFilterText(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm opacity-30"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <div className="relative z-10 p-4 md:p-6 lg:p-8 backdrop-blur-sm">
        <main className="flex-1">
          {currentRole && (
            <div className="grid gap-6">
              <Card className="animate__animated animate__fadeIn shadow-lg rounded-lg">
                <CardHeader className="p-4 md:p-6 border-b border-gray-200">
                  <CardTitle className="text-xl md:text-2xl font-semibold text-gray-800">
                    Employees
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    View and manage employee information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                    <div className="relative w-full max-w-md">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FiSearch />
                      </span>
                      <Input
                        id="search"
                        type="search"
                        placeholder="Search employees..."
                        className="pl-10"
                        value={filterText}
                        onChange={handleFilter}
                      />
                    </div>
                    <Button
                      variant="default"
                      className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:from-purple-600 hover:to-purple-800 transition"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Add Employee
                    </Button>
                  </div>
                  {loading ? (
                    <div className="flex justify-center items-center py-6">
                      <p className="text-gray-500 animate-pulse">
                        Loading employees...
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table className="min-w-full bg-white border rounded-lg">
                        <TableHeader>
                          <TableRow>
                            <TableHead
                              className="cursor-pointer px-2 py-2 md:px-4"
                              onClick={() => handleSort("username")}
                            >
                              Name{" "}
                              {sortColumn === "username" && (
                                <span className="ml-1">
                                  {sortDirection === "asc" ? "↑" : "↓"}
                                </span>
                              )}
                            </TableHead>
                            <TableHead
                              className="cursor-pointer px-2 py-2 md:px-4"
                              onClick={() => handleSort("position")}
                            >
                              Role{" "}
                              {sortColumn === "role" && (
                                <span className="ml-1">
                                  {sortDirection === "asc" ? "↑" : "↓"}
                                </span>
                              )}
                            </TableHead>
                            <TableHead
                              className="cursor-pointer px-2 py-2 md:px-4"
                              onClick={() => handleSort("email")}
                            >
                              Email{" "}
                              {sortColumn === "email" && (
                                <span className="ml-1">
                                  {sortDirection === "asc" ? "↑" : "↓"}
                                </span>
                              )}
                            </TableHead>
                            <TableHead
                              className="cursor-pointer px-2 py-2 md:px-4"
                              onClick={() => handleSort("hireDate")}
                            >
                              Total Evaluations{" "}
                              {sortColumn === "hireDate" && (
                                <span className="ml-1">
                                  {sortDirection === "asc" ? "↑" : "↓"}
                                </span>
                              )}
                            </TableHead>
                            <TableHead className="px-2 py-2 md:px-4">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sortedEmployees.map((employee: any) => (
                            <TableRow
                              key={employee._id}
                              className="hover:bg-gray-100 transition-colors"
                            >
                              <TableCell className="px-2 py-2 md:px-4">
                                {employee.username}
                              </TableCell>
                              <TableCell className="px-2 py-2 md:px-4">
                                {employee.role}
                              </TableCell>
                              <TableCell className="px-2 py-2 md:px-4">
                                {employee.email || "info@example.com"}
                              </TableCell>
                              <TableCell className="px-2 py-2 md:px-4 text-center">
                                0
                              </TableCell>
                              <TableCell className="px-2 py-2 md:px-4">
                                <Link to={`/profile`}>
                                  <Button variant="outline" className="mr-2 mb-2 md:mb-0">
                                    View Profile
                                  </Button>
                                </Link>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedEmployee(employee);
                                    setIsEvaluationModalOpen(true);
                                  }}
                                  className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:from-purple-600 hover:to-purple-800 transition"
                                >
                                  Add Evaluation
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  {!loading && sortedEmployees.length === 0 && (
                    <div className="flex justify-center items-center py-6">
                      <p className="text-gray-500">No employees found.</p>
                    </div>
                  )}
                  {employees.length > 0 && (
                    <div className="flex justify-end mt-4">
                      <Pagination
                        currentPage={currentPage as number}
                        totalPages={Math.ceil(totalEmployees / itemsPerPage)}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </main>
        <AddEmployeeModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            fetchEmployees();
          }}
        />
        {selectedEmployee && (
          <AddEvaluationModal
            isOpen={isEvaluationModalOpen}
            onClose={() => {
              setIsEvaluationModalOpen(false);
              fetchEmployees();
            }}
            employee={selectedEmployee}
          />
        )}
      </div>
    </div>
  );
}
