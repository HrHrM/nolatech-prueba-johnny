import { z } from "zod";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { Employee, Evaluation, EvaluationData } from "@/utils/types";
import { service } from "@/services/service";
import endpoints from "@/utils/endpoints";
import { Input } from "../ui/input";


const evaluationSchema = z.object({
  note: z.string().min(1, "Note is required"),
  score: z
    .number()
    .min(1, "Score must be between 1 and 10")
    .max(10, "Score must be between 1 and 10"),
});

interface AddEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
  evaluation?: Evaluation | null;
}

export function AddEvaluationModal({
  isOpen,
  onClose,
  employee,
  evaluation,
}: AddEvaluationModalProps) {
  // console.log("Add evaluation");
  const [evaluationData, setEvaluationData] = useState<any>({
    note: evaluation ? evaluation.note : "",
    score: evaluation ? evaluation.score : 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvaluationData((prevData: any) => ({
      ...prevData,
      [name]: name === "score" ? Number(value) : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSave = () => {
    try {
      evaluationSchema.parse(evaluationData);
      saveEvaluation(evaluationData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          validationErrors[err.path[0] as string] = err.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  const saveEvaluation = async (evaluationData: EvaluationData) => {
    setIsLoading(true);
    const evaluationDataToSave = {
      ...evaluationData,
      employeeId: employee._id,
    };

    // console.log("evaluationData:", evaluationData);

    try {
      const response = evaluation
        ? await service.put(
            `${endpoints.endpoints.evaluations}${evaluation._id}`,
            {
              body: JSON.stringify(evaluationDataToSave),
              headers: { "Content-Type": "application/json" },
            }
          )
        : await service.post(`${endpoints.endpoints.evaluations}`, {
            body: JSON.stringify(evaluationDataToSave),
            headers: { "Content-Type": "application/json" },
          });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save evaluation");
      }
      toast("Evaluation saved successfully");

      onClose();
    } catch (error: any) {
      toast("Failed to save evaluation");
      console.error("Error saving evaluation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (evaluation) {
      setEvaluationData({
        note: evaluation.note,
        score: evaluation.score,
      });
    }
  }, [evaluation]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {evaluation
              ? `Edit Evaluation for ${employee.name}`
              : `Create Evaluation for ${employee.name}`}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Please provide a note and score for the employee.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="note" className="text-sm font-medium">
              Note
            </Label>
            <Input
              id="note"
              name="note"
              placeholder="Enter note"
              value={evaluationData.note}
              onChange={handleInputChange}
              className="border-gray-300 focus:ring-primary focus:border-primary"
            />
            {errors.note && <p className="text-red-500">{errors.note}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="score" className="text-sm font-medium">
              Score
            </Label>
            <Input
              id="score"
              name="score"
              placeholder="Enter score"
              type="number"
              value={evaluationData.score}
              onChange={handleInputChange}
              className="border-gray-300 focus:ring-primary focus:border-primary"
            />
            {errors.score && <p className="text-red-500">{errors.score}</p>}
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
         className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:from-purple-600 hover:to-purple-800 transition"
          >
            {isLoading ? (
              <Loader />
            ) : evaluation ? (
              "Update Evaluation"
            ) : (
              "Create Evaluation"
            )}
          </Button>
        </DialogFooter>
        <ToastContainer />
      </DialogContent>
    </Dialog>
  );
}
