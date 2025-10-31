import { useState } from "react";
import Layout from "../../components/layouts/Layout";
import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import StudentTable from "../../components/tables/StudentTable";
import { useGetCourse } from "../../hooks/useGetCourse";

const Student = () => {
  const [showSearch, setShowSearch] = useState(true);
  const { data } = useGetCourse();
  const [studentName, setStudentName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [studyAbroad, setStudyAbroad] = useState("");
  const [joinRaffles, setJoinRaffles] = useState("");
  const [status, setStatus] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleReset = () => {
    setStudentName("");
    setTransactionId("");
    setCourseId("");
    setStudyAbroad("");
    setJoinRaffles("");
    setStatus("");
    setFromDate("");
    setToDate("");
  };

  return (
    <Layout>
      <div className="card card-bordered w-full bg-base-100 mb-6">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <Breadcrumb
              items={[{ label: "Home", path: "/" }, { label: "Students" }]}
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
                  placeholder="Student name..."
                  className="input input-bordered w-full rounded-lg"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />

                <select
                  className="select select-bordered w-full rounded-lg"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                >
                  <option value="">Select Course</option>
                  {data?.map((type: { id: string; name: string }) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>

                <select
                  className="select select-bordered w-full rounded-lg"
                  value={studyAbroad}
                  onChange={(e) => setStudyAbroad(e.target.value)}
                >
                  <option value="">Study Abroad (All)</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>

                <select
                  className="select select-bordered w-full rounded-lg"
                  value={joinRaffles}
                  onChange={(e) => setJoinRaffles(e.target.value)}
                >
                  <option value="">Join Raffles (All)</option>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                  <option value="MAYBE">Maybe</option>
                </select>

                <input
                  type="text"
                  placeholder="Transaction ID..."
                  className="input input-bordered w-full rounded-lg"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />

                <select
                  className="select select-bordered w-full rounded-lg"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Payment Status (All)</option>
                  <option value="NONE">None</option>
                  <option value="PENDING">Pending</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="FAILED">Failed</option>
                </select>

                <select
                  className="select select-bordered w-full rounded-lg"
                  value={paymentOption}
                  onChange={(e) => setPaymentOption(e.target.value)}
                >
                  <option value="">Payment Options</option>
                  <option value="FULL_PAYMENT">Full Payment</option>
                  <option value="HALF_PAYMENT">Half Payment (50%)</option>
                </select>

                <input
                  type="date"
                  placeholder="From date..."
                  className="input input-bordered w-full rounded-lg"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />

                <input
                  type="date"
                  placeholder="To date..."
                  className="input input-bordered w-full rounded-lg"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-2">
                <button
                  className="btn btn-ghost w-full md:w-auto rounded-lg"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card card-bordered w-full bg-base-100">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold my-4">Student List</h3>
          </div>
          <StudentTable
            studentName={studentName}
            courseId={courseId}
            studyAbroad={studyAbroad}
            joinRaffles={joinRaffles}
            studentTransactionId={transactionId}
            status={status}
            paymentOption={paymentOption}
            fromDate={fromDate}
            toDate={toDate}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Student;
