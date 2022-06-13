import { RequiredArgumentError } from "../errors";

const baseEndpoint = 'api/Company/';

export async function getCompanyById(companyId) {

    if (companyId == null) throw new RequiredArgumentError('id');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint  + "GetCompanyById/");
        url.searchParams.set('id', companyId);

        let response = await fetch(url, {
            'method': "GET",
            'mode': 'cors',
            'headers': {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })

        let company = await response.json(); 

        return company;

    }catch(err){
       throw err;
    }
};


export async function getCompanys() {

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint);

        let response = await fetch(url, {
            'method': "GET",
            'mode': 'cors',
            'headers': {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })

        let companys = await response.json(); 

        return companys;

    }catch(err){
       throw err;
    }
}

export async function createCompany(newCompany) {

    if (newCompany == null) throw new RequiredArgumentError('company');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint);

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newCompany)
        })

        return response;

    }catch(err){
       throw err;
    }
};

export async function deleteCompanyById(companyId) {

    if (companyId == null) throw new RequiredArgumentError('id');

    try{
    
        let url = new URL(process.env.REACT_APP_API + baseEndpoint + companyId );

        let response = await fetch(url, {
            'method': "DELETE",
            'mode': 'cors',
            'headers': {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })

        let company = await response.json(); 

        return company;

    }catch(err){
       throw err;
    }
};

export async function updateCompany(newCompany) {

    if (newCompany == null) throw new RequiredArgumentError('company');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint);

        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newCompany)
        })

        let company = await response.json(); 

        return company;

    }catch(err){
       throw err;
    }
};