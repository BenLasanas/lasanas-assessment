import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [territories, setTerritories] = useState([]);

  useEffect(() => {
    const fetchTerritories = async () => {
      try {
        const response = await axios.get(
          "https://netzwelt-devtest.azurewebsites.net/Territories/All"
        );
        setTerritories(response.data.data);
      } catch (error) {
        console.error("Error", error.message);
      }
    };

    fetchTerritories();
  }, []);

  const constructTree = (territories, parentId = null) => {
    const tree = [];
    territories.forEach((territory) => {
      if (territory.parent === parentId) {
        const children = constructTree(territories, territory.id);
        if (children.length) {
          territory.children = children;
        }
        tree.push(territory);
      }
    });
    return tree;
  };

  const hierarchicalTree = constructTree(territories);

  const renderTree = (tree) => {
    return (
      <ul>
        {tree.map((territory) => (
          <li key={territory.id}>
            {territory.name}
            {territory.children && renderTree(territory.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Territories:</h2>
      <p>Here are the list of territories:</p>
      {renderTree(hierarchicalTree)}
    </div>
  );
};

export default Home;
