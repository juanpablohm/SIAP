import { RequiredArgumentError } from "../errors";

const baseEndpoint = 'api/Supervisor/';

export async function createSupervisor(newSupervisor) {

    if (newSupervisor == null) throw new RequiredArgumentError('supervisor');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint );

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newSupervisor)
        })

        let supervisor = await response.json(); 

        return supervisor;

    }catch(err){
       throw err;
    }
}

export async function getSupervisorById(supervisorId) {

    if (supervisorId == null) throw new RequiredArgumentError('id');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint  + "GetSupervisorById/");
        url.searchParams.set('id', supervisorId);

        let response = await fetch(url, {
            'method': "GET",
            'mode': 'cors',
            'headers': {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })

        let supervisor = await response.json(); 

        return supervisor;

    }catch(err){
       throw err;
    }
};


export async function updateSupervisor(newSupervisor) {

    if (newSupervisor == null) throw new RequiredArgumentError('supervisor');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint);

        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newSupervisor)
        })

        let supervisor = await response.json(); 

        return supervisor;

    }catch(err){
       throw err;
    }
};


export async function deleteSupervisorById(supervisorId) {

    if (supervisorId == null) throw new RequiredArgumentError('id');

    try{
    
        let url = new URL(process.env.REACT_APP_API + baseEndpoint + supervisorId );

        let response = await fetch(url, {
            'method': "DELETE",
            'mode': 'cors',
            'headers': {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })

        let supervisor = await response.json(); 

        return supervisor;

    }catch(err){
       throw err;
    }
};