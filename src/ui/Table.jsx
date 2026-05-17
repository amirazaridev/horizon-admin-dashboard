import { createContext, useContext } from "react";

const TableContext = createContext();
function Table({ children, columns }) {
  return (
    <TableContext value={columns}>
      <section
        role="table"
        className="bg-primary mx-auto my-4 rounded-sm text-xs shadow-sm sm:text-base"
      >
        {children}
      </section>
    </TableContext>
  );
}
function Header({ children }) {
  const columns = useContext(TableContext);

  return (
    <header
      className="bg-secondary grid p-3 text-[10px] font-semibold uppercase md:text-base"
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </header>
  );
}
function Row({ children }) {
  const columns = useContext(TableContext);
  return (
    <div
      className="bg-primary grid items-center border border-gray-200/30 p-1"
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </div>
  );
}
function Body({ data, render }) {
  return <section>{data.map(render)}</section>;
}
function Footer({ children }) {
  return <div>{children}</div>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;
export default Table;
