
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { getEnquireList } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export type Enquire = {
    id?: string,
    name: string,
    toolId?: string,
    createdAt?: string
}

const columns = [
    {
      header: "Enquire Name",
      accessor: "name",
    },
    {
      header: "Id",
      accessor: "id",
    },
    {
      header: "ToolId",
      accessor: "toolId"
    },
    {
      header: "Date",
      accessor: "createdAt"
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  export async function generateStaticParams() {
    const allPosts = await getEnquireList();
  
    return allPosts.map((enq : Enquire) => ({
      id: enq?.id || `ID_${Math.floor(new Date().valueOf() * Math.random())}`,
      toolId: enq?.toolId || `T_${Math.floor(new Date().valueOf() * Math.random())}`,
      createdAt: `2024-10-31`,
      ...enq
    }));
  }

const EnquireListPage = async () => {

  const data = await generateStaticParams();
    
  const renderRow = (item: Enquire) => (
        <tr
          key={item.id}
          className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
          <td className="flex items-center gap-4 p-4">{item.name}</td>
          <td className="hidden md:table-cell">{item.id}</td>
          <td className="hidden md:table-cell">{item.toolId}</td>
          <td className="hidden md:table-cell">{item.createdAt}</td>
          <td>
            <div className="flex items-center gap-2">
            <Link href={{ pathname : `/list/enquires/${item.id}`}}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
            </div>
          </td>
        </tr>
      );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        
        <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Enquire List
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>

        {/* LIST */}
        <Table columns={columns} renderRow={renderRow} data={data} />
        {/* PAGINATION */}
        <Pagination />
        </div>

    )
}

export default EnquireListPage;