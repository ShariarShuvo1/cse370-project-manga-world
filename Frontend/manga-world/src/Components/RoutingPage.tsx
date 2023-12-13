import { Outlet } from "react-router-dom";
import Header from "./Navbar/Header/Header";
import Footer from "./Navbar/Footer/Footer";

function RoutingPage() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default RoutingPage;
