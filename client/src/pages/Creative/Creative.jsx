import { React, useEffect, useState } from "react";
import "./Creative.scss";
import apiData from "../../data/apiData";
import CreativeCard from "../../components/CreativeCard/CreativeCard";
import SearchBar from "../../components/SearchBar/SearchBar";

function Creative() {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creativeData, setCreativeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiData.get("/creatives");
        const creatives = response.data;
        setCreativeData(creatives);
        setFilteredData(creatives);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (keyword) => {
    const filtered = creativeData.filter((item) => {
      return (
        item.title.toLowerCase().includes(keyword.toLowerCase()) ||
        item.bio.toLowerCase().includes(keyword.toLowerCase()) ||
        item.labels.some((label) => label.includes(keyword.toLowerCase()))
      );
    });

    setFilteredData(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="creative">
      <SearchBar filteredData={filteredData} onSearch={handleSearch} />
      <CreativeCard filteredData={filteredData} />
    </div>
  );
}

export default Creative;
