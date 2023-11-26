import { useRouter } from "next/router";
import { wrapper } from "../../src/app/store";
import {
  getPlanetList,
  getRunningQueriesThunk,
  useGetPlanetListQuery,
} from "../../src/services/planet";
import { skipToken } from "@reduxjs/toolkit/query";
import CardList from "../../src/components/cardList/CardList";
import { setItemsQuantity } from "../../src/components/pagination/paginationSlice";
import { useAppDispatch } from "../../src/app/hooks";

function Page({}) {
  const dispatch = useAppDispatch();
  const { query } = useRouter();
  console.log(query.page);

  const { data } = useGetPlanetListQuery(
    typeof query.page === "string" ? `?${query.page}` : skipToken,
  );

  if (!data) {
    return <div>Loading</div>;
  }

  dispatch(setItemsQuantity(data.count));

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
