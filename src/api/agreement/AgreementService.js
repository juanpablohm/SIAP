import { RequiredArgumentError } from "../errors";

const baseEndpoint = 'api/Agreement/';

export async function getAgreementById(agreementId) {

    if (agreementId == null) throw new RequiredArgumentError('id');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint  + "GetAgreementById/");
        url.searchParams.set('id', agreementId);

        let response = await fetch(url, {
            'method': "GET",
            'mode': 'cors',
            'headers': {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })

        let agreement = await response.json(); 

        return agreement;

    }catch(err){
       throw err;
    }
};


export async function getAgreements() {

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

        let agreement = await response.json(); 

        return agreement;

    }catch(err){
       throw err;
    }
}

export async function createAgreement(newAgreement) {

    if (newAgreement == null) throw new RequiredArgumentError('internship');

    try{
        let url = new URL(process.env.REACT_APP_API + "api/Company/AddCompanyAgreement");

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newAgreement)
        })

        let agreement = await response.json(); 

        return agreement;

    }catch(err){
       throw err;
    }
};