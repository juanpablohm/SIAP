import { RequiredArgumentError } from "../errors";

const baseEndpointQuestions = 'api/QuestionCategory/';

const baseEndpoint = "api/SupervisorEvaluation/"


export async function getQuestionsSupervisor() {

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpointQuestions);

        let response = await fetch(url, {
            'method': "GET",
            'mode': 'cors',
            'headers': {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        })

        let questions = await response.json(); 

        return questions;

    }catch(err){
       throw err;
    }
}

export async function createEvaluationSupervisor(newEvaluation) {

    if (newEvaluation == null) throw new RequiredArgumentError('evaluation');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint);

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newEvaluation)
        })

        return response;

    }catch(err){
       throw err;
    }
};


export async function updateEvaluationSupervisor(newEvaluation) {

    if (newEvaluation == null) throw new RequiredArgumentError('evaluation');

    try{
        let url = new URL(process.env.REACT_APP_API + baseEndpoint);

        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newEvaluation)
        })

        let evaluation = await response.json(); 

        return evaluation;

    }catch(err){
       throw err;
    }
};
