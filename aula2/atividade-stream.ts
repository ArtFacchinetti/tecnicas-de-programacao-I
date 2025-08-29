/*
Nomes em maiúsculo no csv

1: Receber dados
2: Tratar capitalizando (menos preposições)
3: Reescrever num csv


Soluções:
Criar uma stream de transformação, que lê o csv, trata, e devolve para outro

Para ler o csv cmo objeto, posso utilizar o parse() da lib csv-parse.
O dado entrará no tranformer, será parseado, tratato, parseado para csv, gravado na sáida pelo trasformer

Pera... Nem preciso de parser. O trasformer pode ler linha por linha

Para salvar num outro arquivo
*/

import { transform } from "typescript"

//USANDO TRANSFORMER (NÃO SEI SE É NECESSÁRIO)
// Lê com readstream, passa esses dados para o transformer com pipe, passa esse resultado para uma createwritestream com pipe tbm

const fs = require('fs')
const {Transform} = require('stream')

function niceUpperCase (chunk:Buffer) {
  const lowerCaseChunk = chunk.toString().toLowerCase();
  const firstLetter = lowerCaseChunk.charAt(0).toLocaleUpperCase();
  const treatedChunk = firstLetter + lowerCaseChunk.substring(1)

  console.log(chunk.toString())

  return treatedChunk
}

const upperCaseTransformer = new Transform({
  transform(chunk:Buffer, encoding:any, callback:any){
    this.push(niceUpperCase(chunk));
    callback();
  }
});

fs.createReadStream('./mock.csv')
.pipe(upperCaseTransformer)
.pipe(fs.createWriteStream('./result.csv'))

// NÃO FUNCIONA POR QUE O CHUNK NÃO É LINHA POR LINHA, USAR READLINE NA PRÓXIMA