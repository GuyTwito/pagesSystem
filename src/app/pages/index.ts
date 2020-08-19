import { ReactInVue } from "vuera";
import lowercaseKeys from "lowercase-keys";

const ReactComponents = {
  Home: require("./vue_pages/Home").default,
  helloReact: ReactInVue(require("./react_pages/HelloReact").default),
  helloVue: require("./vue_pages/HelloVue").default,
  notFound: require("./vue_pages/NotFound").default,
};

export const AdditionalAttributes = lowercaseKeys({
  helloReact: {
    name: "Hello React"
  },
  notFound: {
    hide: true 
  }
  

});

export default lowercaseKeys(ReactComponents);
