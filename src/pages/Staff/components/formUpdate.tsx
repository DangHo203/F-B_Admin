export default function FormUpdate() {
    return (
        <div className="fixed inset-0 w-full h-full bg-gray-200 bg-opacity-50  flex justify-center items-center z-40">
            <div className="!opacity-100 flex flex-col justify-start items-center w-auto h-auto bg-white p-5 rounded-lg z-50">
                <span className="text-[20px] font-bold self-center">Edit</span>

                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-[300px] h-[40px] rounded-md border border-gray-300 mt-5 px-2"
                />
                <input
                    type="text"
                    placeholder="Email"
                    className="w-[300px] h-[40px] rounded-md border border-gray-300 mt-5 px-2"
                />
                <input
                    type="text"
                    placeholder="Phone"
                    className="w-[300px] h-[40px] rounded-md border border-gray-300 mt-5 px-2"
                />
                <input
                    type="text"
                    placeholder="Role"
                    className="w-[300px] h-[40px] rounded-md border border-gray-300 mt-5 px-2"
                />
                <input
                    type="text"
                    placeholder="Status"
                    className="w-[300px] h-[40px] rounded-md border border-gray-300 mt-5 px-2"
                />
            </div>
        </div>
    );
}
