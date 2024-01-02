import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import { ConfigProvider } from "antd";
import { Montserrat } from "next/font/google";

export const metadata: Metadata = {
  title: "RNAtango",
  description: "RNA 3d structure analysis in Torsion ANGle dOmain",
};

const openSans = Montserrat({
  style: "normal",
  weight: "300",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className}>
      <body>
        <script>0</script>
        <Header />
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#ED6A5A",
              borderRadius: 16,
            },
            components: {
              Button: {
                textHoverBg: "#f9f9f9",
              },
              Upload: {
                lineWidth: 0,
              },
              Table: {
                borderRadius: 24,
                footerBg: "#ED6A5A",
              },
            },
          }}
        >
          <main>{children}</main>
        </ConfigProvider>
        <Footer />
      </body>
    </html>
  );
}
