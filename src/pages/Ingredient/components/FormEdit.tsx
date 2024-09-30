
interface FormEditProps {
    isOpen: (value: boolean) => void;
}
const FormEdit:React.FC<FormEditProps> = ({
    isOpen
}) => {
    return (
        <div className="fixed inset-0 bg-opacity-50 bg-white w-screen h-screen p-[100px] flex justify-center items-baseline">
            <div className="bg-white w-full h-full">
                helo
            </div>
            <div onClick={()=>isOpen(false)} className="text-red-600 text-[50px] absolute top-5 right-10 hover:text-red-200">X</div>
        </div>
    )
}

export default FormEdit