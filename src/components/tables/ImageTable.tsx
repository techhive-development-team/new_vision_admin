import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetImage } from "../../hooks/useGetImage";
import { API_URLS, baseUrl } from "../../enum/urls";
import { imageRepository } from "../../repositories/imageRepository";

type Image = {
  id: string;
  mainText: string;
  subText: string;
  imageType: {
    id: string;
    typeName: string;
  };
  link: string;
  bg_img: string;
  createdAt: string;
};

const PAGE_SIZE = 10;

const ImageTable = () => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;
  const {
    data: images,
    total,
    mutate,
  } = useGetImage({ offset, limit: PAGE_SIZE });
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const totalPages = total ? Math.ceil(total / PAGE_SIZE) : 1;
  const handleDelete = (image: Image) => {
    setSelectedImage(image);
    (document.getElementById("delete_modal") as HTMLDialogElement).showModal();
  };

  const confirmDelete = async () => {
    if (!selectedImage) return;
    try {
      const response = await imageRepository.deleteImage(selectedImage.id);
      if (response?.statusCode === 200) {
        await mutate();
      } else {
        console.error("Delete failed:", response);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setSelectedImage(null);
      (document.getElementById("delete_modal") as HTMLDialogElement).close();
    }
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Main Text</th>
              <th>Sub Text</th>
              <th>Image Type</th>
              <th>Link</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {images && images.length > 0 ? (
              images.map((image: Image, index: number) => (
                <tr key={image.id}>
                  <th>{offset + index + 1}</th>
                  <td>
                    <img
                      className="w-16 h-16 object-cover rounded-md border"
                      src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.IMAGE}/${image.bg_img}`}
                      alt={image.mainText.substring(0, 10)}
                    />
                  </td>
                  <td>
                    {image.mainText?.length > 50
                      ? image.mainText.substring(0, 50) + "..."
                      : image.mainText}
                  </td>
                  <td>
                    {image.subText?.length > 50
                      ? image.subText.substring(0, 50) + "..."
                      : image.subText}
                  </td>
                  <td>{image.imageType.typeName}</td>
                  <td>{image.link}</td>
                  <td>{new Date(image.createdAt).toLocaleString()}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/images/${image.id}/edit`}
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(image)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No images found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="join flex justify-end my-4">
        {[...Array(totalPages)].map((_, idx) => {
          const pageNumber = idx + 1;
          return (
            <input
              key={pageNumber}
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label={String(pageNumber)}
              defaultChecked={page === pageNumber}
              onClick={() => setPage(pageNumber)}
            />
          );
        })}
      </div>

      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Delete</h3>
          <p className="py-4">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{selectedImage?.mainText}</span>?
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn">Cancel</button>
              <button
                type="button"
                onClick={confirmDelete}
                className="btn btn-error"
              >
                Yes, Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ImageTable;
