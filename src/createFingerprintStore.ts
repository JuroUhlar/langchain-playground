import { TextLoader } from "langchain/document_loaders";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores";
import { OpenAIEmbeddings } from "langchain/embeddings";

const loader = new DirectoryLoader("data/fpTestSample", {
  ".md": (path) => new TextLoader(path),
});

const markdownTextSplitter = RecursiveCharacterTextSplitter.fromLanguage(
  "markdown",
  {
    // chunkSize: 2500,
    // chunkOverlap: 50,
  }
);

const docs = await loader.loadAndSplit(markdownTextSplitter);

// console.log(JSON.stringify(docs, null, 2));
console.log("Number of docs: ", docs.length);

// Write JSON to file
// const json = JSON.stringify(docs, null, 2);
// fs.writeFileSync("fpDocs.json", json);

// Create a local vector store
const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

// Save the vector store to a directory
const directory = "stores/fp_vector_store";
await vectorStore.save(directory);
