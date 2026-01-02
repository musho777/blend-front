"use client";
import Counter from "@/components/Counter";
import OfferCard from "@/components/OfferCard";
import ProductCard from "@/components/ProductCard";
import WellFoodLayout from "@/layout/WellFoodLayout";
import Link from "next/link";
import { useBestSellers } from "@/hooks/queries/useBestSellersQuery";

const page = () => {
  const { data: bestSellers, isLoading, error } = useBestSellers();

  return (
    <WellFoodLayout>
      <section
        className="hero-area bgs-cover pt-180 rpt-150 pb-100 rel z-1"
        style={{ backgroundImage: "url(assets/images/background/hero.jpg)" }}
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
                  Welcome to your local hookah destination, where rich flavors,
                  smooth clouds, and a relaxing atmosphere come together for the
                  perfect smoke experience.
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
                <img src="assets/images/hero/hero-right.webp" alt="Hero" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <OfferCard />
      <section
        className="offer-area bgc-black pt-160 rpt-100 pb-150 rpb-120 rel z-1"
        style={{
          backgroundImage: "url(assets/images/background/offer-dot-bg.png)",
        }}
      >
        <span className="marquee-wrap style-two text-white">
          <span className="marquee-inner left">special deal</span>
          <span className="marquee-inner left">special deal</span>
          <span className="marquee-inner left">special deal</span>
        </span>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div
                className="offer-content text-white rmb-55"
                data-aos="fade-left"
                data-aos-delay={50}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <img src="assets/images/offer/delicious.png" alt="Image" />
                <h2>Special deal offer for this week</h2>
                <h3>
                  grilled beef meat only <span>$59</span>
                </h3>
                <p>
                  Restaurant, where culinary excellence meets warm hospitality
                  in every dish we serve nestled in the heart of city
                </p>
                <Link href="shop" className="theme-btn">
                  order now <i className="far fa-arrow-alt-right" />
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
                  src="assets/images/offer/offer-img.png"
                  alt="Offer Image"
                />
                <div
                  className="offer-badge"
                  style={{
                    backgroundImage:
                      "url(assets/images/shapes/offer-circle-shape.png)",
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
        </div>
      </section>
      <section className="why-choose-area bgc-lighter pt-240 rpt-150 pb-100 rpb-70 rel z-1">
        <span className="marquee-wrap style-two">
          <span className="marquee-inner left">Why choose Us</span>
          <span className="marquee-inner left">Why choose Us</span>
          <span className="marquee-inner left">Why choose Us</span>
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
                  <h2>We Offer quality service That Customers Needs</h2>
                </div>
                <p>
                  Welcome too restaurant, where culinary excellence meets warm
                  hospitality in every dish we serve. Nestled in the heart of
                  City Name our eatery invites you on a journey
                </p>
                <div className="about-btn-author mb-60">
                  <Link href="about" className="theme-btn">
                    learn more us <i className="far fa-arrow-alt-right" />
                  </Link>
                  <div className="author">
                    <img src="assets/images/about/author.jpg" alt="Author" />
                    <h6>
                      Ben A. Conners / <span>CEO &amp; Founder</span>
                    </h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4 col-6">
                    <div className="counter-item counter-text-wrap">
                      <span
                        className="count-text k-plus"
                        data-speed={3000}
                        data-stop={34}
                      >
                        <Counter end={34} />
                      </span>
                      <span className="counter-title">Organic Planting</span>
                    </div>
                  </div>
                  <div className="col-sm-4 col-6">
                    <div className="counter-item counter-text-wrap">
                      <span
                        className="count-text plus"
                        data-speed={3000}
                        data-stop={356}
                      >
                        <Counter end={356} />
                      </span>
                      <span className="counter-title">Passionate Chef’s</span>
                    </div>
                  </div>
                  <div className="col-sm-4 col-6">
                    <div className="counter-item counter-text-wrap">
                      <span
                        className="count-text plus"
                        data-speed={3000}
                        data-stop={853}
                      >
                        <Counter end={853} />
                      </span>
                      <span className="counter-title">Favourite Dishes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="headline-area bgc-black pt-120 rpt-90 rel z-2">
        <span className="marquee-wrap white-text">
          <span className="marquee-inner left">
            <span className="marquee-item">Blend</span>
            <span className="marquee-item">
              <i className="flaticon-star" />
            </span>
            <span className="marquee-item">Blend</span>
            <span className="marquee-item">
              <i className="flaticon-star" />
            </span>
            <span className="marquee-item">Blend</span>
            <span className="marquee-item">
              <i className="flaticon-star" />
            </span>
          </span>
          <span className="marquee-inner left">
            <span className="marquee-item">Blend</span>
            <span className="marquee-item">
              <i className="flaticon-star" />
            </span>
            <span className="marquee-item">Blend</span>
            <span className="marquee-item">
              <i className="flaticon-star" />
            </span>
            <span className="marquee-item">Blend</span>
            <span className="marquee-item">
              <i className="flaticon-star" />
            </span>
          </span>
          <span className="marquee-inner left">
            <span className="marquee-item">Italian pizza</span>
            <span className="marquee-item">
              <i className="flaticon-star" />
            </span>
            <span className="marquee-item">our Testimonials</span>
            <span className="marquee-item">
              <i className="flaticon-star" />
            </span>
            <span className="marquee-item">burger king</span>
            <span className="marquee-item">
              <i className="flaticon-star" />
            </span>
          </span>
        </span>
      </div>
      <section className="testimonials-area bgc-black pt-105 rpt-85 pb-130 rpb-100 rel z-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-8">
              <div
                className="section-title text-white text-center mb-50"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <span className="sub-title mb-5">BEST SELLERS</span>
                <h2>Most popular products chosen by our customers</h2>
              </div>
            </div>
          </div>
          <div>
            <div className="row">
              {isLoading && (
                <div className="text-white text-center py-5">
                  <p>Loading best sellers...</p>
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
                      <p>No best sellers available at the moment.</p>
                    </div>
                  )}
            </div>
          </div>
        </div>
      </section>
    </WellFoodLayout>
  );
};
export default page;
