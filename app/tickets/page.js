import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Headers/Navbar";
import CustomerService from "@/components/Tickets/CustomerService";
import Help from "@/components/Tickets/Help";
import TicketsContent from "@/components/Tickets/TicketsContent";

const TicketsPage = () => {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <Banner
        titleLine1="Exclusive Flight Deals "
        titleLine2="& Airfare Savings"
        description="Book domestic and international flights with confidence. Explore competitive airfare offers, flexible travel options, and dedicated booking assistance for your next trip."
      />
      <Help />
      <CustomerService />
      <TicketsContent />
      <Footer />
    </>
  );
};

export default TicketsPage;
