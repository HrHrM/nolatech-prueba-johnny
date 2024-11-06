import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export function EvaluationsTableContent({ evaluations, openFeedbackModal, openEvaluationModal, openEvaluationDetail }:any) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Note</TableHead>

          <TableHead className="text-center">Actions</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {evaluations.map((evaluation:any, index:number) => (
          <TableRow key={index}>
            <TableCell>{evaluation.employeeId?.username || 'Example'}</TableCell>
            <TableCell>{evaluation.score}</TableCell>
            <TableCell>
              <div className="relative">
                <p className="line-clamp-3">
                  {evaluation.note || "Example"}
                </p>
              </div>
            </TableCell>
            <TableCell className="text-center">
              <div className="flex justify-center space-x-2">
                <Button variant="outline" onClick={() => null}>Add Feedback</Button>
                <Button variant="outline" onClick={() =>null}>Edit</Button>
                <Button variant="outline" onClick={() => null}>View Details</Button>
              </div>
            </TableCell>
            <TableCell>{new Date(evaluation.date).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
