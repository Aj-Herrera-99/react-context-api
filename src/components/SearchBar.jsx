function SearchBar({ filter, onChange }) {
    return (
        <input
            className=" p-3 my-4 text-black rounded-md bg-slate-200 w-[200px] sm:w-[300px] text-lg sm:text-3xl placeholder:text-slate-600 outline-1 outline"
            placeholder="Search a Pokemon"
            value={filter}
            onChange={onChange}
        />
    );
}

export default SearchBar;
