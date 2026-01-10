"use client";
import WellFoodLayout from "@/layout/WellFoodLayout";
import LoadingScreen from "@/components/LoadingScreen";
import Link from "next/link";
import { Nav, Tab } from "react-bootstrap";
import { useProduct } from "@/hooks/queries/useProductQuery";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import QuantityControl from "@/components/QuantityControl";
import { sliderProps } from "@/utility/sliderProps";

const ProductDetailsPage = ({ params }) => {
  const { id } = params;
  const { data, isLoading, error } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);
  const { addToCart, openCartModal } = useCart();

  const product = data?.product || data;
  const suggestions = data?.suggestions || [];

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, quantity);
    openCartModal();
  };

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        background: "rgba(255, 255, 255, 0.9)",
        border: "none",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        padding: "0",
        lineHeight: "1",
      }}
    >
      <i
        className="fas fa-chevron-right"
        style={{
          color: "#333",
          fontSize: "16px",
          display: "flex",
          marginLeft: 2,
        }}
      ></i>
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        background: "rgba(255, 255, 255, 0.9)",
        border: "none",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        padding: "0",
        lineHeight: "1",
      }}
    >
      <i
        className="fas fa-chevron-left"
        style={{
          color: "#333",
          fontSize: "16px",
          display: "flex",
        }}
      ></i>
    </button>
  );

  const sliderSettings = {
    dots: true,
    infinite: product?.imageUrls?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: false,
    fade: false,
    adaptiveHeight: true,
  };

  const showLoading = !mounted || isLoading;

  return (
    <>
      <LoadingScreen isLoading={showLoading} />
      {!showLoading && (
        <WellFoodLayout headerBlack={true}>
          <section className="product-details pb-10 pt-130 rpt-100">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div
                    className="product-details-image rmb-55"
                    data-aos="fade-left"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                    style={{ position: "relative" }}
                  >
                    {product?.imageUrls && product?.imageUrls.length > 1 ? (
                      <Slider
                        {...sliderSettings}
                        className="product-image-slider"
                      >
                        {product?.imageUrls.map((imageUrl, index) => (
                          <div key={index} className="slider-item">
                            <img
                              src={imageUrl}
                              alt={`${product.name || product.title} - Image ${
                                index + 1
                              }`}
                              style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                                opacity: product.stock === 0 ? 0.6 : 1,
                              }}
                            />
                          </div>
                        ))}
                      </Slider>
                    ) : product?.imageUrls &&
                      product?.imageUrls.length === 1 ? (
                      <img
                        src={product.imageUrls[0]}
                        alt={product?.name || product?.title}
                        style={{
                          width: "100%",
                          height: "auto",
                          opacity: product?.stock === 0 ? 0.6 : 1,
                        }}
                      />
                    ) : (
                      <img
                        src="assets/images/products/product-details.jpg"
                        alt={product?.name || product?.title}
                        style={{ opacity: product?.stock === 0 ? 0.6 : 1 }}
                      />
                    )}
                    {product?.stock === 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "40%",
                          zIndex: 10,
                          pointerEvents: "none",
                        }}
                      >
                        <img
                          src="/assets/images/sold-out-grunge-rubber-stamp-free-png.webp"
                          alt="Sold Out"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div
                    className="product-details-content"
                    data-aos="fade-right"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <div className="section-title">
                      <h2>{product?.name || product?.title}</h2>
                    </div>
                    <span className="price mb-15">
                      {product?.originalPrice &&
                        product?.originalPrice > product?.price && (
                          <del>{product?.originalPrice} AMD</del>
                        )}{" "}
                      {product?.price} AMD
                    </span>
                    {product?.rating && (
                      <div className="ratting mb-40">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star${
                              i < Math.floor(product?.rating) ? "" : "-o"
                            }`}
                          />
                        ))}
                        <span>
                          {product?.rating}
                          {product?.reviewCount &&
                            `(${product?.reviewCount} Reviews)`}
                        </span>
                      </div>
                    )}
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          product?.description ||
                          "<p>Delicious and freshly prepared. Perfect for any occasion.</p>",
                      }}
                    />
                    <form
                      onSubmit={handleAddToCart}
                      className="add-to-cart py-25"
                    >
                      <h5>Quantity</h5>
                      <QuantityControl
                        value={quantity}
                        onChange={setQuantity}
                        max={product?.stock || 99}
                        disabled={product?.stock === 0}
                      />
                      {product?.stock > 0 && product?.stock <= 10 && (
                        <p
                          style={{
                            color: "#ff6b6b",
                            fontSize: "14px",
                            marginTop: "8px",
                          }}
                        >
                          Only {product.stock} left in stock!
                        </p>
                      )}
                      <button
                        type="submit"
                        className="theme-btn"
                        disabled={product?.stock === 0}
                        style={
                          product?.stock === 0
                            ? {
                                opacity: 0.5,
                                cursor: "not-allowed",
                                backgroundColor: "#999",
                              }
                            : {}
                        }
                      >
                        {product?.stock === 0 ? "Out of Stock" : "Add to Cart"}{" "}
                        <i className="far fa-arrow-alt-right" />
                      </button>
                    </form>
                    <ul className="category-tags pt-20 pb-30">
                      {(product?.category?.name ||
                        product?.categoryName ||
                        product?.category?.title) && (
                        <li>
                          <h6>Categories</h6> :
                          <Link
                            href={`/category/${
                              product?.category?.slug ||
                              product?.categorySlug ||
                              product?.category?.id ||
                              product?.categoryId
                            }`}
                          >
                            {product?.category?.name ||
                              product?.categoryName ||
                              product?.category?.title}
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <Tab.Container defaultActiveKey={"details"}>
                <Tab.Content
                  className="tab-content pb-60"
                  data-aos="fade-up"
                  data-aos-delay={50}
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <Tab.Pane className="tab-pane fade" eventKey="details">
                    {product?.ingredients && (
                      <div className="mt-20">
                        <h6>Ingredients:</h6>
                        <p>{product.ingredients}</p>
                      </div>
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>

              {/* Suggested Products Slider */}
              {suggestions && suggestions.length > 0 && (
                <div className="suggested-products-area pt-60 pb-60">
                  <div className="row justify-content-center">
                    <div className="col-lg-12">
                      <div
                        className="section-title text-center mb-50"
                        data-aos="fade-up"
                        data-aos-duration={1500}
                        data-aos-offset={50}
                      >
                        <span className="sub-title mb-5">
                          You May Also Like
                        </span>
                        <h2>Suggested Products</h2>
                      </div>
                    </div>
                  </div>
                  <Slider
                    {...sliderProps.pizzaActive}
                    className="suggested-products-slider"
                  >
                    {suggestions.map((suggestedProduct, index) => (
                      <div key={suggestedProduct.id || index} className="px-2">
                        <div
                          className="product-item-two"
                          onClick={() => {
                            window.location.href = `/product-details/${
                              suggestedProduct.id || suggestedProduct.slug
                            }`;
                          }}
                          style={{ cursor: "pointer" }}
                          data-aos="fade-up"
                          data-aos-delay={
                            index % 4 === 0
                              ? 0
                              : index % 4 === 1
                              ? 50
                              : index % 4 === 2
                              ? 100
                              : 150
                          }
                          data-aos-duration={1500}
                          data-aos-offset={50}
                        >
                          <div
                            className="image"
                            style={{ position: "relative" }}
                          >
                            <img
                              src={suggestedProduct.imageUrls?.[0]}
                              alt={
                                suggestedProduct.name || suggestedProduct.title
                              }
                              style={
                                suggestedProduct.stock === 0
                                  ? { opacity: 0.6 }
                                  : {}
                              }
                            />
                            {suggestedProduct.stock === 0 && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  width: "60%",
                                  zIndex: 10,
                                  pointerEvents: "none",
                                }}
                              >
                                <img
                                  src="/assets/images/sold-out-grunge-rubber-stamp-free-png.webp"
                                  alt="Sold Out"
                                  style={{ width: "100%", height: "auto" }}
                                />
                              </div>
                            )}
                            {(suggestedProduct.category?.name ||
                              suggestedProduct.categoryName ||
                              suggestedProduct.category?.title) && (
                              <Link
                                href={`/category/${
                                  suggestedProduct.category?.slug ||
                                  suggestedProduct.categorySlug ||
                                  suggestedProduct.category?.id ||
                                  suggestedProduct.categoryId
                                }`}
                                className="category-badge"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {suggestedProduct.category?.name ||
                                  suggestedProduct.categoryName ||
                                  suggestedProduct.category?.title}
                              </Link>
                            )}
                          </div>
                          <div className="content">
                            {suggestedProduct.rating && (
                              <div className="ratting">
                                {[...Array(5)].map((_, i) => (
                                  <i
                                    key={i}
                                    className={`fas fa-star${
                                      i < Math.floor(suggestedProduct.rating)
                                        ? ""
                                        : "-o"
                                    }`}
                                  />
                                ))}
                                {suggestedProduct.reviewCount && (
                                  <span>({suggestedProduct.reviewCount})</span>
                                )}
                              </div>
                            )}
                            <h5
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "100%",
                              }}
                            >
                              <Link
                                href={`/product-details/${
                                  suggestedProduct.id || suggestedProduct.slug
                                }`}
                              >
                                {suggestedProduct.name ||
                                  suggestedProduct.title}
                              </Link>
                            </h5>
                            <span className="price">
                              {suggestedProduct.originalPrice &&
                                suggestedProduct.originalPrice >
                                  suggestedProduct.price && (
                                  <del>
                                    {suggestedProduct.originalPrice} AMD
                                  </del>
                                )}{" "}
                              {suggestedProduct.price} AMD
                            </span>
                          </div>
                          {suggestedProduct.stock !== 0 && (
                            <button
                              className="theme-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (suggestedProduct.stock !== 0) {
                                  addToCart(suggestedProduct, 1);
                                  openCartModal();
                                }
                              }}
                              disabled={suggestedProduct.stock === 0}
                              style={
                                suggestedProduct.stock === 0
                                  ? {
                                      opacity: 0.5,
                                      cursor: "not-allowed",
                                      backgroundColor: "#999",
                                    }
                                  : {}
                              }
                            >
                              {suggestedProduct.stock === 0
                                ? "Out of Stock"
                                : "add to cart"}{" "}
                              <i className="far fa-arrow-alt-right" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              )}
            </div>
          </section>
        </WellFoodLayout>
      )}
    </>
  );
};
export default ProductDetailsPage;
