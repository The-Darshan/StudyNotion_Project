import React from 'react'
import toast from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';

const {CATALOG_PAGE_DATA_API} =  catalogData

 export const getCatalogPageData = async(categoryID) => {
    const toastId = toast.loading("Loading...");
    let result = [];
  try{
    const response = await apiConnector("POST",CATALOG_PAGE_DATA_API,{categoryID});

    if(!response?.data?.success) throw new Error(response?.data?.message);

    console.log("CATEGORY PAGE DATA RESULT : ",response);

    toast.success("CATALOG DATA FOUND SUCCESSFULLY");
    result = response?.data?.data

  }catch(err){
    console.log("CATALOG PAGE DATA API ERROR....",err);
    toast.error("CATALOG PAGE DATA API ERROR....");
  }
  toast.dismiss(toastId);
  return result
}
