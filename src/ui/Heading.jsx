function Heading({ as = "h2", children }) {
  if (as === "h2")
    return <h2 className="text-2xl font-semibold sm:text-3xl">{children}</h2>;
}

export default Heading;
