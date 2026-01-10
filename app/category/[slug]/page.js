"use client";
import PageBanner from "@/components/PageBanner";
import WellFoodLayout from "@/layout/WellFoodLayout";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, useEffect, useCallback } from "react";
import {
  useCategories,
  useCategoryById,
} from "@/hooks/queries/useCategoriesQuery";
import { useProductsByCategory } from "@/hooks/queries/useProductsByCategoryQuery";
import ProductCard from "@/components/ProductCard";
import {
  Select,
  MenuItem,
  FormControl,
  Slider,
  Typography,
  Box,
} from "@mui/material";

const CategoryPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categorySlug = params.slug;
  const subcategoryId = searchParams.get("subcategoryId");
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const limitFromUrl = parseInt(searchParams.get("limit")) || 12;
  const searchFromUrl = searchParams.get("search") || "";
  const sortByFromUrl = searchParams.get("sortBy") || "default";
  const minPriceFromUrl = searchParams.get("minPrice")
    ? parseInt(searchParams.get("minPrice"))
    : null;
  const maxPriceFromUrl = searchParams.get("maxPrice")
    ? parseInt(searchParams.get("maxPrice"))
    : null;

  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [limit] = useState(limitFromUrl);
  const [searchInput, setSearchInput] = useState(searchFromUrl);
  const [debouncedSearch, setDebouncedSearch] = useState(searchFromUrl);
  const [sortBy, setSortBy] = useState(sortByFromUrl);
  const [priceRange, setPriceRange] = useState([
    minPriceFromUrl || 0,
    maxPriceFromUrl || 1000000,
  ]);
  const [debouncedPriceRange, setDebouncedPriceRange] = useState([
    minPriceFromUrl || 0,
    maxPriceFromUrl || 1000000,
  ]);

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
  } = useProductsByCategory(
    currentCategory?.id,
    currentPage,
    limit,
    subcategoryId,
    debouncedSearch,
    sortBy,
    debouncedPriceRange[0] > 0 ? debouncedPriceRange[0] : null,
    debouncedPriceRange[1] < 1000000 ? debouncedPriceRange[1] : null
  );

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

  // Debounce search input (300ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Debounce price range (500ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPriceRange(priceRange);
    }, 500);

    return () => clearTimeout(timer);
  }, [priceRange]);

  // Update URL query parameters
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();

    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    params.set("limit", limit.toString());

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    }

    if (subcategoryId) {
      params.set("subcategoryId", subcategoryId);
    }

    if (sortBy && sortBy !== "default") {
      params.set("sortBy", sortBy);
    }

    if (debouncedPriceRange[0] > 0) {
      params.set("minPrice", debouncedPriceRange[0].toString());
    }

    if (debouncedPriceRange[1] < 1000000) {
      params.set("maxPrice", debouncedPriceRange[1].toString());
    }

    const queryString = params.toString();
    const newURL = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    router.push(newURL, { scroll: false });
  }, [
    currentPage,
    limit,
    debouncedSearch,
    subcategoryId,
    sortBy,
    debouncedPriceRange,
    router,
  ]);

  // Update URL when search, page, or filters change
  useEffect(() => {
    updateURL();
  }, [updateURL]);

  // Reset to page 1 when search changes
  useEffect(() => {
    if (debouncedSearch !== searchFromUrl) {
      setCurrentPage(1);
    }
  }, [debouncedSearch, searchFromUrl]);

  // Reset to page 1 when price range changes
  useEffect(() => {
    if (
      debouncedPriceRange[0] !== (minPriceFromUrl || 0) ||
      debouncedPriceRange[1] !== (maxPriceFromUrl || 1000000)
    ) {
      setCurrentPage(1);
    }
  }, [debouncedPriceRange, minPriceFromUrl, maxPriceFromUrl]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    console.log("Sort changed to:", value);
    setSortBy(value);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <WellFoodLayout>
      <PageBanner
        pageTitle={category?.name || category?.title || decodedSlug}
        backgroundImage={
          category?.image
            ? `${category.image}`
            : category?.imageUrl
            ? `${category.imageUrl}`
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
                  <form
                    action="#"
                    className="default-search-form"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      type="text"
                      placeholder="Search here"
                      value={searchInput}
                      onChange={handleSearchChange}
                    />
                    <button
                      type="submit"
                      className="searchbutton far fa-search"
                    />
                  </form>
                </div>
                {/* <div
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
                </div> */}
                <div
                  className="widget widget-filter"
                  data-aos="fade-up"
                  data-aos-delay={50}
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <h4 className="widget-title">Pricing</h4>
                  <Box sx={{ px: 2, py: 3 }}>
                    <Slider
                      value={priceRange}
                      onChange={handlePriceRangeChange}
                      valueLabelDisplay="auto"
                      min={0}
                      max={1000000}
                      step={10}
                      sx={{
                        color: "#c9a164",
                        "& .MuiSlider-thumb": {
                          width: 16,
                          height: 16,
                          backgroundColor: "#c9a164",
                          "&:hover, &.Mui-focusVisible": {
                            boxShadow: "0 0 0 8px rgba(201, 161, 100, 0.16)",
                          },
                        },
                        "& .MuiSlider-track": {
                          backgroundColor: "#c9a164",
                        },
                        "& .MuiSlider-rail": {
                          backgroundColor: "#e8e8e8",
                        },
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        {priceRange[0]} AMD
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        {priceRange[1]} AMD
                      </Typography>
                    </Box>
                  </Box>
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
                    <FormControl fullWidth>
                      <Select
                        value={sortBy}
                        onChange={handleSortChange}
                        displayEmpty
                        sx={{
                          height: "42px",
                          backgroundColor: "#fff",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e8e8e8",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#dbdbdb",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#999",
                          },
                        }}
                      >
                        <MenuItem value="default">Default Sorting</MenuItem>
                        <MenuItem value="newest">Newness Sorting</MenuItem>
                        <MenuItem value="oldest">Oldest Sorting</MenuItem>
                        <MenuItem value="price_high_to_low">
                          High To Low
                        </MenuItem>
                        <MenuItem value="price_low_to_high">
                          Low To High
                        </MenuItem>
                      </Select>
                    </FormControl>
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
                      <ProductCard index={index} product={product} />
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
