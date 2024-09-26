interface FormAddProps {
    setIsAdd: (value: boolean) => void;
}
const FormAdd : React.FC<FormAddProps> = ({
    setIsAdd
}) => {
    return (
        <div className="fixed inset-0 bg-opacity-50 bg-white w-screen h-screen p-[100px] flex justify-center items-baseline">
            <div className="bg-white w-full h-full">
                <div className="w-1/2 h-full p-[100px] flex flex-col justify-center items-center gap-2">
                    <img src="" alt="" className="w-full h-full object-cover"/>
                    <span className="text-blue-500 text-[15px]">Change image</span>
                </div>
                <div className="w-1/2 h-full">
                </div>
            </div>
            <div onClick={()=>setIsAdd(false)} className="text-red-600 text-[50px] absolute top-5 right-10 hover:text-red-200">X</div>
        </div>
    )
}
export default FormAdd