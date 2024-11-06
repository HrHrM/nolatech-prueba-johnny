import { EvaluationsTable } from "@/components/component/evaluations-table";
import Header from "@/components/component/header";


function Evaluations() {
  // console.log('### EVALUATIONS PAGE');
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex-1 relative'>
        <EvaluationsTable />
      </div>
    </div>
  );
}

export default Evaluations;
