# Telzir backend
Essa aplicação foi construída utlizando Node e Typescript com finalidade de estudar as tecnologias.

Principais tecnologias utilizadas:
- **Node v13.11.0, Typescript@latest**

Gerenciador de pacotes:
 - **Yarn 1.22.0**

O principal intuito da construção dessa aplicação, é tornar o cálculo de taxas sobre as ligações independente do frontend e dividir a infraestrutura da nossa aplicação em camadas mais seguras e com responsabilidades únicas.

Executando o servidor:
- **yarn dev:server**


Rota única da aplicação:
- http://localhost:3333/telzir

Acessando recurso de cálculo de taxas através de objetos **JSON**
- Método: Post
```
{
	"origem":"011",
	"destiny": "016",
	"time":"20",
	"plan":"FaleMais 30"
 }
```

- Retorno esperado
```
{
  "priceWithoutPlan": 38,
  "finalPrice": 0
}
```

