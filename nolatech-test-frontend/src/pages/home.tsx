import Header from "@/components/component/header";
import { Home } from "@/components/component/home";


function HomePage() {

  // console.log('### HOME PAGE');
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <Home />
    </div>
  );
}

export default HomePage;
