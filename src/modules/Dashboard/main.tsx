import * as React from "react";

import Typography from "@/components/core/typography";
import { useAppStore } from "@/lib/store";

import { SlCalender } from "react-icons/sl";
import { GiPaperBagOpen } from "react-icons/gi";
import { GoNumber } from "react-icons/go";

export default function Dashboardmain() {
  const { mk, getMK } = useAppStore();

  React.useEffect(() => {
    getMK();
  }, [mk]);

  const jumlahMK = mk?.rows.length;
  const date = new Date();
  const totalNumber = mk?.rows?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.SKS;
  }, 0);
  return (
    <main className="bg-tertiary-100 px-3 py-4 rounded-md shadow-sm">
      <section className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
        <div className="flex items-center gap-2">
          <SlCalender className="text-2xl" />
          <div className="translate-y-2">
            <Typography variant="small" color="black">
              Hari ini tanggal
            </Typography>
            <Typography variant="h4" color="black">
              {date.toLocaleDateString()}
            </Typography>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <GiPaperBagOpen className="text-2xl" />
          <div className="translate-y-2">
            <Typography variant="small" color="black">
              Jumlah Matakuliah
            </Typography>
            <Typography variant="h4" color="black">
              {jumlahMK}
            </Typography>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <GoNumber className="text-2xl" />
          <div className="translate-y-2">
            <Typography variant="small" color="black">
              Jumlah SKS
            </Typography>
            <Typography variant="h4" color="black">
              {totalNumber}
            </Typography>
          </div>
        </div>
      </section>
    </main>
  );
}

const sidebarItems = [
  {
    id: 1,
    h1: "03Oktober2023",
    p: "tanggal",
    icon: SlCalender,
  },
  {
    id: 2,
    h1: "03Oktober2023",
    p: "tanggal",
    icon: SlCalender,
  },
  {
    id: 3,
    h1: "03Oktober2023",
    p: "tanggal",
    icon: SlCalender,
  },
];
