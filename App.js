import React from "react";
import { Provider } from "react-redux";
import Main from "./src/components/Main";
import { store } from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
