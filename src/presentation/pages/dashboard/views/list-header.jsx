const ListHeader = () => {
    return (
        <div className="flex justify-between items-center p-4  border-b border-gray-300">
            <button className="px-4 py-2 bg-neutro-tertiary text-white rounded-md hover:bg-neutro-primary">
                Agregar
            </button>
            <input
                type="text"
                placeholder="Buscar..."
                className="px-4 py-2 border border-gray-300 rounded-md w-64"
            />
        </div>
    );
}

export default ListHeader;