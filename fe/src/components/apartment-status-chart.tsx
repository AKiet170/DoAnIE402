"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  rented: number;
  total: number;
}

export function DonutChart({ rented, total }: DonutChartProps) {
  const percentage = total > 0 ? ((rented / total) * 100).toFixed(1) : 0;

  const data = {
    labels: ["Đã thuê", "Chưa thuê"],
    datasets: [
      {
        data: [rented, total - rented],
        backgroundColor: [
          "rgba(34, 197, 94, 0.7)", // Xanh lá
          "rgba(239, 68, 68, 0.7)", // Đỏ
        ],
        borderColor: ["rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          font: {
            size: 14,
            weight: 500,
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        callbacks: {
          label: (context: any) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value} phòng (${((value / total) * 100).toFixed(1)}%)`;
          },
        },
      },
    },
    cutout: "70%",
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center text-foreground">
          Thống kê trạng thái căn hộ
        </CardTitle>
      </CardHeader>
      <CardContent className="relative flex justify-center items-center p-6">
        <div className="w-[220px] h-[220px]">
          <Doughnut data={data} options={options} />
        </div>
        <div className="absolute text-center">
          <p className="text-2xl font-bold text-foreground">{percentage}%</p>
          <p className="text-xs text-muted-foreground">Đã thuê</p>
        </div>
      </CardContent>
    </Card>
  );
}
