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
  const [employees, setEmployees] = useState([]); // Empleados
  const [totalEmployees, setTotalEmployees] = useState(0); // Empleados totales
  const [selectedEmployee, setSelectedEmployee] = useState(null); //
  const [sortColumn, setSortColumn] = useState("username"); // Orden de columna por nombre
  const [sortDirection, setSortDirection] = useState("asc"); // Tipo de orden ascendente o descendente
  const [filterText, setFilterText] = useState(""); // Filtro de texto
  const [currentPage, setCurrentPage] = useState<any>(1); // Paginado de los empleados
  const [itemsPerPage] = useState<any>(10); // Empleados por pagina
  const [loading, setLoading] = useState(true); // Cargando
  const [isModalOpen, setIsModalOpen] = useState(false); // Mostrar modal
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false); // Mostrar Modal de Evaluacion

  // console.log("### HOME COMPONENT");

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, itemsPerPage]);

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
      setEmployees(data); // Asegurarse de que sea un array
      setTotalEmployees(data.total || 0); // Asegurarse de que sea un número
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  // Aplicar el filtro solo si employees está definido como un array
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

  // const handleRoleChange = (role) => {
  //   setCurrentRole(role);
  // };

  return (
    <div className="relative min-h-screen">
      {" "}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm opacity-30"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <div className="relative z-10 p-6 backdrop-blur-sm">
        {" "}
        <main className="flex-1">
          {currentRole && (
            <div className="grid gap-6">
              <Card className="shadow-lg rounded-lg">
                <CardHeader className="p-6 border-b border-gray-200">
                  <CardTitle className="text-2xl font-semibold text-gray-800">
                    Employees
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    View and manage employee information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
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
                      className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:from-purple-600 hover:to-purple-800 transition"
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
                              className="cursor-pointer px-4 py-2"
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
                              className="cursor-pointer px-4 py-2"
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
                              className="cursor-pointer px-4 py-2"
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
                              className="cursor-pointer px-4 py-2"
                              onClick={() => handleSort("hireDate")}
                            >
                              Total Evaluations{" "}
                              {sortColumn === "hireDate" && (
                                <span className="ml-1">
                                  {sortDirection === "asc" ? "↑" : "↓"}
                                </span>
                              )}
                            </TableHead>
                            <TableHead className="px-4 py-2">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sortedEmployees.map((employee: any) => (
                            <TableRow
                              key={employee._id}
                              className="hover:bg-gray-100 transition-colors"
                            >
                              <TableCell className="px-4 py-2">
                                {employee.username}
                              </TableCell>
                              <TableCell className="px-4 py-2">
                                {employee.role}
                              </TableCell>
                              <TableCell className="px-4 py-2">
                                {employee.email || "info@example.com"}
                              </TableCell>
                              <TableCell className="px-4 py-2 text-center">
                                0
                              </TableCell>
                              <TableCell className="px-4 py-2">
                                <Link to={`/profile`}>
                                  <Button variant="outline" className="mr-2">
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

  // return (
  //     <div>
  //         <main className="flex-1 p-6">
  //             {currentRole && (
  //                 <div className="grid gap-6">
  //                     <Card>
  //                         <CardHeader>
  //                             <CardTitle>Employees</CardTitle>
  //                             <CardDescription>View and manage employee information.</CardDescription>
  //                         </CardHeader>
  //                         <CardContent>
  //                             <div className="flex items-center justify-between mb-4">
  //                                 <div className="relative w-full max-w-md">
  //                                     <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
  //                                     <InputField
  //                                         id="search"
  //                                         label=""
  //                                         type="search"
  //                                         placeholder="Search employees..."
  //                                         className="pl-8"
  //                                         value={filterText}
  //                                         onChange={handleFilter}
  //                                     />
  //                                 </div>
  //                                 <Button variant={"blue"} onClick={() => setIsModalOpen(true)}>Add Employee</Button>
  //                             </div>
  //                             {loading ? (
  //                                 <p>Loading employees...</p> // Indicador de carga
  //                             ) : (
  //                                 <>
  //                                     <Table>
  //                                         <TableHeader>
  //                                             <TableRow>
  //                                                 <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
  //                                                     Name{" "}
  //                                                     {sortColumn === "name" && (
  //                                                         <span className="ml-1">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
  //                                                     )}
  //                                                 </TableHead>
  //                                                 <TableHead className="cursor-pointer" onClick={() => handleSort("position")}>
  //                                                     Role{" "}
  //                                                     {sortColumn === "role" && (
  //                                                         <span className="ml-1">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
  //                                                     )}
  //                                                 </TableHead>
  //                                                 <TableHead className="cursor-pointer" onClick={() => handleSort("email")}>
  //                                                     Email{" "}
  //                                                     {sortColumn === "email" && (
  //                                                         <span className="ml-1">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
  //                                                     )}
  //                                                 </TableHead>
  //                                                 <TableHead className="cursor-pointer" onClick={() => handleSort("hireDate")}>
  //                                                     Total Evaluations{" "}
  //                                                     {sortColumn === "hireDate" && (
  //                                                         <span className="ml-1">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
  //                                                     )}
  //                                                 </TableHead>
  //                                                 <TableHead>Actions</TableHead>
  //                                             </TableRow>
  //                                         </TableHeader>
  //                                         <TableBody>
  //                                             {sortedEmployees.map((employee: any) => (
  //                                                 <TableRow key={employee._id}>
  //                                                     <TableCell>{employee.name}</TableCell>
  //                                                     <TableCell>{employee.role}</TableCell>
  //                                                     <TableCell>{employee.email}</TableCell>
  //                                                     <TableCell>{employee.evaluations.length}</TableCell>
  //                                                     <TableCell>
  //                                                         <Link to={`/employee-profile/${employee._id}`}>
  //                                                             <Button variant="outline">View Profile</Button>
  //                                                         </Link>
  //                                                         <Button
  //                                                             variant={"outline"}
  //                                                             onClick={() => {
  //                                                                 setSelectedEmployee(employee);
  //                                                                 setIsEvaluationModalOpen(true);
  //                                                             }}
  //                                                             className="text-primary hover:text-primary-dark"
  //                                                         >
  //                                                             Add Evaluation
  //                                                         </Button>
  //                                                     </TableCell>
  //                                                 </TableRow>
  //                                             ))}
  //                                         </TableBody>
  //                                     </Table>
  //                                     <div className="flex justify-end mt-4">
  //                                         <Pagination
  //                                             currentPage={currentPage as number}
  //                                             totalPages={Math.ceil(totalEmployees / itemsPerPage)}
  //                                             onPageChange={handlePageChange}
  //                                         />
  //                                     </div>
  //                                 </>
  //                             )}
  //                         </CardContent>
  //                     </Card>
  //                 </div>
  //             )}
  //         </main>
  //         <AddEmployeeModal
  //             isOpen={isModalOpen}
  //             onClose={() => {
  //                 setIsModalOpen(false)
  //                 fetchEmployees();
  //             }}
  //         />
  //         {selectedEmployee && (
  //             <AddEvaluationModal
  //                 isOpen={isEvaluationModalOpen}
  //                 onClose={() => {
  //                     setIsEvaluationModalOpen(false)
  //                     fetchEmployees();
  //                 }}
  //                 employee={selectedEmployee} // Pasar el empleado seleccionado al modal
  //             />
  //         )}
  //     </div>
  // );
}
