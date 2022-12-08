import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg" />
      </Head>
      <title>Woli</title>

      <body className="">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
