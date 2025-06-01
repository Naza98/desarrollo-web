# desarrollo-web

Integrantes:

- Esquivel Daiana
- Pernochi Nazareno

//---------------------------------------------------------------------------//

Tercera entrega: 

Login:
User: admin
Pass: 1234

Profes: Mientras no se  agreguen datos al localStorage, se va a consumir la información del json "dataHardcode". Una vez que se agregue el registro de un nuevo salón, eso se pierde y se utiliza solo la data del localStorage. 

Esta es la línea: const salones = JSON.parse(localStorage.getItem('salones')) || dataHardcode;
 
Funciona solo si localStorage.getItem('salones') devuelve null
