import React from "react";

export const DataContext = React.createContext({
  blogDataTransporter: () => {},
});

const DataContextProvider = (props) => {
  const blogDataTransporter = (data) => {
    localStorage.setItem("blogId", data);
  };

  const store = {
    blogDataTransporter,
  };

  return (
    <DataContext.Provider value={store}>{props.children}</DataContext.Provider>
  );
};

export default DataContextProvider;
