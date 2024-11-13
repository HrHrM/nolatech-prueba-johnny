import Header from "@/components/component/header";
import { Home } from "@/components/component/home";


function HomePage() {

  // console.log('### HOME PAGE');
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow overflow-y-auto">
        <Home />
      </main>
    </div>
  );
  
}

export default HomePage;
