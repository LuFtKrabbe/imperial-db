import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imperial DB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  <html lang="en">
    <head>
      <link rel="icon" type="image/svg+xml" href="/imperial.svg" sizes="any" />
    </head>
    <body>
      <div id="root">{children}</div>
    </body>
  </html>;
}
