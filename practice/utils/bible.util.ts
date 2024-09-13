import { BIBLE_CHAPTER_MAP } from "../bible/bible.interface";

export function extractBible(text: string): { shortChapter: string, longChapter: string, firstVerse: number, secondVerse: number, content: string } | null {
    // 정규 표현식 수정: 장과 절 및 본문을 추출
    const regex = /([가-힣A-Za-z]+)(\d+):(\d+)\s(.+)/;
    let match: RegExpExecArray | null;

    // 정규 표현식에 매칭된 항목을 추출
    if ((match = regex.exec(text)) !== null) {
        const shortChapter = match[1]; // 장
        const firstVerse = Number(match[2]);
        const secondVerse = Number(match[3]);
        const content = match[4]; // 본문
        return { shortChapter, longChapter: BIBLE_CHAPTER_MAP[shortChapter], firstVerse, secondVerse, content };
    }else{
        console.log(text);
    }
    return null;
}