import { extractBible } from "../utils/bible.util";


function main() {
    const sampleExpression = '창1:1 태초에 하나님이 천지를 창조하셧당께';
    console.log(extractBible(sampleExpression));
}

main();