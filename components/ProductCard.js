"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/contexts/LocaleContext";
import { getLocalizedTitle } from "@/utils/localization";
import Tooltip from "@mui/material/Tooltip";

const ProductCard = ({ product, index }) => {
  const t = useTranslations();
  const tCart = useTranslations("cart");
  const { addToCart } = useCart();
  const { locale } = useLocale();

  const localizedTitle = getLocalizedTitle(product, locale);
  const localizedCategoryName = product.category
    ? getLocalizedTitle(product.category, locale)
    : product.categoryName || "";

  const isArmenian = locale === "am";

  // Style constants
  const cursorPointerStyle = { cursor: "pointer" };
  const imageContainerStyle = { position: "relative" };
  const imageBaseStyle = { aspectRatio: "1/1", objectFit: "cover" };
  const imageOutOfStockStyle = { opacity: 0.6, aspectRatio: "1/1", objectFit: "cover" };
  const soldOutOverlayStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    zIndex: 10,
    pointerEvents: "none",
  };
  const soldOutImageStyle = { width: "100%", height: "auto" };
  const titleEllipsisStyle = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "100%",
  };
  const buttonDisabledStyle = {
    opacity: 0.5,
    cursor: "not-allowed",
    backgroundColor: "#999",
  };
  const buttonEnabledStyle = {};

  const handleCardClick = useCallback(() => {
    window.location.href = `/product-details/${product.id || product.slug}`;
  }, [product.id, product.slug]);

  const handleAddToCart = useCallback(
    (e) => {
      e.stopPropagation();
      if (product.stock !== 0) {
        const success = addToCart(product, 1);
        if (success) {
          const message = localizedCategoryName
            ? tCart("addedToCart", {
                product: localizedTitle,
                category: localizedCategoryName,
              })
            : tCart("addedToCartNoCategory", {
                product: localizedTitle,
              });
          toast.success(message);
        } else {
          toast.error(
            tCart("stockLimitReached", {
              stock: product.stock,
            })
          );
        }
      } else {
        toast.error(tCart("addToCartError"));
      }
    },
    [
      product,
      addToCart,
      localizedCategoryName,
      localizedTitle,
      tCart,
    ]
  );

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
        style={cursorPointerStyle}
      >
        <div className="image" style={imageContainerStyle}>
          <img
            src={`${product.imageUrls[0]}` || "assets/images/dishes/dish1.png"}
            alt={localizedTitle}
            width={400}
            height={400}
            loading="lazy"
            style={product.stock === 0 ? imageOutOfStockStyle : imageBaseStyle}
          />
          {product.stock === 0 && (
            <div style={soldOutOverlayStyle}>
              <img
                src="/assets/images/sold-out-grunge-rubber-stamp-free-png.webp"
                alt="Sold Out"
                width={200}
                height={100}
                loading="lazy"
                style={soldOutImageStyle}
              />
            </div>
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
            <h5 style={titleEllipsisStyle}>
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
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              style={product.stock === 0 ? buttonDisabledStyle : buttonEnabledStyle}
              aria-label={t("common.addToCart")}
            >
              {product.stock === 0 ? (
                t("common.outOfStock")
              ) : isArmenian ? (
                // Show basket icon only for Armenian locale to avoid overflow
                <i className="fas fa-shopping-basket" aria-hidden="true" />
              ) : (
                <>
                  {t("common.addToCart")}{" "}
                  <i className="far fa-arrow-alt-right" />
                </>
              )}
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
