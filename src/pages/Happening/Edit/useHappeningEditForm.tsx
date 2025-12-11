import { useParams } from "react-router-dom";
import { useGetHappeningById } from "../../../hooks/useGetHappening";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useFormState } from "../../../hooks/useFormState";
import { happeningRepository } from "../../../repositories/happeningRepository";
import {
  HappeningSchema,
  type HappeningCreateForm,
} from "../HappeningValidationSchema";
import { API_URLS, imageUrl } from "../../../enum/urls";

export interface AlbumImage {
  id: number;
  albumId: number;
  image: string;
  createdAt: string;
}

export const useHappeningEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const { data: happeningData } = useGetHappeningById(id ?? "");

  const [existingImages, setExistingImages] = useState<string[]>([]);
  
  // Track if form has been initialized to prevent re-initialization
  const isInitialized = useRef(false);

  const defaultAlbumUrls = useMemo(
    () =>
      happeningData?.album?.images?.map(
        (img: AlbumImage) =>
          `${imageUrl}${API_URLS.HAPPENING}/${img.image}`
      ) || [],
    [happeningData?.album?.images]
  );

  // Memoize default image names
  const defaultImageNames = useMemo(
    () => happeningData?.album?.images?.map((img: AlbumImage) => img.image) || [],
    [happeningData?.album?.images]
  );

  const methods = useForm<HappeningCreateForm>({
    resolver: zodResolver(HappeningSchema(!!happeningData?.mainImage)),
    defaultValues: {
      title: "",
      description: "",
      embeddedLink: "",
      happeningTypeId: "",
      mainImage: undefined,
      album_images: [],
    },
  });

  const { loading, success, message, show, handleSubmit } =
    useFormState<HappeningCreateForm>();

  // Callback to handle existing images changes from MultiFileUpload
  const handleExistingImagesChange = useCallback((images: string[]) => {
    console.log("Existing images updated from component:", images);
    setExistingImages(images);
  }, []);

  const onSubmit = (data: HappeningCreateForm) => {
    console.log("Form submission data:", {
      existingImages,
      newImages: data.album_images?.length || 0,
      mainImage: data.mainImage instanceof File ? "File" : "String",
    });

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("happeningTypeId", data.happeningTypeId);
    formData.append("embeddedLink", data.embeddedLink ?? "");

    // Handle main image - only append if it's a new file
    if (data.mainImage instanceof File) {
      formData.append("mainImage", data.mainImage);
    }

    // Handle existing album images that should be kept
    if (existingImages.length > 0) {
      existingImages.forEach((imageName) => {
        formData.append("existingAlbum[]", imageName);
      });
      console.log("Existing images to keep:", existingImages);
    }

    // Handle new album images
    if (Array.isArray(data.album_images) && data.album_images.length > 0) {
      data.album_images.forEach((file) => {
        if (file instanceof File) {
          formData.append("album_images", file);
        }
      });
      console.log("New images to upload:", data.album_images.length);
    }

    handleSubmit(() => happeningRepository.updateHappening(id ?? "", formData));
  };

  // Initialize form data and existing images when happeningData loads
  useEffect(() => {
    if (happeningData && !isInitialized.current) {
      // Reset form with happening data
      methods.reset({
        title: happeningData.title || "",
        description: happeningData.description || "",
        embeddedLink: happeningData.embeddedLink || "",
        happeningTypeId: happeningData.happeningTypeId?.toString() || "",
        mainImage: happeningData.mainImage,
        album_images: [],
      });

      // Initialize existing images
      if (defaultImageNames.length > 0) {
        setExistingImages(defaultImageNames);
        console.log("Initialized existing images:", defaultImageNames);
      }

      isInitialized.current = true;
    }
  }, [happeningData, defaultImageNames]); // Removed 'methods' from dependencies

  // Reset initialization flag when component unmounts or ID changes
  useEffect(() => {
    return () => {
      isInitialized.current = false;
    };
  }, [id]);

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