import * as fs from 'fs';
import * as path from 'path';
import { extractBible } from '../utils/bible.util';
import { prisma } from '../utils/prismaClient';
import { Prisma } from '@prisma/client';

function main(){
    const filePath = path.resolve(__dirname, '현대인의성경.bible');
    console.log(filePath)
    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            console.log('err: ', err);
        }
        //console.log(data);
        const lines = data.trim().split('\n');
        let index = 0;
        const bibleInserts: Prisma.BibleCreateManyInput[] = [];
        for(const line of lines){
            const extractResult = extractBible(line);
            console.log(`${index++}: ${JSON.stringify(extractBible)}`);
            if(extractResult){
                
                bibleInserts.push({
                    translationVersion: '현대인의성경',
                    shortTitle: extractResult.shortChapter,
                    longTitle: extractResult.longChapter,
                    chapter: extractResult.firstVerse,
                    subChapter: extractResult.secondVerse,
                    content: extractResult.content,
                });
            }
        }
        await prisma.bible.createMany({
            data: bibleInserts
        });
    });
}

main();