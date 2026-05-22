function Heading({ as = "h2", children }) {
  if (as === "h2")
    return <h2 className="text-2xl font-semibold sm:text-3xl">{children}</h2>;
  if (as === "h3")
    return <h3 className="text-lg font-semibold sm:text-xl">{children}</h3>;
}

export default Heading;
