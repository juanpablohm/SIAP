import { RequiredArgumentError } from "../errors";

const baseEndpoint = 'api/Minuta/';

export async function getMinutaById(minutaId) {

    if (minutaId == null) throw new RequiredArgumentError('id');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint  + "GetMinutaById/");
        url.searchParams.set('id', minutaId);

        let response = await fetch(url, {
            'method': "GET",
            'mode': 'cors',
            'headers': {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })

        let minuta = await response.json(); 

        return minuta;

    }catch(err){
       throw err;
    }
};


export async function updateMinuta(newMinuta) {

    if (newMinuta == null) throw new RequiredArgumentError('minuta');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint);

        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newMinuta)
        })

        let minuta = await response.json(); 

        return minuta;

    }catch(err){
       throw err;
    }
};


export async function deleteMinutaById(minutaId) {

    if (minutaId == null) throw new RequiredArgumentError('id');

    try{
    
        let url = new URL(process.env.REACT_APP_API + baseEndpoint + minutaId );

        let response = await fetch(url, {
            'method': "DELETE",
            'mode': 'cors',
            'headers': {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })

        let minuta = await response.json(); 

        return minuta;

    }catch(err){
       throw err;
    }
};


export async function updateMinutaStatus(minutaId, newStatus) {

    if (minutaId == null) throw new RequiredArgumentError('id');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint  + "UpdateMinutaStatus");
        url.searchParams.set('minutaId', minutaId);
        url.searchParams.set('minutastatus', newStatus);

        console.log(url.toString());

        let response = await fetch(url, {
            'method': "PUT",
            'mode': 'cors',
            'headers': {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })

        let minuta;

        return minuta;

    }catch(err){
       throw err;
    }
};


