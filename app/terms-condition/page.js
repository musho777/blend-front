"use client";
import { useTranslations } from 'next-intl';
import PageBanner from "@/components/PageBanner";
import WellFoodLayout from "@/layout/WellFoodLayout";

const TermsConditionPage = () => {
  const t = useTranslations('termsCondition');

  return (
    <WellFoodLayout>
      <PageBanner pageTitle={t('pageTitle')} pageName={t('pageTitle')} />

      <section className="terms-condition-area py-130 rpy-100 rel z-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="terms-condition-content">
                <p className="text-muted mb-30">{t('lastUpdated')}</p>

                <div className="mb-40">
                  <p>{t('introduction')}</p>
                </div>

                <div className="mb-40">
                  <h3 className="mb-20">{t('section1Title')}</h3>
                  <p>{t('section1Content')}</p>
                </div>

                <div className="mb-40">
                  <h3 className="mb-20">{t('section2Title')}</h3>
                  <p>{t('section2Content')}</p>
                </div>

                <div className="mb-40">
                  <h3 className="mb-20">{t('section3Title')}</h3>
                  <p>{t('section3Content')}</p>
                </div>

                <div className="mb-40">
                  <h3 className="mb-20">{t('section4Title')}</h3>
                  <p>{t('section4Content')}</p>
                </div>

                <div className="mb-40">
                  <h3 className="mb-20">{t('section5Title')}</h3>
                  <p>{t('section5Content')}</p>
                </div>

                <div className="mb-40">
                  <h3 className="mb-20">{t('section6Title')}</h3>
                  <p>{t('section6Content')}</p>
                </div>

                <div className="mb-40">
                  <h3 className="mb-20">{t('section7Title')}</h3>
                  <p>{t('section7Content')}</p>
                </div>

                <div className="mb-40">
                  <h3 className="mb-20">{t('section8Title')}</h3>
                  <p>{t('section8Content')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </WellFoodLayout>
  );
};

export default TermsConditionPage;
