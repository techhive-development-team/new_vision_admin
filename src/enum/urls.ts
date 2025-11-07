export const API_URLS = {
  USER: "/users",
  IMAGE: "/images",
  UPLOAD: "/uploads",
  COURSE: "/courses",
  IMAGETYPE: "/imageType",
  HAPPENINGTYPE: "/happeningTypes",
  EDUCATION_PARTNER: "/education-partners",
  STUDENTREVIEW: "/studentReview",
  AUTH: "/auth",
  HAPPENING: "/happenings",
  INQUIRY: "/inquiry",
  STUDENT: "/students",
  FUTURECOUNTRY: "/futureCountry",
};

export const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
export const environment = import.meta.env.VITE_APP_NODE_ENV;

export const imageUrl =
  environment === 'production'
    ? import.meta.env.VITE_APP_AWS_IMAGE_URL
    : `${baseUrl}/${API_URLS.UPLOAD}`;

