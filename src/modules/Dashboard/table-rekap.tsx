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

export default function DashboardTable() {
  const [search, setSearch] = React.useState<string>("");

  const router = useRouter();

  const { getMK, mk } = useAppStore();
  ///-----Start Region get Matakuliah-----///

  React.useEffect(() => {
    getMK();
  }, []);

  const formFilter: MK["rows"] = mk?.rows?.filter(
    (item) =>
      item?.ID_MK.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      item?.NAME_MK.toLocaleLowerCase().includes(search.toLocaleLowerCase())
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
      <Typography variant="h2">Mata Kuliah Aktif</Typography>
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
        <button
          className="px-5 py-2 bg-primary-500 rounded-md shadow-sm -translate-y-2"
          onClick={() => router.push("/dashboard")}
        >
          <AiOutlinePlus className="text-white" />
        </button>
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
                  Kode
                </Typography>
              </th>
              <th>
                <Typography variant="p" color="black">
                  Nama
                </Typography>
              </th>
              <th>
                <Typography variant="p" color="black">
                  SKS
                </Typography>
              </th>
              <th>
                <Typography variant="p" color="black">
                  Aksi
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((item, index) => {
              return (
                <tr key={index} className="text-center">
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{item?.ID_MK}</td>
                  <td>{item?.NAME_MK}</td>
                  <td>{item?.SKS}</td>
                  <td>
                    <EditButton id={item?.ID_MK} />
                  </td>
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
