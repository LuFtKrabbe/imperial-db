import { useRouter } from "next/router";
import Pagination from "../../src/components/pagination/Pagination";
import { wrapper } from "../../src/app/store";
import {
  getPlanetList,
  getRunningQueriesThunk,
  useGetPlanetListQuery,
} from "../../src/services/planet";
import { skipToken } from "@reduxjs/toolkit/query";
import CardList from "../../src/components/cardList/CardList";

function Page({}) {
  const { query } = useRouter();

  const { data } = useGetPlanetListQuery(
    typeof query.page === "string" ? `?page=${query.page}` : skipToken,
  );

  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Pagination />
      <CardList planetList={data.results} />
    </>
  );
}

export default Page;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const page = context.params?.page;
    console.log("Page", page);

    if (typeof page === "string") {
      store.dispatch(getPlanetList.initiate(`?page=${page}`));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  },
);
