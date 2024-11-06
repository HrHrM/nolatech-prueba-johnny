import Header from "@/components/component/header";
import { EmployeeSearchAndResults } from "@/components/component/results";


function ResultsGraphs() {
  // console.log("### ResultsGraphs PAGE");
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 relative">
        <EmployeeSearchAndResults />
      </div>
    </div>
  );
}

export default ResultsGraphs;
