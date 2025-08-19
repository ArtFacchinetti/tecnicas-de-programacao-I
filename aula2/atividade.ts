import { readFile } from 'fs/promises';
import { parse } from 'csv-parse/sync'; // versão síncrona é mais simples pra começar


const csv = async function parseCsv() {
    const content = await readFile('./nomes.csv', 'utf-8');

    const records = parse(content, {
        columns: false, // usa a 1ª linha como cabeçalho
        skip_empty_lines: true,
        trim: true
    });

    return records
}

csv().then((data)=>{
    console.log(data)
})