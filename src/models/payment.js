import {v4 as uuidv4} from "uuid";

export var Payment = {
    cdp : '',
    total: '',
    pays: [{
      desc : '',
      id: uuidv4(),
      date: null
    }]
}