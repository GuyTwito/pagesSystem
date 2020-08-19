import { ReactInVue } from "vuera";
import lowercaseKeys from "lowercase-keys";

const ReactComponents = {
  helloReact: ReactInVue(require("./HelloReact").default),
  helloVue: require("./HelloVue").default,
  notFound: require("./NotFound").default,
};

export const AdditionalAttributes = {
  helloReact: {},
};

export default lowercaseKeys(ReactComponents);
