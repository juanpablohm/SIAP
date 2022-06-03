import {v4 as uuidv4} from "uuid";

export var Products = [ {
    description  : "",
    id: uuidv4(),
    date: (new Date()).toISOString()
}];