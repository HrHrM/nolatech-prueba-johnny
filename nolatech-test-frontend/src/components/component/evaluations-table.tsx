import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Loader } from "../ui/loader";
import { Pagination } from "../ui/pagination";
import { EvaluationsTableContent } from "./evaluations-table-content";
import { AddFeedbackModal } from "./add-feedback-modal";
import backgroundImage from "../../assets/backgroundImage.jpg";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import endpoints from "@/utils/endpoints";
import { service } from "@/services/service";
import { AddEvaluationModal } from "./add-evaluation-modal";

export function EvaluationsTable() {
  const navigate = useNavigate();
  const [evaluationsTotal, setEvaluationsTotal] = useState<any[]>([]); // Ensure it is an array initially
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams() as any;
  // const currentPage = parseInt(searchParams.get("page")) || 1;
  let currentID = useSelector((state: RootState) => state.auth.id);

  const fetchEvaluations = async (page = 1) => {
    setLoading(true);
    try {
      const url: string = `${endpoints.endpoints.evaluations_employee}${currentID}/`;
      const response = await service.get(`${url}`);
      const data = await response.json();
      // Ensure data is an array
      setEvaluationsTotal(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch evaluations:", error);
      setEvaluationsTotal([]); // Fallback to an empty array on error
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchEvaluations(1);
  }, []);

  // const handlePreviousPage = () => {
  //   if (currentPage > 1) {
  //     setSearchParams({ page: currentPage - 1 });
  //   }
  // };

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setSearchParams({ page: currentPage + 1 });
  //   }
  // };

  const openEvaluationModal = (evaluation: any) => {
    setSelectedEvaluation(evaluation);
    setIsEvaluationModalOpen(true);
  };

  const openFeedbackModal = (evaluation: any) => {
    setSelectedEvaluation(evaluation);
    setIsFeedbackModalOpen(true);
  };

  const openEvaluationDetail = (evaluationId: any) => {
    navigate(`/evaluation/${evaluationId}`);
  };

  const handleEvaluationUpdate = () => {
    setIsEvaluationModalOpen(false);
    fetchEvaluations();
  };

  const handleFeedbackAdded = () => {
    setIsFeedbackModalOpen(false);
    fetchEvaluations();
  };

  return (
    <div className="relative min-h-full">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm opacity-40"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-60"></div>
      </div>
      <div className="relative z-10 p-6">
        <Card className="animate__animated animate__fadeIn w-full shadow-lg rounded-lg bg-white/80 backdrop-blur-lg">
          <CardHeader className="border-b border-gray-200 p-4">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              My Evaluations
            </CardTitle>
            <CardDescription className="text-gray-600">
              Review my latest employee evaluations and their details.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <Loader />
              </div>
            ) : evaluationsTotal && evaluationsTotal.length === 0 ? ( // Add a check for `evaluationsTotal`
              <p className="text-center text-gray-500 py-10">
                No evaluations available.
              </p>
            ) : (
              <>
                <EvaluationsTableContent
                  evaluations={evaluationsTotal}
                  openFeedbackModal={openFeedbackModal}
                  openEvaluationModal={openEvaluationModal}
                  openEvaluationDetail={openEvaluationDetail}
                />
                {/* <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePreviousPage={handlePreviousPage}
                  handleNextPage={handleNextPage}
                  className="mt-4"
                /> */}
              </>
            )}
          </CardContent>
          {selectedEvaluation && (
            <AddEvaluationModal
              isOpen={isEvaluationModalOpen}
              onClose={handleEvaluationUpdate}
              employee={selectedEvaluation.employee}
              evaluation={selectedEvaluation || {}}
            />
          )}
          {selectedEvaluation && (
            <AddFeedbackModal
              isOpen={isFeedbackModalOpen}
              onClose={handleFeedbackAdded}
              employee={selectedEvaluation.employee}
              evaluation={selectedEvaluation || {}}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
