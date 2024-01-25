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

const openSansBold = Montserrat({
  style: "normal",
  weight: "500",
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
              fontFamily: openSans.style.fontFamily,
            },
            components: {
              Button: {
                textHoverBg: "#f9f9f9",
                fontFamily: openSansBold.style.fontFamily,
                contentFontSize: 16,
              },
              Upload: {
                lineWidth: 0,
              },
              Table: {
                headerBorderRadius: 0,
                fontFamily: openSansBold.style.fontFamily,
                rowSelectedBg: "white",
                rowSelectedHoverBg: "#f9f9f9",
                rowHoverBg: "#fff4f0",
              },
              Collapse: {
                contentPadding: "0px 0px",
                fontFamily: openSansBold.style.fontFamily,
                colorBorder: "#dcdcdc",
              },
              Input: {
                fontFamily: openSansBold.style.fontFamily,
              },
              InputNumber: {
                fontFamily: openSansBold.style.fontFamily,
              },
              Select: {
                fontFamily: openSansBold.style.fontFamily,
                // optionFontSize: 16,
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
