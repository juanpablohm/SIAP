import { RequiredArgumentError } from "../errors";

const baseEndpoint = 'api/Internship/';

export async function getInternships() {

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

        let internship = await response.json(); 

        return internship;

    }catch(err){
       throw err;
    }
};


export async function getInternshipById(internshipId) {

    if (internshipId == null) throw new RequiredArgumentError('id');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint  + "GetInternshipsById/");
        url.searchParams.set('id', internshipId);

        let response = await fetch(url, {
            'method': "GET",
            'mode': 'cors',
            'headers': {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })

        let internship = await response.json(); 

        return internship;

    }catch(err){
       throw err;
    }
};

export async function createInternship(newInternship) {

    if (newInternship == null) throw new RequiredArgumentError('internship');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint);

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newInternship)
        })

        let internship = await response.json(); 

        return internship;

    }catch(err){
       throw err;
    }
}

