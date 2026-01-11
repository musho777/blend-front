"use client";
import { wellfoodUtility } from "@/utility";
import useClickOutside from "@/utility/useClickOutside";
import Link from "next/link";
import { Fragment, useEffect, useState, useMemo } from "react";
import { useCategories } from "@/hooks/queries/useCategoriesQuery";
import { useSubcategories } from "@/hooks/queries/useSubcategoriesQuery";
import { useLocale } from "@/contexts/LocaleContext";
import { getLocalizedTitle } from "@/utils/localization";
import CartIcon from "@/components/CartIcon";
import AuthButtons from "@/components/AuthButtons";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

// Custom hook for responsive category limit
const useCategoryLimit = () => {
  const [categoryLimit, setCategoryLimit] = useState(() => {
    if (typeof window === "undefined") return 4; // Server-side default
    const width = window.innerWidth;
    if (width < 768) {
      return 4; // Mobile
    } else if (width < 1440) {
      return 4; // Tablet
    } else {
      return 4; // Desktop - max 8
    }
  });

  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCategoryLimit(4); // Mobile
      } else if (width < 1440) {
        setCategoryLimit(4); // Tablet
      } else {
        setCategoryLimit(4); // Desktop - max 8
      }
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  return categoryLimit;
};

const Sidebar = () => {
  return (
    <Fragment>
      {/*Form Back Drop*/}
      <div
        className="form-back-drop"
        onClick={() =>
          document
            .querySelector("body")
            .classList.remove("side-content-visible")
        }
      />
      {/* Hidden Sidebar */}
      <section className="hidden-bar">
        <div className="inner-box text-center">
          <div
            className="cross-icon"
            onClick={() =>
              document
                .querySelector("body")
                .classList.remove("side-content-visible")
            }
          >
            <span className="fa fa-times" />
          </div>
          <div className="title">
            <h4>Get Appointment</h4>
          </div>
          {/*Appointment Form*/}
          <div className="appointment-form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                document
                  .querySelector("body")
                  .classList.remove("side-content-visible");
              }}
            >
              <div className="form-group">
                <input
                  type="text"
                  name="text"
                  defaultValue=""
                  placeholder="Name"
                  required=""
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  defaultValue=""
                  placeholder="Email Address"
                  required=""
                />
              </div>
              <div className="form-group">
                <textarea placeholder="Message" rows={5} defaultValue={""} />
              </div>
              <div className="form-group">
                <button type="submit" className="theme-btn style-two">
                  Submit now
                </button>
              </div>
            </form>
          </div>
          {/*Social Icons*/}
          <div className="social-style-one">
            <Link href="contact">
              <i className="fab fa-telegram" />
            </Link>
            <Link href="contact">
              <i className="fab fa-facebook-f" />
            </Link>
            <Link href="contact">
              <i className="fab fa-instagram" />
            </Link>
            <a href="#">
              <i className="fab fa-pinterest-p" />
            </a>
          </div>
        </div>
      </section>
      {/*End Hidden Sidebar */}
    </Fragment>
  );
};

const SearchBtn = () => {
  const [toggleSearch, setToggleSearch] = useState(false);

  let domNode = useClickOutside(() => {
    setToggleSearch(false);
  });
  return (
    <div className="nav-search py-10" ref={domNode}>
      {/* <button
        className="far fa-search"
        onClick={() => setToggleSearch(!toggleSearch)}
      /> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setToggleSearch(false);
        }}
        className={toggleSearch ? "" : "hide"}
      >
        <input
          type="text"
          placeholder="Search"
          className="searchbox"
          required=""
        />
        {/* <button type="submit" className="searchbutton far fa-search" /> */}
      </form>
    </div>
  );
};

