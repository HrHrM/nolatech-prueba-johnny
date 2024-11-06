import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { z } from "zod";
import { service } from "@/services/service";
import { Loader } from "../ui/loader";
import { toast, ToastContainer } from "react-toastify";

const employeeSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["Admin", "Manager", "Employee"] as const),
});

export function AddEmployeeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [employeeData, setEmployeeData] = useState<any>({
    name: "",
    role: "Employee", // Valor por defecto
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
    setErrors((prev: any) => ({ ...prev, [name]: "" })); // Limpiar error
  };

  const handleRoleChange = (role: string) => {
    setEmployeeData({
      ...employeeData,
      role: role,
    });
    setErrors((prev: any) => ({ ...prev, role: "" })); // Limpiar error
  };

  const handleSave = () => {
    try {
      saveEmployee(employeeData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: any = {};
        error.errors.forEach((err) => {
          validationErrors[err.path[0]] = err.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  const saveEmployee = async (employeeData: {
    username: string;
    role: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await service.post("/api/auth/register", {
        body: JSON.stringify(employeeData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save employee");
      }
      setEmployeeData({});
      toast("Employee saved successfully");
      onClose();
      return data;
    } catch (error: any) {
      console.log({
        error,
      });
      console.error("Error saving employee:", error);
      toast("Faile to save employee");

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add New Employee
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Fill in the details below to add a new employee.
          </DialogDescription>
        </DialogHeader>

        <>
          {/* Formulario de empleado */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                username
              </Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter username"
                value={employeeData.username}
                onChange={handleInputChange}
                className="border-gray-300 focus:ring-primary focus:border-primary"
              />
              {errors.name && <p className="text-red-500">{errors.username}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter password"
                type="password"
                value={employeeData.password}
                onChange={handleInputChange}
                className="border-gray-300 focus:ring-primary focus:border-primary"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium">
                Role
              </Label>
              <Select
                onValueChange={handleRoleChange}
                value={employeeData.role}
              >
                <SelectTrigger className="w-full border-gray-300">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Employee">Employee</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-red-500">{errors.role}</p>}
            </div>
          </div>

          <DialogFooter className="flex justify-end mt-4 space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="bg-purple-700 text-white hover:bg-primary-dark"
            >
              {isLoading ? <Loader /> : " Save Employee"}
            </Button>
          </DialogFooter>
        </>
        <ToastContainer />
      </DialogContent>
    </Dialog>
  );
}
