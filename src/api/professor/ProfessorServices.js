import { RequiredArgumentError } from "../errors";

const baseEndpoint = 'api/Professor/';

export async function getProfessors() {

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

        let professors = await response.json(); 

        return professors;

    }catch(err){
       throw err;
    }
};

export async function getProfessorById(professorId) {

    if (professorId == null) throw new RequiredArgumentError('id');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint  + "GetProfessorById/");
        url.searchParams.set('id', professorId);

        let response = await fetch(url, {
            'method': "GET",
            'mode': 'cors',
            'headers': {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })

        let professor = await response.json(); 

        return professor;

    }catch(err){
       throw err;
    }
};

export async function createProfessor(newProfessor) {

    if (newProfessor == null) throw new RequiredArgumentError('professor');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint);

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newProfessor)
        })

        if (!response.ok) throw await response.json();

        return response;

    }catch(err){
       throw err;
    }
};

export async function deleteProfessorById(professorId) {

    if (professorId == null) throw new RequiredArgumentError('id');

    try{
    
        let url = new URL(process.env.REACT_APP_API + baseEndpoint + professorId );

        let response = await fetch(url, {
            'method': "DELETE",
            'mode': 'cors',
            'headers': {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })

        let professor = await response.json(); 

        return professor;

    }catch(err){
       throw err;
    }
};


export async function updateProfessor(newProfessor) {

    if (newProfessor == null) throw new RequiredArgumentError('professor');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint);

        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newProfessor)
        })

        let professor = await response.json(); 

        return professor;

    }catch(err){
       throw err;
    }
};