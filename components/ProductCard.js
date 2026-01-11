"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/contexts/LocaleContext";
import { getLocalizedTitle } from "@/utils/localization";
import Tooltip from "@mui/material/Tooltip";

const ProductCard = ({ product, index }) => {
  const t = useTranslations();
  const { addToCart } = useCart();
  const { locale } = useLocale();

  const localizedTitle = getLocalizedTitle(product, locale);
  const localizedCategoryName = product.category
    ? getLocalizedTitle(product.category, locale)
    : product.categoryName || "";

  const isArmenian = locale === "am";

  const handleCardClick = () => {
    window.location.href = `/product-details/${product.id || product.slug}`;
  };

  return (
    <div
      key={product.id || index}
      className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
      data-aos="fade-up"
      data-aos-delay={
        index % 4 === 0 ? 0 : index % 4 === 1 ? 50 : index % 4 === 2 ? 100 : 150
      }
      data-aos-duration={1500}
      data-aos-offset={50}
    >
      <div
        className="product-item-two"
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
      >
        <div className="image" style={{ position: "relative" }}>
          <img
            src={`${product.imageUrls[0]}` || "assets/images/dishes/dish1.png"}
            alt={localizedTitle}
            width={400}
            height={400}
            loading="lazy"
            style={
              product.stock === 0
                ? { opacity: 0.6, aspectRatio: "1/1", objectFit: "cover" }
                : { aspectRatio: "1/1", objectFit: "cover" }
            }
          />
          {product.stock === 0 && (
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
                width={200}
                height={100}
                loading="lazy"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          )}
          {localizedCategoryName && (
            <Link
              href={`/category/${
                product.category?.slug ||
                product.categorySlug ||
                product.category?.id ||
                product.categoryId
              }`}
              className="category-badge"
              onClick={(e) => e.stopPropagation()}
            >
              {localizedCategoryName}
            </Link>
          )}
        </div>
        <div className="content">
          {product.rating && (
            <div className="ratting">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`fas fa-star${
                    i < Math.floor(product.rating) ? "" : "-o"
                  }`}
                />
              ))}
              {product.reviewCount && <span>({product.reviewCount})</span>}
            </div>
          )}
          <Tooltip title={localizedTitle} arrow placement="top">
            <h5
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              <Link href={`/product-details/${product.id || product.slug}`}>
                {localizedTitle}
              </Link>
            </h5>
          </Tooltip>
          <span className="price">
            {product.originalPrice && product.originalPrice > product.price && (
              <del>{product.originalPrice} AMD</del>
            )}{" "}
            {product.price} AMD
          </span>
        </div>
        {product.stock !== 0 && (
          <Tooltip title={isArmenian ? t("common.addToCart") : ""} arrow>
            <button
              className="theme-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (product.stock !== 0) {
                  addToCart(product, 1);
                }
              }}
              disabled={product.stock === 0}
              style={
                product.stock === 0
                  ? {
                      opacity: 0.5,
                      cursor: "not-allowed",
                      backgroundColor: "#999",
                    }
                  : {}
              }
              aria-label={t("common.addToCart")}
            >
              {product.stock === 0 ? (
                t("common.outOfStock")
              ) : isArmenian ? (
                // Show basket icon only for Armenian locale to avoid overflow
                <i className="fas fa-shopping-basket" aria-hidden="true" />
              ) : (
                <>
                  {t("common.addToCart")} <i className="far fa-arrow-alt-right" />
                </>
              )}
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
