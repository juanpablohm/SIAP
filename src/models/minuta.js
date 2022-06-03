import {v4 as uuidv4} from "uuid";


export var Minuta = {
    status: '',
    period: '1',
    observations : '',
    arlCode : '',
    cdp: '',
    budgetCommitment: '',
    notes: [{
        description: " ",
        id: uuidv4()
    }]
}