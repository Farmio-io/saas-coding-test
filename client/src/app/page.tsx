"use client";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import styles from "./page.module.css";

// TODO: mocks
const dummyData = {
  labels: [
    "1 week ago", 
    "now",
  ],
  datasets: [
    {
      label: "previous price",
      data: [9.50, 95.00], 
      fill: false,
      borderColor: "rgba(255, 99, 132, 1)", 
      tension: 0.1,
    },
    {
      label: "updated price",
      data: [10.20, 102.10], 
      fill: false,
      borderColor: "rgba(75, 192, 192, 1)",
      tension: 0.1,
    },
  ],
};

// TODO: get data from repo and map to chart
// add some kind of form also to put names and fetch 
const Home: React.FC = () => {
  return (
    <div>
      <div className={styles.chart}>
        <Line data={dummyData} />
      </div>
      <p className={styles.footer}>padulkemid farmio saas-test</p>
    </div>
  );
};

export default Home;

