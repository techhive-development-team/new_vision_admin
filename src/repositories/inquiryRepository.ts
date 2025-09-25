import { API_URLS } from '../enum/urls';
import { type InquiryCreateForm } from './../pages/Inquiry/InquiryValidationSchema';
import { client } from './client';


const createInquiry = async (inquiryData: InquiryCreateForm) => {
    const response = await client.exec(API_URLS.INQUIRY, {
        method: "post",
        body: JSON.stringify(inquiryData),
    });
    return response;
};

const getAll = async (param?: { limit?: number, offset?: number }) => {
    const query = new URLSearchParams(param as any).toString();
    const response = await client.exec(`${API_URLS.INQUIRY}?${query}`,{
        method: "get",
    });
    return response;
}

const getInquiryById = async (id: string) => {
    const response = await client.exec(`${API_URLS.INQUIRY}/${id}`, {
        method: "get",
    });
    return response;
}

const deleteInquiry = async (id: string) => {
    const response = await client.exec(`${API_URLS.INQUIRY}/${id}`,{
        method: "delete",
    });
    return response;
}

export const inquiryRepository ={
    getAll,
    createInquiry,
    getInquiryById,
    deleteInquiry,
}

