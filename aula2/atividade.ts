const {parse} = require('csv-parse')
const fs = require('fs')

const ignore:Array<string> = ["de", "da", "dos", "do"]

async function parseCsv() {
    const content = await fs.readFile(`./nomes.csv`);
    const records = parse(content)

    return records

}

console.log(parseCsv())

function format(string:string):string {
    const lower:string = string.toLowerCase()
    const lowerTrim:string = lower.trim()

    if (testIgnore(lowerTrim) == 1 ){
        console.log('Não ignorado')
        const firstToUpper:string = lowerTrim.charAt(0).toUpperCase() + lowerTrim.slice(1)

        return firstToUpper
    }else {
        return lowerTrim
    }
}

function testIgnore(str:string):string | number {
    const foundWord = ignore.find((ignoredWord: string) => {
        return str === ignoredWord;
    });

    return 1
}

// function formatArray(array:string[]):string {
//     let virtual:string[] = []
//     array.forEach(name => {
//         const words:string[] = name.split(" ")
//         words.forEach(word => {
//             format(word)
//         })
//         virtual.
//     });
// }
