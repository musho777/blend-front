"use client";
import PageBanner from "@/components/PageBanner";
import WellFoodLayout from "@/layout/WellFoodLayout";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import {
  useCategories,
  useCategoryById,
} from "@/hooks/queries/useCategoriesQuery";
import { useProductsByCategory } from "@/hooks/queries/useProductsByCategoryQuery";

const CategoryPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const categorySlug = params.slug;

  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [limit] = useState(12);

  const decodedSlug = decodeURIComponent(categorySlug);
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const currentCategory = useMemo(() => {
    if (!categories) return null;
    return categories.find(
      (cat) =>
        cat.title?.toLowerCase() === decodedSlug.toLowerCase() ||
        cat.slug?.toLowerCase() === decodedSlug.toLowerCase() ||
        cat.name?.toLowerCase() === decodedSlug.toLowerCase()
    );
  }, [categories, decodedSlug]);

  const { data: categoryData, isLoading: categoryLoading } = useCategoryById(
    currentCategory?.id
  );

  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
  } = useProductsByCategory(currentCategory?.id, currentPage, limit);

  const isLoading = categoriesLoading || categoryLoading || productsLoading;
  const category = categoryData || currentCategory;
  const products = productsData?.data || [];
  const meta = productsData?.meta || {
    page: 1,
    limit: 12,
    total: 0,
    pages: 1,
    hasNext: false,
    hasPrevious: false,
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <WellFoodLayout>
      <PageBanner
        pageTitle={category?.name || category?.title || decodedSlug}
        backgroundImage={
          category?.image
            ? `http://localhost:3000/${category.image}`
            : category?.imageUrl
            ? `http://localhost:3000/${category.imageUrl}`
            : undefined
        }
      />
      <section className="shop-area py-130 rpy-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-8">
              <div className="shop-sidebar rmb-75">
                <div
                  className="widget widget-search"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <h4 className="widget-title">Search</h4>
                  <form action="#" className="default-search-form">
                    <input type="text" placeholder="Search here" required="" />
                    <button
                      type="submit"
                      className="searchbutton far fa-search"
                    />
                  </form>
                </div>
                <div
                  className="widget widget-category"
                  data-aos="fade-up"
                  data-aos-delay={50}
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <h4 className="widget-title">Category</h4>
                  <ul>
                    <li>
                      <Link href="shop">
                        Beef &amp; Chicken Hamburger{" "}
                        <span className="count">8</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="shop">
                        Italian Pizza <span className="count">3</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="shop">
                        Sandwich <span className="count">5</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="shop">
                        Chicken Roll <span className="count">2</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="shop">
                        Soup <span className="count">5</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div
                  className="widget widget-filter"
                  data-aos="fade-up"
                  data-aos-delay={50}
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <h4 className="widget-title">Pricing</h4>
                  <div className="price-filter-wrap">
                    <div className="price-slider-range" />
                    <div className="price">
                      <span>Price </span>
                      <input type="text" id="price" readOnly="" />
                    </div>
                  </div>
                </div>
                <div
                  className="widget widget-products"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                ></div>
                <div
                  className="widget widget-tag-cloud"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                ></div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="shop-page-wrap">
                <div className="shop-shorter rel z-3 mb-35">
                  <div
                    className="sort-text mb-15"
                    data-aos="fade-left"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    {isLoading
                      ? "Loading..."
                      : `Showing ${(meta.page - 1) * meta.limit + 1}–${Math.min(
                          meta.page * meta.limit,
                          meta.total
                        )} of ${meta.total} results for ${
                          category?.name || category?.title || decodedSlug
                        }`}
                  </div>
                  <div
                    className="products-dropdown mb-15"
                    data-aos="fade-right"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <select>
                      <option value="default" selected="">
                        Default Sorting
                      </option>
                      <option value="new">Newness Sorting</option>
                      <option value="old">Oldest Sorting</option>
                      <option value="hight-to-low">High To Low</option>
                      <option value="low-to-high">Low To High</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  {isLoading ? (
                    <div className="col-12 text-center py-5">
                      <p>Loading products...</p>
                    </div>
                  ) : productsError ? (
                    <div className="col-12 text-center py-5">
                      <p>Error loading products. Please try again later.</p>
                    </div>
                  ) : products.length === 0 ? (
                    <div className="col-12 text-center py-5">
                      <p>No products found in this category.</p>
                    </div>
                  ) : (
                    products.map((product, index) => (
                      <div
                        key={product.id || index}
                        className="col-xl-4 col-sm-6"
                        data-aos="fade-up"
                        data-aos-delay={
                          index % 3 === 0 ? 0 : index % 3 === 1 ? 50 : 100
                        }
                        data-aos-duration={1500}
                        data-aos-offset={50}
                      >
                        <div className="product-item-two">
                          <div className="image">
                            <img
                              src={
                                `http://localhost:3000/${product.imageUrls[0]}` ||
                                "assets/images/dishes/dish1.png"
                              }
                              alt={product.name || product.title}
                            />
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
                                {product.reviewCount && (
                                  <span>({product.reviewCount})</span>
                                )}
                              </div>
                            )}
                            <h5>
                              <Link
                                href={`/product-details/${
                                  product.id || product.slug
                                }`}
                              >
                                {product.name || product.title}
                              </Link>
                            </h5>
                            <span className="price">
                              {product.originalPrice &&
                                product.originalPrice > product.price && (
                                  <del>${product.originalPrice}</del>
                                )}{" "}
                              ${product.price}
                            </span>
                          </div>
                          <Link
                            href={`/product-details/${
                              product.id || product.slug
                            }`}
                            className="theme-btn"
                          >
                            add to cart <i className="far fa-arrow-alt-right" />
                          </Link>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {!isLoading && products.length > 0 && meta.pages > 1 && (
                  <ul
                    className="pagination pt-30 flex-wrap"
                    data-aos="fade-up"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <li
                      className={`page-item ${
                        !meta.hasPrevious ? "disabled" : ""
                      }`}
                    >
                      {meta.hasPrevious ? (
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          <i className="fal fa-arrow-left" />
                        </button>
                      ) : (
                        <span className="page-link">
                          <i className="fal fa-arrow-left" />
                        </span>
                      )}
                    </li>

                    {[...Array(meta.pages)].map((_, index) => {
                      const pageNumber = index + 1;
                      // Show first page, last page, current page, and pages around current
                      if (
                        pageNumber === 1 ||
                        pageNumber === meta.pages ||
                        (pageNumber >= currentPage - 1 &&
                          pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <li
                            key={pageNumber}
                            className={`page-item ${
                              currentPage === pageNumber ? "active" : ""
                            }`}
                          >
                            {currentPage === pageNumber ? (
                              <span className="page-link">
                                {pageNumber}
                                <span className="sr-only">(current)</span>
                              </span>
                            ) : (
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(pageNumber)}
                              >
                                {pageNumber}
                              </button>
                            )}
                          </li>
                        );
                      } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return (
                          <li key={pageNumber} className="page-item disabled">
                            <span className="page-link">...</span>
                          </li>
                        );
                      }
                      return null;
                    })}

                    <li
                      className={`page-item ${!meta.hasNext ? "disabled" : ""}`}
                    >
                      {meta.hasNext ? (
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          <i className="fal fa-arrow-right" />
                        </button>
                      ) : (
                        <span className="page-link">
                          <i className="fal fa-arrow-right" />
                        </span>
                      )}
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </WellFoodLayout>
  );
};

export default CategoryPage;
