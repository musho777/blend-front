"use client";
import { wellfoodUtility } from "@/utility";
import { useEffect } from "react";
import niceSelect from "react-nice-select";
import Footer from "./Footer";
import Header from "./Header";
import CartModal from "@/components/CartModal";

const WellFoodLayout = ({ children, bgBlack, footer, headerBlack }) => {
  useEffect(() => {
    document.querySelectorAll(".nice-select").forEach((el) => el.remove());
    niceSelect();
    wellfoodUtility.animation();
    if (bgBlack) {
      document.querySelector(".page-wrapper").classList.add("bg-black");
    } else {
      if (
        document.querySelector(".page-wrapper").classList.contains("bg-black")
      ) {
        document.querySelector(".page-wrapper").classList.remove("bg-black");
      }
    }
  }, []);

  return (
    <div className="page-wrapper">
      <Header black={headerBlack} />
      {children}
      <Footer footer={footer} />
      <CartModal />
    </div>
  );
};
export default WellFoodLayout;
