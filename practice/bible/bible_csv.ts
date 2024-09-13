import * as fs from 'fs';
import * as path from 'path';
import { extractBible } from '../utils/bible.util';

function main(){
    const filePath = path.resolve(__dirname, '현대인의성경.bible');
    console.log(filePath)
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log('err: ', err);
        }
        //console.log(data);
        const lines = data.trim().split('\n');
        let index = 0;
        for(const line of lines){
            const extract = extractBible(line);
            console.log(`${index++}: ${JSON.stringify(extract)}`);
        }
    });
}

main();