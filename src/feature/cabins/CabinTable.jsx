import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins, error } = useCabins();
  const [searchParam] = useSearchParams();

  if (error) toast.error(error.message);
  if (isLoading) return <Spinner />;
  else if (!cabins) return <Empty resourceName="cabins" />;

  // ? Filtering

  const filterValue = searchParam.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  else if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  else if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // ? Sorting
  const sortByValue = searchParam.get("sortBy") || "name-asc";
  const [field, direction] = sortByValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortByCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier,
  );

  return (
    <Menus>
      <Table columns="0.6fr 1fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div className="text-end">option</div>
        </Table.Header>
        <Table.Body
          data={sortByCabins || []}
          render={(cabin) => (
            <CabinRow key={cabin.id} cabin={cabin} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
