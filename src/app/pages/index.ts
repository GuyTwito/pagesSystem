import { ReactInVue } from "vuera";
import lowercaseKeys from "lowercase-keys";

const ReactComponents = {
  helloReact: ReactInVue(require("./react_pages/HelloReact").default),
  helloVue: require("./vue_pages/HelloVue").default,
  notFound: require("./vue_pages/NotFound").default,
};

export const AdditionalAttributes = {
  helloReact: {},
};

export default lowercaseKeys(ReactComponents);
