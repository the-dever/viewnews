import React from "react";

export const HelperContext = React.createContext({
  scrollToSection: (section, topPoint, leftPoint) => {},
  formatter: (num) => {},
});

const HelperContextProvider = (props) => {
  const scrollToSection = (section, topPoint, leftPoint) => {
    section.scrollTo({ top: topPoint, left: leftPoint, behavior: "smooth" });
  };

  const formatter = (num) => {
    const [num1, num2] = String(num).split(".");
    return `${String(+num1).replace(/(.)(?=(\d{3})+$)/g, "$1,")}.${+num2.slice(
      0,
      2
    )}`;
  };

  const store = {
    scrollToSection,
    formatter,
  };

  return (
    <HelperContext.Provider value={store}>
      {props.children}
    </HelperContext.Provider>
  );
};

export default HelperContextProvider;
