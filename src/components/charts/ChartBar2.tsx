import React from "react";
import Chart from "react-apexcharts";

const BarChart = () => {
    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "bar",
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
                borderRadius: 10,
            },
        },
        colors: ["#1E3A8A", "#38BDF8"], // màu cho các cột
        xaxis: {
            categories: ["M", "T", "W", "T", "F", "S", "S"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            position: "top",
        },
    };

    const series = [
        {
            name: "Sales",
            data: [60, 70, 80, 90, 50, 60, 80],
        },
        {
            name: "Revenue",
            data: [40, 50, 60, 70, 40, 55, 70],
        },
    ];

    return (
        <div className="bg-white p-6 shadow rounded-lg">
            <div className="flex justify-between">
                <h3 className="font-bold">Profit this week</h3>
                <p className="text-sm text-gray-500">This Week</p>
            </div>
            <Chart options={options} series={series} type="bar" height={320} />
        </div>
    );
};

export default BarChart;
