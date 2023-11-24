"use client";

import { store } from "../src/app/store";
import { Provider } from "react-redux";
import dynamic from "next/dynamic";

const App = dynamic(() => import("../src/App"), { ssr: false });

export default function Page() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
