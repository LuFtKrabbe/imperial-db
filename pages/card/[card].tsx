import { useRouter } from "next/router";
import { RootState, wrapper } from "../../src/app/store";
import {
  getPlanetById,
  getRunningQueriesThunk,
  useGetPlanetByIdQuery,
} from "../../src/services/planet";
import { skipToken } from "@reduxjs/toolkit/query";
import DetailedCard from "../../src/components/detailedCard/DetailedCard";
import CardList from "../../src/components/cardList/CardList";
import { useAppSelector } from "../../src/app/hooks";

function Card({}) {
  const { query } = useRouter();
  const itemsList = useAppSelector(
    (state: RootState) => state.pagination.itemsList,
  );

  const { data } = useGetPlanetByIdQuery(
    typeof query.card === "string" ? `${query.card}` : skipToken,
  );

  if (!data || !itemsList) {
    return <div>Loading</div>;
  }

  return (
    <>
      <CardList planetList={itemsList} />
      <DetailedCard planet={data} />
    </>
  );
}

export default Card;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const card = context.params?.card;
    console.log("cardID", card);

    if (typeof card === "string") {
      store.dispatch(getPlanetById.initiate(`${card}`));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  },
);
