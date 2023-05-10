import React from "react";

import { Provider } from "react-redux";

import Agoa from "src/containers/app/agoaContainer";

import store from "src/store";

import "src/App.css";
import "src/styles/FontStyle.css";

function App() {
  return (
    <Provider store={store}>
      <Agoa />
    </Provider>
  );
}

export default App;
