import {v4 as uuidv4} from "uuid";

export var Reports = [{
    description  : "Primer informe de actividades",
    id: uuidv4(),
    date: (new Date()).toISOString()
  },
  {
    description  : "Segundo informe de actividades",
    id: uuidv4(),
    date: (new Date()).toISOString()
  },
  {
    description  : "Informe final de actividades",
    id: uuidv4(),
    date: (new Date()).toISOString()
  },
  {
    description  : "Concertación de objetivos",
    id: uuidv4(),
    date: (new Date()).toISOString()
}];