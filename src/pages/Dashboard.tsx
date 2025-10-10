import React, { useState } from "react";
import Layout from "../components/layouts/Layout";
import Breadcrumb from "../components/layouts/common/Breadcrumb";
import StudentGrowthChart from "../components/charts/StudentGrowthChart";
import ProgramsOverviewChart from "../components/charts/ProgramsOverviewChart";

const Dashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("All");

  const years = ["2023", "2024", "2025"];
  const months = [
    "All","January","February","March","April","May","June","July","August","September","October","November","December"
  ];

  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full bg-base-100">
          <div className="card-body">
            <Breadcrumb items={[{ label: "Home", path: "/" }]} />
            <h3 className="text-2xl font-bold my-4">Dashboard</h3>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div>
                <label className="block font-medium mb-1">Select Year</label>
                <select
                  className="select select-bordered"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {years.map((y) => <option key={y}>{y}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Select Month</label>
                <select
                  className="select select-bordered"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  {months.map((m) => <option key={m}>{m}</option>)}
                </select>
                <p className="text-xs text-gray-500 mt-1">(Applies only to Programs Overview)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg bg-white shadow-sm">
                <h4 className="text-lg font-semibold mb-2">Student Growth (Yearly)</h4>
                <StudentGrowthChart year={selectedYear} />
              </div>

              <div className="p-4 border rounded-lg bg-white shadow-sm">
                <h4 className="text-lg font-semibold mb-2">
                  Programs Overview ({selectedMonth === "All" ? "Yearly" : selectedMonth})
                </h4>
                <ProgramsOverviewChart year={selectedYear} month={selectedMonth} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
