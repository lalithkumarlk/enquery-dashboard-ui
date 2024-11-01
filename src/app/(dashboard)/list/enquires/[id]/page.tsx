
'use client'

import EditableImage from "@/components/EditableImage";
import { getEnquireById, updateEnquire } from "@/lib/api";


import { notFound, useParams } from "next/navigation";

interface TagValue {
    tag: string;
    value: number;
  }

  interface ImageData {
    src: string;
    alt: string;
    tags: TagValue[];
  }

const SingleEnquirePage = async() => {
    
    const params = useParams<{ id: string}>()
    const enquire = await getEnquireById(params.id);

    if(!enquire){
        notFound
    }

    return (
        <div className="flex w-full">
            <EditableImage data={enquire}  />
        </div>
    )
}

export default SingleEnquirePage;