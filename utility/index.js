import Aos from "aos";
export const wellfoodUtility = {
  animation() {
    Aos.init();
  },
  fixedHeader() {
    let ticking = false;
    const siteHeader = document.querySelector(".main-header");

    if (!siteHeader) return;

    const updateHeader = () => {
      const windowpos = document.documentElement.scrollTop;
      if (windowpos >= 100) {
        siteHeader.classList.add("fixed-header");
      } else {
        siteHeader.classList.remove("fixed-header");
      }
      ticking = false;
    };

    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });
  },
};
