import { React, useEffect, useState } from "react";
import apiData from "../../data/apiData";
import JobCard from "../../components/JobCard/JobCard";
import SearchBar from "../../components/SearchBar/SearchBar";

function Jobs() {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiData.get("/jobs");
        const jobs = response.data;
        setJobData(jobs);
        setFilteredData(jobs)
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  const handleSearch = (keyword) => {
    const filtered = jobData.filter((item) => {
      return (
        item.employer_name.toLowerCase().includes(keyword.toLowerCase()) ||
        item.job_title.toLowerCase().includes(keyword.toLowerCase()) ||
        item.job_description.toLowerCase().includes(keyword.toLowerCase()) ||
        item.rate.toLowerCase().includes(keyword.toLowerCase()) ||
        item.job_type.toLowerCase().includes(keyword.toLowerCase()) ||
        item.labels.some((label) => label.includes(keyword.toLowerCase()))
      );
    });
  
    setFilteredData(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="jobs">
      <SearchBar filteredData={filteredData} onSearch={handleSearch}/>
      <JobCard filteredData={filteredData}/>
    </div>
  );
}

export default Jobs;
