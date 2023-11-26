import { GetServerSideProps } from "next";

function Home(): JSX.Element {
  return (
    <>
      <h1>Loading...</h1>
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
