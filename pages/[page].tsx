import { useRouter } from "next/router";
import { wrapper } from "../src/app/store";
import {
  getPlanetList,
  getRunningQueriesThunk,
  useGetPlanetListQuery,
} from "../src/services/planet";
import CardList from "../src/components/cardList/CardList";
import {
  setItemsList,
  setItemsQuantity,
} from "../src/components/pagination/paginationSlice";
import { useAppDispatch } from "../src/app/hooks";
import { useEffect } from "react";

function Page({}) {
  const dispatch = useAppDispatch();
  const { query } = useRouter();
  const { data } = useGetPlanetListQuery(`?${query.page}`);

  useEffect(() => {
    if (data) {
      dispatch(setItemsQuantity(data.count));
      dispatch(setItemsList(data.results));
    }
  }, [data, dispatch]);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
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
      store.dispatch(getPlanetList.initiate(`?${page}`));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  },
);
