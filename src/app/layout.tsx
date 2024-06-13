import * as React from "react";
import ThemeRegistry from "@/components/theme-registry/theme.registry";
import AppBarHeader from "@/components/header/app.header";
import AppFooter from "@/components/footer/app.footer";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ThemeRegistry>
                    <AppBarHeader></AppBarHeader>
                    {children}
                    <AppFooter></AppFooter>
                </ThemeRegistry>
            </body>
        </html>
    );
}
