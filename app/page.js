"use client";
import { useState, useEffect } from "react";
import Counter from "@/components/Counter";
import OfferCard from "@/components/OfferCard";
import ProductCard from "@/components/ProductCard";
import LoadingScreen from "@/components/LoadingScreen";
import WellFoodLayout from "@/layout/WellFoodLayout";
import Link from "next/link";
import { useBestSellers } from "@/hooks/queries/useBestSellersQuery";
import { useBanners } from "@/hooks/queries/useBannersQuery";

const page = () => {
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
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div
                    className="hero-content text-white"
                    data-aos="fade-left"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <h1>PREMIUM HOOKAH</h1>
                    <p>
                      Welcome to your local hookah destination, where rich
                      flavors, smooth clouds, and a relaxing atmosphere come
                      together for the perfect smoke experience.
                    </p>
                  </div>
                </div>
                <div
                  className="col-lg-6"
                  data-aos="fade-right"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <div className="hero-images rmt-60">
                    <img src="/assets/images/hero/hero-right.webp" alt="Hero" />
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
              <span className="marquee-inner left">special hookah deal</span>
              <span className="marquee-inner left">special hookah deal</span>
              <span className="marquee-inner left">special hookah deal</span>
            </span>

            <div className="container">
              {isBannersLoading ? (
                <div className="text-white text-center py-5">
                  <p>Loading offers...</p>
                </div>
              ) : banners && banners.length > 0 ? (
                <>
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div
                        className="offer-content text-white rmb-55"
                        data-aos="fade-left"
                        data-aos-delay={50}
                        data-aos-duration={1500}
                        data-aos-offset={50}
                      >
                        <h2>
                          {banners[activeBannerIndex].title ||
                            "Exclusive hookah deal of the week"}
                        </h2>
                        {console.log(banners)}
                        <p>
                          {banners[activeBannerIndex].text ||
                            "Upgrade your smoking experience with high-quality hookahs, premium accessories, and carefully selected flavors — available for a limited time."}
                        </p>
                        <Link href="shop" className="theme-btn">
                          shop now <i className="far fa-arrow-alt-right" />
                        </Link>
                      </div>
                    </div>

                    <div className="col-lg-6 ">
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                        data-aos="fade-right"
                        data-aos-delay={50}
                        data-aos-duration={1500}
                        data-aos-offset={50}
                      >
                        <img
                          src={
                            `${process.env.NEXT_PUBLIC_BASE_URL}/${banners[activeBannerIndex].image}` ||
                            "assets/images/offer/offer-img.png"
                          }
                          alt={
                            banners[activeBannerIndex].title || "Offer Image"
                          }
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
                              only <br />
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
                      <h2>Exclusive hookah deal of the week</h2>
                      <p>
                        Upgrade your smoking experience with high-quality
                        hookahs, premium accessories, and carefully selected
                        flavors — available for a limited time.
                      </p>
                      <Link href="shop" className="theme-btn">
                        shop now <i className="far fa-arrow-alt-right" />
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
                      />
                      <div
                        className="offer-badge"
                        style={{
                          backgroundImage:
                            "url(/assets/images/shapes/offer-circle-shape.png)",
                        }}
                      >
                        <span>
                          only <br />
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
              <span className="marquee-inner left">Why choose us</span>
              <span className="marquee-inner left">Why choose us</span>
              <span className="marquee-inner left">Why choose us</span>
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
                      <span className="sub-title mb-5">Why choose us</span>
                      <h2>Premium Quality & Unmatched Hookah Experience</h2>
                    </div>

                    <p>
                      We bring together the finest hookahs, authentic tobacco
                      flavors, and premium accessories. Trusted by hookah lovers
                      who value smooth smoke, durability, and modern design.
                    </p>

                    <div className="row">
                      <div className="col-sm-4 col-6">
                        <div className="counter-item counter-text-wrap">
                          <span className="count-text k-plus">
                            <Counter end={34} />
                          </span>
                          <span className="counter-title">Premium Flavors</span>
                        </div>
                      </div>

                      <div className="col-sm-4 col-6">
                        <div className="counter-item counter-text-wrap">
                          <span className="count-text plus">
                            <Counter end={356} />
                          </span>
                          <span className="counter-title">
                            Satisfied Customers
                          </span>
                        </div>
                      </div>

                      <div className="col-sm-4 col-6">
                        <div className="counter-item counter-text-wrap">
                          <span className="count-text plus">
                            <Counter end={853} />
                          </span>
                          <span className="counter-title">
                            Hookah Accessories
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
                <span className="marquee-item">Hookah</span>
                <span className="marquee-item">
                  <i className="flaticon-star" />
                </span>
                <span className="marquee-item">Premium Smoke</span>
                <span className="marquee-item">
                  <i className="flaticon-star" />
                </span>
                <span className="marquee-item">Clouds</span>
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
                    <span className="sub-title mb-5">BEST SELLERS</span>
                    <h2>Top hookah products loved by our customers</h2>
                  </div>
                </div>
              </div>

              <div className="row">
                {isLoading && (
                  <div className="text-white text-center py-5">
                    <p>Loading best-selling hookah products...</p>
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
                        <p>
                          No best-selling hookah products available right now.
                        </p>
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
