import {v4 as uuidv4} from "uuid";

export var Payment = {
    cdpNumber : 0,
    total: 0,
    salary: 0,
    fees: [{
      amount : 0,
      id: uuidv4(),
      date: (new Date()).toISOString()
    }]
}