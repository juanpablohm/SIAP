import { RequiredArgumentError } from "../errors";

const baseEndpoint = 'api/Supervisor';

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