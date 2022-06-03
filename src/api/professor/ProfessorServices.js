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