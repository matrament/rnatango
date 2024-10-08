import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ConfigProvider } from "antd";
import { Montserrat } from "next/font/google";
import { Roboto_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "RNAtango",
  description: "RNA 3d structure analysis in Torsion ANGle dOmain",
};
const openSans = Montserrat({
  style: "normal",
  weight: "400",
  subsets: ["latin"],
});

const openSansBold = Montserrat({
  style: "normal",
  weight: "500",
  subsets: ["latin"],
});

const monoSpace = Roboto_Mono({
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
      <header>
        <script
          defer
          data-domain="rnatango.cs.put.poznan.pl"
          src="https://plausible.cs.put.poznan.pl/js/plausible.js"
        ></script>
      </header>
      {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#fb5f4c",
              borderRadius: 16,
              fontFamily: openSans.style.fontFamily,
              paddingLG: 30,
              marginLG: 20,
            },
            components: {
              Button: {
                textHoverBg: "#f9f9f9",
                fontFamily: openSansBold.style.fontFamily,
                contentFontSize: 16,
                defaultBg: "rgba(0,0,0,0)",
                borderRadiusSM: 12,
                defaultBorderColor: "black",
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
                borderRadiusLG: 30,
                headerBg: "#ffff",
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
              Modal: {
                borderRadiusLG: 30,
              },
              Divider: {
                colorSplit: "#dcdcdc",
                fontFamily: openSansBold.style.fontFamily,
              },
              Grid: {
                fontSize: 16,
              },
              Tag: {
                fontFamily: monoSpace.style.fontFamily,
              },
            },
          }}
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ConfigProvider>
      </body>
    </html>
  );
}
