"use client";
import { useTranslations } from 'next-intl';
import PageBanner from "@/components/PageBanner";
import PlusMinusBtn from "@/components/PlusMinusBtn";
import WellFoodLayout from "@/layout/WellFoodLayout";
import Link from "next/link";
const page = () => {
  const t = useTranslations('cart');
  return (
    <WellFoodLayout>
      <PageBanner pageTitle={t('pageTitle')} />
      <section className="shopping-cart-area py-130 rel z-1">
        <div className="container">
          <div className="shoping-table mb-50 wow fadeInUp delay-0-2s">
            <table>
              <thead>
                <tr>
                  <th>{t('images')}</th>
                  <th>{t('product')}</th>
                  <th>{t('unitPrice')}</th>
                  <th>{t('quantity')}</th>
                  <th>{t('total')}</th>
                  <th>{t('remove')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src="assets/images/widgets/news1.jpg" alt="Product" />
                  </td>
                  <td>
                    <span className="title">Shopping Cart</span>
                  </td>
                  <td>
                    <span className="price">70</span>
                  </td>
                  <td>
                    <PlusMinusBtn />
                  </td>
                  <td>
                    <b className="price">70</b>
                  </td>
                  <td>
                    <button type="button" className="close">
                      ×
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src="assets/images/widgets/news2.jpg" alt="Product" />
                  </td>
                  <td>
                    <span className="title">Chicken Soup</span>
                  </td>
                  <td>
                    <span className="price">65</span>
                  </td>
                  <td>
                    <PlusMinusBtn />
                  </td>
                  <td>
                    <b className="price">130</b>
                  </td>
                  <td>
                    <button type="button" className="close">
                      ×
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src="assets/images/widgets/news3.jpg" alt="Product" />
                  </td>
                  <td>
                    <span className="title">Red king Crab</span>
                  </td>
                  <td>
                    <span className="price">80</span>
                  </td>
                  <td>
                    <PlusMinusBtn />
                  </td>
                  <td>
                    <b className="price">80</b>
                  </td>
                  <td>
                    <button type="button" className="close">
                      ×
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row text-center text-lg-left align-items-center">
            <div className="col-lg-6">
              <div className="discount-wrapper mb-30 wow fadeInLeft delay-0-2s">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="d-sm-flex justify-content-center justify-content-lg-start"
                >
                  <input type="text" placeholder={t('couponCode')} required="" />
                  <button className="theme-btn flex-none" type="submit">
                    {t('applyCoupon')} <i className="fas fa-angle-double-right" />
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="update-shopping mb-30 text-lg-end wow fadeInRight delay-0-2s">
                <Link href="shop" className="theme-btn style-two my-5">
                  {t('shopping')} <i className="fas fa-angle-double-right" />
                </Link>
                <Link href="shop" className="theme-btn my-5">
                  {t('updateCart')} <i className="fas fa-angle-double-right" />
                </Link>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="shoping-cart-total pt-20 wow fadeInUp delay-0-2s">
                <h4 className="form-title mb-25 text-center">{t('cartTotals')}</h4>
                <table>
                  <tbody>
                    <tr>
                      <td>{t('cartSubtotal')}</td>
                      <td>
                        <span className="price">280</span>
                      </td>
                    </tr>
                    <tr>
                      <td>{t('shippingFee')}</td>
                      <td>
                        <span className="price">10.00</span>
                      </td>
                    </tr>
                    <tr>
                      <td>{t('vat')}</td>
                      <td>0.00 AMD</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>{t('orderTotal')}</strong>
                      </td>
                      <td>
                        <b className="price">290</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Link
                  href="checkout"
                  className="theme-btn style-two mt-25 w-100"
                >
                  {t('proceedToCheckout')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </WellFoodLayout>
  );
};
export default page;
