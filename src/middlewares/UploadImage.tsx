import axios from "axios";
interface IUploadImage {
    selectedImage: any;
    setImageUrl: void | any;
}
export default async function handleUpload({
    selectedImage,
    setImageUrl,
}: IUploadImage) {
    if (!selectedImage) {
        alert("Please select an image first.");
        return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "your_upload_preset"); // Thay thế bằng upload preset từ Cloudinary
    formData.append("cloud_name", "dytan1asl"); // Thay thế bằng cloud name của bạn

    try {
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dytan1asl/image/upload", // API endpoint của Cloudinary
            formData
        );

        if (response.data.secure_url) {
            setImageUrl(response.data.secure_url); // URL của ảnh sau khi upload
            alert("Upload thành công!");
        }
    } catch (error) {
        console.error("Upload thất bại:", error);
    }
}
