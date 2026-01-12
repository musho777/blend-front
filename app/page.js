"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Counter from "@/components/Counter";
import OfferCard from "@/components/OfferCard";
import ProductCard from "@/components/ProductCard";
import LoadingScreen from "@/components/LoadingScreen";
import WellFoodLayout from "@/layout/WellFoodLayout";
import Link from "next/link";
import { useBestSellers } from "@/hooks/queries/useBestSellersQuery";
import { useBanners } from "@/hooks/queries/useBannersQuery";
import { useLocale } from "@/contexts/LocaleContext";
import { getLocalizedTitle, getLocalizedField } from "@/utils/localization";

const page = () => {
  const t = useTranslations();
  const { locale } = useLocale();
  const { data: bestSellers, isLoading, error } = useBestSellers();
  const { data: banners, isLoading: isBannersLoading } = useBanners();
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!banners || banners.length <= 1) return;

    const interval = setInterval(() => {
      setActiveBannerIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 15000);

    return () => clearInterval(interval);
  }, [banners]);

  const handleDotClick = (index) => {
    setActiveBannerIndex(index);
  };

  const showLoading = !mounted || isLoading || isBannersLoading;

  return (
    <>
      <LoadingScreen isLoading={showLoading} />
      {!showLoading && (
        <WellFoodLayout>
          {/* HERO SECTION */}
          <section
            className="hero-area bgs-cover pt-180 rpt-150 pb-100 rel z-1"
            style={{
              backgroundImage: "url(/assets/images/background/hero.jpg)",
            }}
          >
            <span
              style={{ position: "absolute" }}
              className="marquee-wrap style-two text-white"
            >
              <span className="marquee-inner left">BLEND</span>
              <span className="marquee-inner left">BLEND</span>
              <span className="marquee-inner left">BLEND</span>
            </span>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div
                    className="hero-content text-white"
                    data-aos="fade-left"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <h1
                      style={{
                        fontSize:
                          locale === "am" || locale === "ru"
                            ? "3rem"
                            : undefined,
                      }}
                    >
                      {t("homepage.hero.title")}
                    </h1>
                    <p>{t("homepage.hero.description")}</p>
                  </div>
                </div>
                <div
                  className="col-lg-6"
                  data-aos="fade-right"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <div className="hero-images rmt-60">
                    <img
                      src="/assets/images/hero/hero-right.webp"
                      alt="Hero"
                      width={600}
                      height={600}
                      loading="eager"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <OfferCard />

          {/* SPECIAL OFFER */}
          <section
            className="offer-area bgc-black pt-160 rpt-100 pb-150 rpb-120 rel z-1"
            style={{
              backgroundImage:
                "url(/assets/images/background/offer-dot-bg.png)",
            }}
          >
            <span className="marquee-wrap style-two text-white">
              <span className="marquee-inner left">
                {t("homepage.marquee.specialDeal")}
              </span>
              <span className="marquee-inner left">
                {t("homepage.marquee.specialDeal")}
              </span>
              <span className="marquee-inner left">
                {t("homepage.marquee.specialDeal")}
              </span>
            </span>

            <div className="container">
              {isBannersLoading ? (
                <div className="text-white text-center py-5">
                  <p>{t("homepage.specialOffer.loadingOffers")}</p>
                </div>
              ) : banners && banners.length > 0 ? (
                <>
                  <div className="row align-items-center">
                    <div
                      className="col-lg-6"
                      key={`content-${activeBannerIndex}`}
                    >
                      <div
                        className="offer-content text-white rmb-55"
                        data-aos="fade-left"
                        data-aos-delay={50}
                        data-aos-duration={1500}
                        data-aos-offset={50}
                      >
                        <h2
                          style={{
                            fontSize:
                              locale === "am" || locale === "ru"
                                ? "2rem"
                                : undefined,
                          }}
                        >
                          {getLocalizedTitle(
                            banners[activeBannerIndex],
                            locale
                          ) || t("homepage.specialOffer.title")}
                        </h2>
                        <p>
                          {getLocalizedField(
                            banners[activeBannerIndex],
                            "text",
                            locale
                          ) || t("homepage.specialOffer.description")}
                        </p>
                        {banners[activeBannerIndex].url && (
                          <Link href="shop" className="theme-btn">
                            {t("homepage.specialOffer.moreInfo")}{" "}
                            <i className="far fa-arrow-alt-right" />
                          </Link>
                        )}
                      </div>
                    </div>

                    <div
                      className="col-lg-6 "
                      key={`image-${activeBannerIndex}`}
                    >
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                        data-aos="fade-right"
                        data-aos-delay={50}
                        data-aos-duration={1500}
                        data-aos-offset={50}
                      >
                        <img
                          src={banners[activeBannerIndex].image}
                          alt={
                            getLocalizedTitle(
                              banners[activeBannerIndex],
                              locale
                            ) || "Offer Image"
                          }
                          width={500}
                          height={500}
                          loading="eager"
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                        {banners[activeBannerIndex].price && (
                          <div
                            className="offer-badge"
                            style={{
                              backgroundImage:
                                "url(/assets/images/shapes/offer-circle-shape.png)",
                            }}
                          >
                            <span>
                              {t("common.only")} <br />
                              <span className="price">
                                ${banners[activeBannerIndex].price}
                              </span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Banner Indicators */}
                  {banners.length > 1 && (
                    <div
                      className="row mt-4"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      {banners.map((_, index) => (
                        <div
                          key={index}
                          onClick={() => handleDotClick(index)}
                          style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            backgroundColor:
                              index === activeBannerIndex
                                ? "#ff6b6b"
                                : "#ffffff",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            opacity: index === activeBannerIndex ? 1 : 0.5,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div
                      className="offer-content text-white rmb-55"
                      data-aos="fade-left"
                      data-aos-delay={50}
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <h2
                        style={{
                          fontSize:
                            locale === "am" || locale === "ru"
                              ? "2rem"
                              : undefined,
                        }}
                      >
                        {t("homepage.specialOffer.title")}
                      </h2>
                      <p>{t("homepage.specialOffer.description")}</p>
                      <Link href="shop" className="theme-btn">
                        {t("homepage.specialOffer.shopNow")}{" "}
                        <i className="far fa-arrow-alt-right" />
                      </Link>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div
                      className="offer-image"
                      data-aos="fade-right"
                      data-aos-delay={50}
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <img
                        src="/assets/images/offer/offer-img.png"
                        alt="Offer Image"
                        width={500}
                        height={500}
                        loading="eager"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                      <div
                        className="offer-badge"
                        style={{
                          backgroundImage:
                            "url(/assets/images/shapes/offer-circle-shape.png)",
                        }}
                      >
                        <span>
                          {t("common.only")} <br />
                          <span className="price">$59</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* WHY CHOOSE US */}
          <section className="why-choose-area bgc-lighter pt-240 rpt-150 pb-100 rpb-70 rel z-1">
            <span className="marquee-wrap style-two">
              <span className="marquee-inner left">
                {t("homepage.whyChooseUs.marquee")}
              </span>
              <span className="marquee-inner left">
                {t("homepage.whyChooseUs.marquee")}
              </span>
              <span className="marquee-inner left">
                {t("homepage.whyChooseUs.marquee")}
              </span>
            </span>

            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div
                    className="why-choose-content rmb-30"
                    data-aos="fade-up"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <div className="section-title mb-25">
                      <span className="sub-title mb-5">
                        {t("homepage.whyChooseUs.subtitle")}
                      </span>
                      <h2>{t("homepage.whyChooseUs.title")}</h2>
                    </div>

                    <p>{t("homepage.whyChooseUs.description")}</p>

                    <div className="row">
                      <div className="col-sm-4 col-6">
                        <div className="counter-item counter-text-wrap">
                          <span className="count-text k-plus">
                            <Counter end={34} />
                          </span>
                          <span className="counter-title">
                            {t("homepage.whyChooseUs.premiumFlavors")}
                          </span>
                        </div>
                      </div>

                      <div className="col-sm-4 col-6">
                        <div className="counter-item counter-text-wrap">
                          <span className="count-text plus">
                            <Counter end={356} />
                          </span>
                          <span className="counter-title">
                            {t("homepage.whyChooseUs.satisfiedCustomers")}
                          </span>
                        </div>
                      </div>

                      <div className="col-sm-4 col-6">
                        <div className="counter-item counter-text-wrap">
                          <span className="count-text plus">
                            <Counter end={853} />
                          </span>
                          <span className="counter-title">
                            {t("homepage.whyChooseUs.hookahAccessories")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* MARQUEE */}
          <div className="headline-area bgc-black pt-120 rpt-90 rel z-2">
            <span className="marquee-wrap white-text">
              <span className="marquee-inner left">
                <span className="marquee-item">
                  {t("homepage.marqueeItems.hookah")}
                </span>
                <span className="marquee-item">
                  <i className="flaticon-star" />
                </span>
                <span className="marquee-item">
                  {t("homepage.marqueeItems.premiumSmoke")}
                </span>
                <span className="marquee-item">
                  <i className="flaticon-star" />
                </span>
                <span className="marquee-item">
                  {t("homepage.marqueeItems.clouds")}
                </span>
                <span className="marquee-item">
                  <i className="flaticon-star" />
                </span>
              </span>
            </span>
          </div>

          {/* BEST SELLERS */}
          <section className="testimonials-area bgc-black pt-105 rpt-85 pb-130 rpb-100 rel z-1">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-7 col-lg-8">
                  <div className="section-title text-white text-center mb-50">
                    <span className="sub-title mb-5">
                      {t("homepage.bestSellers.subtitle")}
                    </span>
                    <h2>{t("homepage.bestSellers.title")}</h2>
                  </div>
                </div>
              </div>

              <div className="row">
                {isLoading && (
                  <div className="text-white text-center py-5">
                    <p>{t("homepage.bestSellers.loading")}</p>
                  </div>
                )}

                {bestSellers && bestSellers.length > 0
                  ? bestSellers.map((product, index) => (
                      <ProductCard
                        key={product.id || index}
                        index={index}
                        product={product}
                      />
                    ))
                  : !isLoading &&
                    !error && (
                      <div className="text-white text-center py-5">
                        <p>{t("homepage.bestSellers.noProducts")}</p>
                      </div>
                    )}
              </div>
            </div>
          </section>
        </WellFoodLayout>
      )}
    </>
  );
};

export default page;
