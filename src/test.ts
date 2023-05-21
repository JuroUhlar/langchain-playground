import { OpenAI } from "langchain/llms/openai";
import * as fs from "fs";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { VectorDBQAChain } from "langchain/chains";

export const run = async () => {
  const model = new OpenAI({});

  const text = fs.readFileSync("data/state_of_the_union.txt", "utf8");

  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });

  const docs = await textSplitter.createDocuments([text]);

  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

  const chain = VectorDBQAChain.fromLLM(model, vectorStore, {returnSourceDocuments: true});

  const res = await chain.call({
    input_documents: docs,
    query: "What did the president say about Justice Breyer?",
  });

  console.log({ res });
};

run();
