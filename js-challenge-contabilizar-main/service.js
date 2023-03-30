const validarEntradaDeDados = (lancamento) => {
   // Verifica se o CPF contém apenas caracteres numéricos
   if (!/^\d+$/.test(lancamento.cpf)) {
     return 'CPF deve conter apenas caracteres numéricos.';
   }
 
   // Verifica se o CPF é válido
   if (!validarCPF(lancamento.cpf)) {
     return 'CPF inválido.';
   }
 
   // Verifica se o valor é numérico
   if (typeof lancamento.valor !== 'number') {
     return 'Valor deve ser numérico.';
   }
 
   // Verifica se o valor não é superior a 15000,00
   if (lancamento.valor > 15000) {
     return 'Valor não pode ser superior a 15000,00.';
   }
 
   // Verifica se o valor não é inferior a -2000,00
   if (lancamento.valor < -2000) {
     return 'Valor não pode ser inferior a -2000,00.';
   }
 
   // Se todas as validações passarem, retorna null
   return null;
 };
 
 // Função para validar CPF
 const validarCPF = (cpf) => {
   cpf = cpf.replace(/[^\d]+/g, '');
   if (cpf === '') return false;
   // Elimina CPFs invalidos conhecidos
   if (
     cpf.length !== 11 ||
     cpf === '00000000000' ||
     cpf === '11111111111' ||
     cpf === '22222222222' ||
     cpf === '33333333333' ||
     cpf === '44444444444' ||
     cpf === '55555555555' ||
     cpf === '66666666666' ||
     cpf === '77777777777' ||
     cpf === '88888888888' ||
     cpf === '99999999999'
   ) {
     return false;
   }
   // Valida 1o digito
   let add = 0;
   for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
   let rev = 11 - (add % 11);
   if (rev === 10 || rev === 11) rev = 0;
   if (rev !== parseInt(cpf.charAt(9))) return false;
   // Valida 2o digito
   add = 0;
   for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
   rev = 11 - (add % 11);
   if (rev === 10 || rev === 11) rev = 0;
   if (rev !== parseInt(cpf.charAt(10))) return false;
   return true;
};  

const recuperarSaldosPorConta = (lancamentos) => {
   let saldos = {};
   lancamentos.forEach((lancamento) => {
     if (!saldos[lancamento.cpf]) {
       saldos[lancamento.cpf] = 0;
     }
     saldos[lancamento.cpf] += lancamento.valor;
   });
 
   return Object.entries(saldos).map(([cpf, saldo]) => ({ cpf, saldo }));
 };
 
 
 
 

const recuperarMaiorMenorLancamentos = (cpf, lancamentos) => {
   const lancamentosCPF = lancamentos.filter(lancamento => lancamento.cpf === cpf);
   if (lancamentosCPF.length === 0) {
     return [];
   }
   if (lancamentosCPF.length === 1) {
     return [lancamentosCPF[0], lancamentosCPF[0]];
   }
   const lancamentosOrdenados = lancamentosCPF.sort((a, b) => a.valor - b.valor);
   console.log(lancamentosOrdenados[0]);
   return [lancamentosOrdenados[0], lancamentosOrdenados[lancamentosOrdenados.length - 1]];
}
 

const recuperarMaioresSaldos = (lancamentos) => {
   const saldos = {};
 
   // Calcula os saldos de cada CPF
   lancamentos.forEach((lancamento) => {
     const cpf = lancamento.cpf;
     const valor = parseFloat(lancamento.valor);
 
     if (!saldos[cpf]) {
       saldos[cpf] = 0;
     }
 
     saldos[cpf] += valor;
   });
 
   // Ordena os saldos em ordem decrescente
   const cpfSaldos = Object.keys(saldos).map((cpf) => {
     return {
       cpf,
       saldo: saldos[cpf]
     };
   }).sort((a, b) => b.saldo - a.saldo);
 
   // Retorna os 3 CPFs com maiores saldos
   return cpfSaldos.slice(0, 3);
 };
 
const recuperarMaioresMedias = (lancamentos) => {
   // objeto para armazenar os saldos e número de lançamentos para cada CPF
   const saldos = {};
 
   // loop para calcular os saldos e número de lançamentos de cada CPF
   for (const lancamento of lancamentos) {
     const { cpf, valor } = lancamento;
     if (!saldos[cpf]) {
       saldos[cpf] = { saldo: 0, numLancamentos: 0 };
     }
     saldos[cpf].saldo += valor;
     saldos[cpf].numLancamentos++;
   }
 
   // array com as médias dos saldos de cada CPF
   const medias = Object.entries(saldos).map(([cpf, { saldo, numLancamentos }]) => ({
     cpf,
     media: saldo / numLancamentos
   }));
 
   // ordenando as médias em ordem decrescente
   medias.sort((a, b) => b.media - a.media);
 
   // retornando os 3 maiores saldos médios, ou todos se houver menos de 3 CPFs diferentes
   return medias.slice(0, 3).map(lancamento => ({ cpf: lancamento.cpf, media: parseInt(lancamento.media) }));

}
 