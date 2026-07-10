import { IoChevronDown  } from "react-icons/io5";

function Select({ options = [], register, className = "", ...props }) {
  return (
    <div className="relative group w-full md:w-auto">
      {/* Select Element */}
      <select
        className={`
          appearance-none w-full md:min-w-45
          bg-card 
          border border-border 
          text-text 
          rounded-xl 
          pl-4 pr-10 py-2.5 
          shadow-shadow-soft 
          transition-all duration-200 ease-out
          hover:border-border-strong hover:shadow-md
          focus:outline-none focus:ring-4 focus:ring-[rgba(63,39,199,0.12)] focus:border-primary/50
          cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        {...register}
        {...props}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value} className="py-2">
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom Icon */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-primary transition-colors duration-200">
        <IoChevronDown />
      </div>
    </div>
  );
}

export default Select;