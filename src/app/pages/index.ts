import { ReactInVue } from "vuera";
import lowercaseKeys from "lowercase-keys";

const ReactComponents = {
  Home: require("./vue_pages/Home").default,
  helloReact: ReactInVue(require("./react_pages/HelloReact").default),
  helloVue: require("./vue_pages/HelloVue").default,
  notFound: require("./vue_pages/NotFound").default,
};

const AdditionalAttributes = lowercaseKeys({
  Home: {
    name: "Home",
    isHome: true,
  },
  helloReact: {
    name: "Hello React",
  },
  notFound: {
    hidden: true,
  },
});

// make sure there is only one page defined "isHome" (the last one defined determines)
let homePage = "";
Object.keys(AdditionalAttributes).forEach((key) => {
  const attr = AdditionalAttributes[key];
  if (attr.isHome) homePage = key;
});

export { AdditionalAttributes, homePage };

export default lowercaseKeys(ReactComponents);
