import "@css/aos.css";
import "@css/bootstrap.min.css";
import "@css/flaticon.min.css";
import "@css/fontawesome-5.14.0.min.css";
import "@css/magnific-popup.min.css";
import "@css/nice-select.min.css";
import "@css/slick.min.css";
import "@css/style.css";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { LocaleProvider } from "@/contexts/LocaleContext";
import I18nProvider from "@/providers/I18nProvider";
import AgeVerificationModal from "@/components/AgeVerificationModal";
import amMessages from "@/messages/am.json";

export const metadata = {
  title: "Blend",
  description:
    "Blend — premium hookah products, accessories, and flavors in one place",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>
            <CartProvider>
              <LocaleProvider>
                <I18nProvider initialMessages={amMessages}>
                  <AgeVerificationModal />
                  {children}
                </I18nProvider>
              </LocaleProvider>
            </CartProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
