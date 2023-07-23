import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import fs from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const text = fs.readFileSync("data/state_of_the_union.txt", "utf8");
/* Split the text into chunks */
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 200,
  chunkOverlap: 50,
});
const docs = await textSplitter.createDocuments([text]);
/* Create the vectorstore */

// Create a vector store through any method, here from texts as an example
const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

// Save the vector store to a directory
const directory = "./data/vectorstore";
await vectorStore.save(directory);

// Load the vector store from the same directory
const loadedVectorStore = await HNSWLib.load(directory, new OpenAIEmbeddings());

// vectorStore and loadedVectorStore are identical
const result = await loadedVectorStore.similaritySearch("hello world", 1);
console.log(result);
