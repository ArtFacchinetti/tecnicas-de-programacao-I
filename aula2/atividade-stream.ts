const fs = require('fs')
const { Transform } = require('stream')

const ignoredWords = ['de', 'da', 'das', 'do', 'dos', 'e']

const PATH = './nomes.csv';

function niceUpperCase(chunk: Array<string>) {
  const lowerCaseChunkArray = chunk
    .toString()
    .toLocaleLowerCase()
    .split('\r\n')
    .map((completeName) => {
      return completeName
        .trim()
        .split(' ')
        .map(n => {
          if (ignoredWords.includes(n)) {
            return n
          } else {
            return n.charAt(0).toLocaleUpperCase() + n.substring(1).trim()
          }
        })
        .join(' ')
    })
    .join('\r\n')

  return lowerCaseChunkArray
}

const upperCaseTransformer = new Transform({
  transform(chunk: Array<string>, encoding: any, callback: any) {
    this.push(niceUpperCase(chunk));
    callback();
  }
});



async function execute() {
  const writeCSV = () => {
    return new Promise((resolve, reject) => {
      fs.createReadStream(PATH)
        .pipe(upperCaseTransformer)
        .pipe(fs.createWriteStream('./result.csv'))
        .on('finish', () => { 
          resolve("ok");
        })
        .on('error', (err:Error) => reject(err));
    });
  };

  console.log('Tratamento iniciado...');

  const start = performance.now();

  const retorno = await writeCSV(); 

  const end = performance.now();
  const timeToFinish = end - start;

  console.log(`Tratamento finalizado! \n -- Demorou ${Math.floor(timeToFinish) / 1000} segundos ;)`);
}

execute();