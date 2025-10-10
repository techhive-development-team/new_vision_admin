import { useParams } from "react-router-dom";
import { useGetHappeningById } from "../../../hooks/useGetHappening";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useFormState } from "../../../hooks/useFormState";
import { happeningRepository } from "../../../repositories/happeningRepository";
import {
  HappeningSchema,
  type HappeningCreateForm,
} from "../HappeningValidationSchema";
import { API_URLS, baseUrl } from "../../../enum/urls";

export interface AlbumImage {
  id: number;
  albumId: number;
  image: string;
  createdAt: string;
}

export const useHappeningEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const { data: happeningData } = useGetHappeningById(id ?? "");

  // Track which existing images should be kept
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // Memoize to prevent unnecessary re-renders
  const defaultAlbumUrls = useMemo(
    () =>
      happeningData?.album?.images?.map(
        (img: AlbumImage) =>
          `${baseUrl}${API_URLS.UPLOAD}${API_URLS.HAPPENING}/${img.image}`
      ) || [],
    [happeningData?.album?.images]
  );

  // Extract just the image filenames for backend
  // const defaultImageNames = useMemo(
  //   () => happeningData?.album?.images?.map((img: AlbumImage) => img.image) || [],
  //   [happeningData?.album?.images]
  // );

  const methods = useForm<HappeningCreateForm>({
    resolver: zodResolver(
      HappeningSchema(!!happeningData?.mainImage, defaultAlbumUrls.length > 0)
    ),
    defaultValues: {
      title: happeningData?.title ?? "",
      description: happeningData?.description ?? "",
      happeningTypeId: happeningData?.happeningTypeId.toString() ?? "",
      mainImage: happeningData?.mainImage,
      album_images: [],
    },
  });

  const { loading, success, message, show, handleSubmit } =
    useFormState<HappeningCreateForm>();

  // Callback to handle existing images changes
  const handleExistingImagesChange = useCallback((images: string[]) => {
    setExistingImages(images);
  }, []);

  const onSubmit = (data: HappeningCreateForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("happeningTypeId", data.happeningTypeId);

    // Fix: Use 'mainImage' instead of 'bg_image'
    if (data.mainImage instanceof File) {
      formData.append("mainImage", data.mainImage);
    }

    // Handle existing album images that should be kept
    existingImages.forEach(imageName => {
      formData.append("existingAlbum[]", imageName);
    });

    // Handle new album images
    if (Array.isArray(data.album_images)) {
      data.album_images.forEach((file) => {
        if (file instanceof File) {
          formData.append("album_images", file);
        }
      });
    }

    handleSubmit(() => happeningRepository.updateHappening(id ?? "", formData));
  };

  // Initialize existing images when data loads
  useEffect(() => {
    if (happeningData?.album?.images) {
      setExistingImages(happeningData.album.images.map((img: AlbumImage) => img.image));
    }
  }, [happeningData?.album?.images]);

  useEffect(() => {
    if (happeningData) {
      methods.reset({
        title: happeningData.title,
        description: happeningData.description,
        happeningTypeId: happeningData.happeningTypeId.toString(),
        mainImage: happeningData.mainImage,
        album_images: [],
      });
    }
  }, [happeningData, methods]);

  return {
    ...methods,
    onSubmit,
    loading,
    success,
    message,
    show,
    defaultAlbumUrls,
    handleExistingImagesChange,
  };
};