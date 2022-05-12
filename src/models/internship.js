import {v4 as uuidv4} from "uuid";

export var Internship = {
    type: '',
    dependency:'',
    agreementId : '',
    professorId: '',
    modality: '',
    startDate: '2014-08-18T21:11:54',
    endDate: '2014-08-18T21:11:54',
    entryTime: null,
    exitTime: null,
    weeksHour: '',
    isPaid: true,
    generalGoal: [
           {
             desc  : "",
             id: uuidv4(),
           },
         ],
    specificGoal: [
           {
             desc  : "",
             id: uuidv4(),
           },
         ],
 };