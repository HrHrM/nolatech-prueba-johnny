import { EvaluationsTableAll } from "@/components/component/evaluation-table-all";
import { EvaluationsTable } from "@/components/component/evaluations-table";
import Header from "@/components/component/header";


function EvaluationsAll() {
  // console.log('### EVALUATIONS PAGE');
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex-1 relative'>
        <EvaluationsTableAll />
      </div>
    </div>
  );
}

export default EvaluationsAll;
