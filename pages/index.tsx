import Head from "next/head";
import favicon from "../public/imperial.svg";
import { GetServerSideProps } from "next";

function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Imperial DB</title>
        <link rel="icon" type="image/svg+xml" href={favicon.src} />
      </Head>
    </>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const targetURL = "/search=&page=1";
  if (res) {
    res.writeHead(307, { Location: targetURL });
    res.end();
  }

  return {
    props: {},
  };
};
