import { useState } from "react";
import Layout from "../../components/layouts/Layout";
import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import { Link } from "react-router-dom";
import CourseTable from "../../components/tables/CourseTable";

const Course = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [name, setName] = useState("");
  const [programType, setProgramType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [searchName, setSearchName] = useState("");
  const [searchProgramType, setSearchProgramType] = useState("");
  const [searchFromDate, setSearchFromDate] = useState("");
  const [searchToDate, setSearchToDate] = useState("");

  const handleSearch = () => {
    setSearchName(name);
    setSearchProgramType(programType);
    setSearchFromDate(fromDate);
    setSearchToDate(toDate);
  };

  return (
    <Layout>
      <div className="card card-bordered w-full bg-base-100 mb-6">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <Breadcrumb
              items={[{ label: "Home", path: "/" }, { label: "Courses" }]}
            />
            <button
              className="btn btn-ghost btn-sm rounded-lg"
              onClick={() => setShowSearch(!showSearch)}
            >
              {showSearch ? "Hide Search" : "Show Search"}
            </button>
          </div>

          {showSearch && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Search by name"
                  className="input input-bordered w-full rounded-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <select
                  className="select select-bordered w-full rounded-lg"
                  value={programType}
                  onChange={(e) => setProgramType(e.target.value)}
                >
                  <option value="">All Program Types</option>
                  <option value="ART_DESIGN">Art & Design</option>
                  <option value="TECHNOLOGY">Technology</option>
                  <option value="CHILDRENS_CREATIVE">
                    Children's Creative
                  </option>
                </select>

                <input
                  type="date"
                  className="input input-bordered w-full rounded-lg"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />

                <input
                  type="date"
                  className="input input-bordered w-full rounded-lg"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <button
                  className="btn btn-primary w-full md:w-auto rounded-lg"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="card card-bordered w-full bg-base-100">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold my-4">Course List</h3>
            <Link to="/courses/create" className="btn btn-primary rounded-lg">
              Create Course
            </Link>
          </div>
          <CourseTable
            name={searchName}
            programType={searchProgramType}
            fromDate={searchFromDate}
            toDate={searchToDate}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Course;
