interface DriverProps {
    setIsOpenShowSelectDriver: (value: boolean) => void;
    handleSelectDriver: (driver: any) => void;
}
const Driver: React.FC<DriverProps> = ({
    setIsOpenShowSelectDriver,
    handleSelectDriver
}) => {
    const drivers = [
        { id: 1, name: "Driver 1" },
        { id: 2, name: "Driver 2" },
        { id: 3, name: "Driver 3" },
    ];

    return (
        <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Select a Driver</h2>
                        <ul>
                            {drivers.map((driver) => (
                                <li key={driver.id} className="mb-2">
                                    <button
                                        className="w-full text-left px-4 py-2 border rounded hover:bg-gray-100"
                                        onClick={() => handleSelectDriver(driver)}
                                    >
                                        {driver.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => setIsOpenShowSelectDriver(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
    )
}
export default Driver;