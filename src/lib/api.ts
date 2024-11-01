import { Enquire } from "@/app/(dashboard)/list/enquires/page";


const URL = 'https://a0tho61nq1.execute-api.ap-south-1.amazonaws.com/Prod'

export async function getEnquireList() : Promise<any>  {
    let data = await fetch(`${URL}/enquire`,{ cache: 'no-store'});
    return data.json()
}

export async function getEnquireById(id : string) : Promise<any>  {
    let data = await fetch(`${URL}/enquire/${id}`,{ cache: 'no-store'});
    return data.json()
}

export async function updateEnquire(data :any) : Promise<any>{
    const response = await fetch(`${URL}/enquire`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return response
}