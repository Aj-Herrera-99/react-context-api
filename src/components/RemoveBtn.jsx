function RemoveBtn({ onClick }) {
    return (
        <div
            onClick={onClick}
            className="absolute top-0 p-2 text-4xl font-semibold text-red-500 transition-all scale-75 cursor-pointer right-2 hover:scale-110"
        >
            x
        </div>
    );
}

export default RemoveBtn;
