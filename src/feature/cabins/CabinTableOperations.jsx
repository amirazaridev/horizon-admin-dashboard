import { useTranslation } from "react-i18next";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2 md:flex-row md:gap-x-3 lg:gap-x-7">
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: t("cabins.title") },
          { value: "no-discount", label: t("cabins.noDiscount") },
          { value: "with-discount", label: t("cabins.withDiscount") },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: t("cabins.sortByName") },
          { value: "name-desc", label: t("cabins.sortByName") },
          { value: "regularPrice-asc", label: t("bookings.sortByAmountLow") },
          { value: "regularPrice-desc", label: t("bookings.sortByAmountHigh") },
          { value: "maxCapacity-asc", label: t("cabins.sortByCapacityLow") },
          { value: "maxCapacity-desc", label: t("cabins.sortByCapacityHigh") },
        ]}
      />
    </div>
  );
}

export default CabinTableOperations;
