"use client";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
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
            src={
              `http://localhost:3000/${product.imageUrls[0]}` ||
              "assets/images/dishes/dish1.png"
            }
            alt={product.name || product.title}
            style={product.stock === 0 ? { opacity: 0.6 } : {}}
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
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          )}
          {(product.category?.name ||
            product.categoryName ||
            product.category?.title) && (
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
              {product.category?.name ||
                product.categoryName ||
                product.category?.title}
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
          <h5>
            <Link href={`/product-details/${product.id || product.slug}`}>
              {product.name || product.title}
            </Link>
          </h5>
          <span className="price">
            {product.originalPrice && product.originalPrice > product.price && (
              <del>{product.originalPrice} AMD</del>
            )}{" "}
            {product.price} AMD
          </span>
        </div>
        {product.stock !== 0 && (
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
          >
            {product.stock === 0 ? "Out of Stock" : "add to cart"}{" "}
            <i className="far fa-arrow-alt-right" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
