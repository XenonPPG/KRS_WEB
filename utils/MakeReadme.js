import * as fs from 'fs'

const [, , inputFile, outputFile, linesToRemove] = process.argv;

const docsContent = fs.readFileSync(inputFile, 'utf8')
const docs = docsContent.split('\n').filter((l, i) => i > Number(linesToRemove)).join('\n')

const beginning = fs.readFileSync("./docs/description.md", 'utf8')
fs.writeFileSync(outputFile, beginning + '\n---\n# Документация\n' + docs)