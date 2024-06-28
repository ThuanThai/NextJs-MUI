import * as React from "react";
import ThemeRegistry from "@/components/theme-registry/theme.registry";
import AppBarHeader from "@/components/header/app.header";
import AppFooter from "@/components/footer/app.footer";
import NextAuthWrapper from "@/lib/next.auth.wrapper";
import { Poppins } from "next/font/google";
import "@/styles/style.scss";

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={poppins.variable}>
            <body>
                <ThemeRegistry>
                    <NextAuthWrapper>
                        <AppBarHeader></AppBarHeader>
                        {children}
                        <AppFooter></AppFooter>
                    </NextAuthWrapper>
                </ThemeRegistry>
            </body>
        </html>
    );
}
