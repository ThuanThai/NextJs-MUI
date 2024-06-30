import * as React from 'react';
import AppBarHeader from '@/components/header/app.header';
import AppFooter from '@/components/footer/app.footer';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AppBarHeader></AppBarHeader>
            {children}
            <AppFooter></AppFooter>
        </>
    );
}
