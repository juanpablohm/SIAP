import {v4 as uuidv4} from "uuid";

export var Internship = {
    type: '',
    dependency:'',
    agreementId : 1,
    professorId: 1,
    supervisorId: 1,
    studentId: 1,
    modality: '',
    startdate: (new Date()).toISOString(),
    endDate:  (new Date()).toISOString(),
    entryTime: null,
    exitTime: null,
    weeksHour: 30,
    isPaid: true,
    type: 0,
    status: 0,
    observations: '',
    generalGoal:"",
    specificGoals: [
           {
             description  : "",
             id: uuidv4(),
           },
         ],
 };