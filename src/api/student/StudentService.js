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
};


export async function getStudents() {

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

        let students = await response.json(); 

        return students;

    }catch(err){
       throw err;
    }
}

export async function createStudent(newStudent) {

    if (newStudent == null) throw new RequiredArgumentError('student');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint);

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newStudent)
        })

        if (!response.ok) throw await response.json();

        return response;

    }catch(err){
       throw err;
    }
};

export async function deleteStudentById(studentId) {

    if (studentId == null) throw new RequiredArgumentError('id');

    try{
    
        let url = new URL(process.env.REACT_APP_API + baseEndpoint + studentId );

        let response = await fetch(url, {
            'method': "DELETE",
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
};

export async function updateStudent(newStudent) {

    if (newStudent == null) throw new RequiredArgumentError('student');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint);

        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newStudent)
        })

        let student = await response.json(); 

        return student;

    }catch(err){
       throw err;
    }
};