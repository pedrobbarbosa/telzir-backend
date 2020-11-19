import * as yup from 'yup';

import IRequest from '../models/telzir.request';
import AppError from '../errors/AppError';

interface IResponse {
  finalPrice: number;
  priceWithoutPlan: number;
}

class telzirService{
  public async execute({origem, destiny, time, plan}: IRequest): Promise<IResponse>{
    try {
      const reMatch = new RegExp('(011|016|017|018)');
      let schema = yup.object().shape({
        origem: yup.string().matches(reMatch).required('Choose the correct area code'),
        destiny: yup.string().matches(reMatch).required('Choose the correct area code'),
        time: yup.string().required().min(1).max(999),
        plan: yup.string().matches(new RegExp('^FaleMais (30|60|120)')),
      });

      const isValid = await schema.validate({
        origem,
        destiny,
        time,
        plan
      });

      if(!isValid) {
        throw new AppError('erro', 400);
      }

      const pricesTable= {
        '011-016': '1.90',
        '016-011': '2.90',
        '011-017': '1.70',
        '017-011': '2.70',
        '011-018': '0.90',
        '018-011': '1.90'
      };

      const plans = {
        'FaleMais 30': '30',
        'FaleMais 60': '60',
        'FaleMais 120': '120'
      };

      // Pega os minutos através da string do plano recebida pelo formulario
      const userPlan: number = Number(plans[plan]);
      // Pega a taxa por minuto  do objeto pricesTables
      const ratePerMinute: number = Number(pricesTable[`${origem}-${destiny}`]);

      // Verificação para saber se a origem e o destino existem
      // pode ser substituido por yup
      if (!ratePerMinute) {
        throw new AppError('DDD Origem and Destiny match was not found', 404);
      }

      // Preço bruto, sem nenhum desconto de plano
      const priceWithoutPlan: number = Number(ratePerMinute) * Number(time);
      // Subtração do plano com tempo do usuário
      const remainingPlanTime: number = userPlan - Number(time);

      if (remainingPlanTime >= 0) {
        return  {
          priceWithoutPlan,
          finalPrice: 0
        }
      } else {
        const tax: number = ratePerMinute + (ratePerMinute * 10/100);
        const exceedPrice: number = Math.round(Math.abs(remainingPlanTime) * tax);

        return {
          priceWithoutPlan,
          finalPrice: exceedPrice,
        }
      }
    }
    catch (err) {
      throw new AppError(err, 400);
    }
  }
}

export default telzirService;
