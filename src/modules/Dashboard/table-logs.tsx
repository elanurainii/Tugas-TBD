import * as React from "react";
import Typography from "@/components/core/typography";
import { useAppStore } from "@/lib/store";
import { MK } from "@/lib/slices/tabelMK-slice";

import { AiOutlineSearch } from "react-icons/ai";
import EditButton from "./edit-button";
import handlePage from "@/constant/pagination";
import Pagination from "./pagination";

import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/router";
import { TableAudit } from "@/lib/slices/audit-slices";

export default function DashboardTableLogs() {
  const [search, setSearch] = React.useState<string>("");

  const router = useRouter();

  const { getTableAudit, tableAudit } = useAppStore();

  React.useEffect(() => {
    getTableAudit();
  }, []);

  console.log(tableAudit);
  ///-----Start Region get Matakuliah-----///

  React.useEffect(() => {
    getTableAudit();
  }, []);

  const formFilter: TableAudit["rows"] = tableAudit?.rows?.filter(
    (item) =>
      item?.ID_MK.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      item?.NAME_NEW.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  const {
    indexOfFirstItem,
    setCurrentPage,
    indexOfLastItem,
    itemPerPage,
    currentPage,
  } = handlePage();
  const currentItems = formFilter?.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  ///-----End Region get Matakuliah-----///
  return (
    <main className="mt-2">
      <section className="flex justify-between items-center">
        <div className="flex items-center mb-3">
          <input
            value={search}
            placeholder="Enter a Keyword"
            onChange={(e) => setSearch(e.target.value)}
            className="p-1 rounded-md text-sm"
          />
          <AiOutlineSearch className="text-xl -translate-x-6 text-gray-500 opacity-50" />
        </div>
      </section>

      <section className="bg-tertiary-100 p-3 rounded-md shadow-md   overflow-auto">
        <table className="table-auto w-full  border-seperate border-spacing-y-3">
          <thead>
            <tr className="pb-1 border-b-2 border-primary-500">
              <th>
                <Typography variant="p" color="black">
                  No
                </Typography>
              </th>
              <th>
                <Typography variant="p" color="black">
                  Id
                </Typography>
              </th>
              <th>
                <Typography variant="p" color="black">
                  Kode
                </Typography>
              </th>
              <th>
                <Typography variant="p" color="black">
                  SKS Baru
                </Typography>
              </th>
              <th>
                <Typography variant="p" color="black">
                  SKS Lama
                </Typography>
              </th>
              <th>
                <Typography variant="p" color="black">
                  Nama Baru
                </Typography>
              </th>
              <th>
                <Typography variant="p" color="black">
                  Nama Lama
                </Typography>
              </th>
              <th>
                <Typography variant="p" color="black">
                  Tanggal
                </Typography>
              </th>
              <th>
                <Typography variant="p" color="black">
                  User
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((item, index) => {
              return (
                <tr key={item?.ID_MK} className="text-center">
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{index + 1}</td>
                  <td>{item?.ID_MK}</td>
                  <td>2</td>
                  <td>{item?.SKS_OLD ? item?.SKS_OLD : "N/A"}</td>
                  <td>{item?.NAME_NEW}</td>
                  <td>{item?.NAME_OLD ? item?.NAME_OLD : "N/A"}</td>
                  <td>{item?.DATE.substring(0, 10)}</td>
                  <td>{item?.USER.substring(0, 6)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {formFilter?.length > itemPerPage && (
          <Pagination
            itemPerPage={itemPerPage}
            totalItems={formFilter.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
      </section>
    </main>
  );
}
