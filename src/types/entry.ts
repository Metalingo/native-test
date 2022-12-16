export interface ILexical {
    id: string,
    lexicalCategory: {
        id: string,
        text: string,
    },
    senses: { id: string, definitions: string[], examples: string[] }[],
    saved: boolean
}

export enum LearningStates {
	PRONUNCIATION_INIT = "PRONUNCIATION_INIT",
	PRONUNCIATION_IN_PROGRESS = "PRONUNCIATION_IN_PROGRESS",
	PRONUNCIATION_MISTAKE = "PRONUNCIATION_MISTAKE",
	PRONUNCIATION_SUCCESS = "PRONUNCIATION_SUCCESS",
}