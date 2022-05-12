import { RequiredArgumentError } from "../errors";

const baseEndpoint = 'api/Student/';

export async function getStudentById(studentId) {

    if (studentId == null) throw new RequiredArgumentError('id');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint  + "GetStudentById/");
        url.searchParams.set('id', studentId);

        let response = await fetch(url, {
            'method': "GET",
            'mode': 'cors',
            'headers': {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })

        let student = await response.json(); 

        return student;

    }catch(err){
       throw err;
    }
}