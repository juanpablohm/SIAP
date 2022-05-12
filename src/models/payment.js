import {v4 as uuidv4} from "uuid";

export var Payment = {
    cdpNumber : '',
    total: '',
    salary: '',
    fees: [{
      amount : '',
      id: uuidv4(),
      date: null
    }]
}