// Tablet hamburger component usable by both MobileMenu and Header
const TabletHamburger = ({
  visibleCategories,
  hiddenCategories,
  subcategoriesByCategory,
  locale,
}) => {
  const [open, setOpen] = useState(false);
  let domNode = useClickOutside(() => setOpen(false));

  return (
    <div className="tablet-hamburger" ref={domNode}>
      <button
        aria-label="Open categories"
        className="hamburger-toggle"
        onClick={() => setOpen(!open)}
        style={{
          background: "transparent",
          border: "none",
          fontSize: "22px",
          cursor: "pointer",
          color: "inherit",
        }}
      >
        <i className="fa fa-bars" />
      </button>

      {open && (
        <div
          className="tablet-hamburger-panel"
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            height: "100%",
            width: "320px",
            maxWidth: "80%",
            background: "#fff",
            boxShadow: "-4px 0 12px rgba(0,0,0,0.15)",
            zIndex: 9999,
            padding: "24px",
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 style={{ margin: 0 }}>Categories</h4>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 20,
              }}
              aria-label="Close categories"
            >
              <i className="fa fa-times" />
            </button>
          </div>

          <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
            {visibleCategories?.map((c, idx) => {
              const subs = subcategoriesByCategory[c?.id] || [];
              return (
                <li key={idx} style={{ marginBottom: 12 }}>
                  <Link
                    href={`/category/${c?.slug}`}
                    onClick={() => setOpen(false)}
                  >
                    <div style={{ fontWeight: 600 }}>
                      {getLocalizedTitle(c, locale)}
                    </div>
                  </Link>
                  {subs.length > 0 && (
                    <ul style={{ paddingLeft: 12, marginTop: 6 }}>
                      {subs.map((s) => (
                        <li key={s.id} style={{ marginBottom: 8 }}>
                          <Link
                            href={`/category/${c?.slug}?subcategoryId=${
                              s.slug || s.id
                            }`}
                            onClick={() => setOpen(false)}
                          >
                            {getLocalizedTitle(s, locale)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}

            {hiddenCategories.length > 0 && (
              <li style={{ marginTop: 8 }}>
                <div style={{ fontWeight: 600 }}>
                  More ({hiddenCategories.length})
                </div>
                <ul style={{ paddingLeft: 12, marginTop: 6 }}>
                  {hiddenCategories.map((hc, i) => (
                    <li key={`more-${i}`} style={{ marginBottom: 8 }}>
                      <Link
                        href={`/category/${hc?.slug}`}
                        onClick={() => setOpen(false)}
                      >
                        {getLocalizedTitle(hc, locale)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
const MobileMenu = ({ black }) => {
  const [toggle, setToggle] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const { data: categories, isLoading, isError } = useCategories();
  const { data: subcategories } = useSubcategories();
  const { locale } = useLocale();
  const t = useTranslations("header");
  const CATEGORY_LIMIT = useCategoryLimit(); // Responsive category limit

  // Detect tablet width (990 - 1280) inside MobileMenu as well
  const [windowWidth, setWindowWidth] = useState(
    typeof window === "undefined" ? 0 : window.innerWidth
  );

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isTablet = windowWidth >= 990 && windowWidth <= 1280;

  // Group subcategories by categoryId for efficient lookup
  const subcategoriesByCategory = useMemo(() => {
    if (!subcategories) return {};

    return subcategories.reduce((acc, subcategoryId) => {
      const categoryId = subcategoryId.categoryId;
      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }
      acc[categoryId].push(subcategoryId);
      return acc;
    }, {});
  }, [subcategories]);

  // Split categories into visible and hidden
  const { visibleCategories, hiddenCategories } = useMemo(() => {
    if (!categories || categories.length <= CATEGORY_LIMIT) {
      return { visibleCategories: categories || [], hiddenCategories: [] };
    }
    return {
      visibleCategories: categories.slice(0, CATEGORY_LIMIT),
      hiddenCategories: categories.slice(CATEGORY_LIMIT),
    };
  }, [categories, CATEGORY_LIMIT]);

  const activeMenuSet = (value) =>
      setActiveMenu(activeMenu === value ? "" : value),
    activeLi = (value) =>
      value === activeMenu ? { display: "block" } : { display: "none" };
  return (
    <Fragment>
      <header className="main-header white-menu menu-absolute d-block d-xl-none">
        {/*Header-Upper*/}
        <div
          className="header-upper"
          style={black ? { backgroundColor: "black" } : {}}
        >
          <div className="container-fluid clearfix">
            <div className="header-inner rel d-flex align-items-center">
              <div className="logo-outer">
                <div className="logo">
                  <Link
                    href="/"
                    style={{
                      fontSize: "36px",
                      fontWeight: "bold",
                      color: "#ffb936",
                      textDecoration: "none",
                    }}
                  >
                    Blend
                  </Link>
                </div>
              </div>
              <div className="nav-outer ms-lg-5 ps-xxl-4 clearfix">
                {isTablet ? (
                  <TabletHamburger
                    visibleCategories={visibleCategories}
                    hiddenCategories={hiddenCategories}
                    subcategoriesByCategory={subcategoriesByCategory}
                    locale={locale}
                  />
                ) : (
                  <nav className="main-menu navbar-expand-lg">
                    <div className="navbar-header py-10">
                      <div className="mobile-logo">
                        <Link
                          href="/"
                          style={{
                            fontSize: "28px",
                            fontWeight: "bold",
                            color: "#ffb936",
                            textDecoration: "none",
                          }}
                        >
                          Blend
                        </Link>
                      </div>
                      <button
                        type="button"
                        className="navbar-toggle"
                        data-bs-toggle="collapse"
                        data-bs-target=".navbar-collapse"
                        onClick={() => setToggle(!toggle)}
                      >
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                      </button>
                    </div>
                    <div
                      className={`navbar-collapse collapse clearfix ${
                        toggle ? "show" : ""
                      }`}
                    >
                      <ul
                        className="navigation clearfix"
                        style={{
                          gap: "20px",
                          display: "flex",
                          fontSize: "18px",
                        }}
                      >
                        {visibleCategories?.map((elm, i) => {
                          const categorySubcategories =
                            subcategoriesByCategory[elm?.id] || [];
                          const hasSubcategories =
                            categorySubcategories.length > 0;

                          return (
                            <li
                              key={i}
                              className={hasSubcategories ? "dropdown" : ""}
                            >
                              <Link href={`/category/${elm?.slug}`}>
                                {getLocalizedTitle(elm, locale)}
                              </Link>
                              {hasSubcategories && (
                                <>
                                  <ul style={activeLi(`category-${elm?.id}`)}>
                                    {categorySubcategories.map(
                                      (subcategoryId) => (
                                        <li key={subcategoryId.id}>
                                          <Link
                                            href={`/category/${
                                              elm?.slug
                                            }?subcategoryId=${
                                              subcategoryId.slug ||
                                              subcategoryId.id
                                            }`}
                                          >
                                            {getLocalizedTitle(
                                              subcategoryId,
                                              locale
                                            )}
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                  <div
                                    className="dropdown-btn"
                                    onClick={() =>
                                      activeMenuSet(`category-${elm?.id}`)
                                    }
                                  >
                                    <span className="far fa-angle-down" />
                                  </div>
                                </>
                              )}
                            </li>
                          );
                        })}
                        {hiddenCategories.length > 0 && (
                          <li className="dropdown">
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                activeMenuSet("more-categories");
                              }}
                            >
                              More{" "}
                              <span style={{ fontSize: "0.85em" }}>
                                ({hiddenCategories.length})
                              </span>
                            </a>
                            <ul style={activeLi("more-categories")}>
                              {hiddenCategories.map((elm, i) => (
                                <li key={`more-${i}`}>
                                  <Link href={`/category/${elm?.slug}`}>
                                    {getLocalizedTitle(elm, locale)}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <div
                              className="dropdown-btn"
                              onClick={() => activeMenuSet("more-categories")}
                            >
                              <span className="far fa-angle-down" />
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                  </nav>
                )}
              </div>
              <div className="header-number" style={{ fontSize: "18px" }}>
                <i className="far fa-phone" />
                {t("call")} : <a href="callto:+88012345688">+374 93 613 007</a>
              </div>
              <SearchBtn />
              <div style={{ marginLeft: "15px" }}>
                <CartIcon />
              </div>
              <AuthButtons />
              <LanguageSwitcher />
            </div>
          </div>
          <div className="bg-lines">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        {/*End Header Upper*/}
      </header>
    </Fragment>
  );
};

const Header = ({ black }) => {
  const { data: categories, isLoading, isError } = useCategories();
  const { data: subcategories } = useSubcategories();
  const { locale } = useLocale();
  const t = useTranslations("header");
  const CATEGORY_LIMIT = useCategoryLimit(); // Responsive category limit

  // Group subcategories by categoryId for efficient lookup
  const subcategoriesByCategory = useMemo(() => {
    if (!subcategories) return {};

    return subcategories.reduce((acc, subcategoryId) => {
      const categoryId = subcategoryId.categoryId;
      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }
      acc[categoryId].push(subcategoryId);
      return acc;
    }, {});
  }, [subcategories]);

  // Split categories into visible and hidden
  const { visibleCategories, hiddenCategories } = useMemo(() => {
    if (!categories || categories.length <= CATEGORY_LIMIT) {
      return { visibleCategories: categories || [], hiddenCategories: [] };
    }
    return {
      visibleCategories: categories.slice(0, CATEGORY_LIMIT),
      hiddenCategories: categories.slice(CATEGORY_LIMIT),
    };
  }, [categories, CATEGORY_LIMIT]);

  // Detect tablet width (990 - 1280)
  const [windowWidth, setWindowWidth] = useState(
    typeof window === "undefined" ? 0 : window.innerWidth
  );

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isTablet = windowWidth >= 990 && windowWidth <= 1280;

  useEffect(() => {
    wellfoodUtility.fixedHeader();
  }, []);

  return (
    <Fragment>
      <header className="main-header white-menu menu-absolute d-none d-xl-block">
        {/*Header-Upper*/}
        <div
          className="header-upper"
          style={black ? { backgroundColor: "black" } : {}}
        >
          <div className="container-fluid clearfix">
            <div className="header-inner rel d-flex align-items-center">
              <div className="logo-outer">
                <div className="logo">
                  <Link
                    href="/"
                    style={{
                      fontSize: "36px",
                      fontWeight: "bold",
                      color: "#ffb936",
                      textDecoration: "none",
                    }}
                  >
                    Blend
                  </Link>
                </div>
              </div>
              <div className="nav-outer ms-lg-5 ps-xxl-4 clearfix">
                {/* If tablet width, show hamburger icon that opens categories; otherwise show normal nav */}
                {isTablet ? (
                  <TabletHamburger
                    visibleCategories={visibleCategories}
                    hiddenCategories={hiddenCategories}
                    subcategoriesByCategory={subcategoriesByCategory}
                    locale={locale}
                  />
                ) : (
                  <nav className="main-menu navbar-expand-lg">
                    <div className="navbar-header py-10">
                      <div className="mobile-logo">
                        <Link
                          href="/"
                          style={{
                            fontSize: "28px",
                            fontWeight: "bold",
                            color: "#ffb936",
                            textDecoration: "none",
                          }}
                        >
                          Blend
                        </Link>
                      </div>
                      {/* Toggle Button */}
                      <button
                        type="button"
                        className="navbar-toggle"
                        data-bs-toggle="collapse"
                        data-bs-target=".navbar-collapse"
                      >
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                      </button>
                    </div>
                    <div className="navbar-collapse collapse clearfix">
                      <ul
                        className="navigation clearfix"
                        style={{
                          gap: "20px",
                          display: "flex",
                          fontSize: "18px",
                        }}
                      >
                        {visibleCategories?.map((elm, i) => {
                          const categorySubcategories =
                            subcategoriesByCategory[elm?.id] || [];
                          const hasSubcategories =
                            categorySubcategories.length > 0;

                          return (
                            <li
                              key={i}
                              className={hasSubcategories ? "dropdown" : ""}
                            >
                              <Link href={`/category/${elm?.slug}`}>
                                {getLocalizedTitle(elm, locale)}
                              </Link>
                              {hasSubcategories && (
                                <>
                                  <ul>
                                    {categorySubcategories.map(
                                      (subcategoryId) => (
                                        <li key={subcategoryId.id}>
                                          <Link
                                            href={`/category/${
                                              elm?.slug
                                            }?subcategoryId=${
                                              subcategoryId.slug ||
                                              subcategoryId.id
                                            }`}
                                          >
                                            {getLocalizedTitle(
                                              subcategoryId,
                                              locale
                                            )}
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                  <div className="dropdown-btn">
                                    <span className="far fa-angle-down" />
                                  </div>
                                </>
                              )}
                            </li>
                          );
                        })}
                        {hiddenCategories.length > 0 && (
                          <li className="dropdown">
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              More{" "}
                              <span style={{ fontSize: "0.85em" }}>
                                ({hiddenCategories.length})
                              </span>
                            </a>
                            <ul>
                              {hiddenCategories.map((elm, i) => (
                                <li key={`more-${i}`}>
                                  <Link href={`/category/${elm?.slug}`}>
                                    {getLocalizedTitle(elm, locale)}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <div className="dropdown-btn">
                              <span className="far fa-angle-down" />
                            </div>
                          </li>
                        )}
                        {/* <li className="dropdown">
                        <a href="#">Home</a>
                        <ul>
                          <li>
                            <Link href="/">Home Restauran</Link>
                          </li>
                          <li>
                            <Link href="index2">Home Pizza</Link>
                          </li>
                          <li>
                            <Link href="index3">Home Burger</Link>
                          </li>
                          <li>
                            <Link href="index4">Home Chiken</Link>
                          </li>
                          <li>
                            <Link href="index5">Juice &amp; Drinks</Link>
                          </li>
                          <li>
                            <Link href="index6">Home Grill</Link>
                          </li>
                        </ul>
                        <div className="dropdown-btn">
                          <span className="far fa-angle-down" />
                        </div>
                      </li>
                      <li className="dropdown">
                        <a href="#">Menu</a>
                        <ul>
                          {isLoading ? (
                            <li>
                              <span>Loading...</span>
                            </li>
                          ) : isError ? (
                            <li>
                              <span>Error loading categories</span>
                            </li>
                          ) : categories && categories.length > 0 ? (
                            categories.map((category) => (
                              <li key={category.id}>
                                <Link
                                  href={`/menu/${category.slug || category.id}`}
                                >
                                  {category.name}
                                </Link>
                              </li>
                            ))
                          ) : (
                            <li>
                              <span>No categories available</span>
                            </li>
                          )}
                        </ul>
                        <div className="dropdown-btn">
                          <span className="far fa-angle-down" />
                        </div>
                      </li>
                      <li className="dropdown">
                        <a href="#">pages</a>
                        <ul>
                          <li>
                            <Link href="about">About Us</Link>
                          </li>
                          <li>
                            <Link href="history">Our History</Link>
                          </li>
                          <li>
                            <Link href="faq">faqs</Link>
                          </li>
                          <li className="dropdown">
                            <a href="#">chefs</a>
                            <ul>
                              <li>
                                <Link href="chefs">Our chefs</Link>
                              </li>
                              <li>
                                <Link href="chef-details">chef Details</Link>
                              </li>
                            </ul>
                            <div className="dropdown-btn">
                              <span className="far fa-angle-down" />
                            </div>
                          </li>
                          <li>
                            <Link href="gallery">Gallery</Link>
                          </li>
                        </ul>
                        <div className="dropdown-btn">
                          <span className="far fa-angle-down" />
                        </div>
                      </li>
                      <li className="dropdown">
                        <a href="#">blog</a>
                        <ul>
                          <li>
                            <Link href="blog">blog standard</Link>
                          </li>
                          <li>
                            <Link href="blog-details">blog details</Link>
                          </li>
                        </ul>
                        <div className="dropdown-btn">
                          <span className="far fa-angle-down" />
                        </div>
                      </li>
                      <li className="dropdown">
                        <a href="#">shop</a>
                        <ul>
                          <li>
                            <Link href="shop">Products</Link>
                          </li>
                          <li>
                            <Link href="product-details">Product Details</Link>
                          </li>
                          <li>
                            <Link href="cart">Shopping Cart</Link>
                          </li>
                          <li>
                            <Link href="checkout">Checkout Page</Link>
                          </li>
                        </ul>
                        <div className="dropdown-btn">
                          <span className="far fa-angle-down" />
                        </div>
                      </li>
                      <li>
                        <Link href="contact">Contact</Link>
                      </li> */}
                      </ul>
                    </div>
                  </nav>
                )}
              </div>
              <div className="header-number" style={{ fontSize: "18px" }}>
                <i className="far fa-phone" />
                {t("call")} : <a href="callto:+88012345688">+374 93 613 007</a>
              </div>
              <SearchBtn />
              <div style={{ marginLeft: "15px" }}>
                <CartIcon />
              </div>
              <AuthButtons />
              <LanguageSwitcher />
            </div>
          </div>
          <div className="bg-lines">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        {/*End Header Upper*/}
      </header>
      <MobileMenu black={black} />
      <Sidebar />
    </Fragment>
  );
};
export default Header;
