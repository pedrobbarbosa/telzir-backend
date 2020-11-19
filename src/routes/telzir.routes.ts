import Router from "express";

import telzirService from '../services/telzirService';


const telzir = Router();

telzir.post('/', async (request, response) => {
  try {
    const {origem, destiny, time, plan} = request.body;

    const createTelzirService = new telzirService();

    const result = await createTelzirService.execute({origem, destiny, time, plan});

    return response.json(result);
  }
  catch(err) {
    return response.status(400).json({error: err.message});
  }
});

telzir.get('/', (request, response) => {
  try {
    return response.status(200).json({'hello': 'world'});
  }
  catch(err) {
    return response.status(400).json({error: err.message});
  }
});




export default telzir;
