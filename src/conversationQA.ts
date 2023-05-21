import { OpenAI } from "langchain/llms/openai";
import {  ChatVectorDBQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";

export const run = async () => {
  /* Initialize the LLM to use to answer the question */
  const model = new OpenAI({});
  /* Load in the file we want to do question answering over */
  const text = fs.readFileSync("data/state_of_the_union.txt", "utf8");
  /* Split the text into chunks */
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 200, chunkOverlap: 50  });
  const docs = await textSplitter.createDocuments([text], );
  /* Create the vectorstore */
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
  /* Create the chain */
  const chain = ChatVectorDBQAChain.fromLLM(
    model,
    vectorStore,
    { returnSourceDocuments: true, k: 2 },
  );
  /* Ask it a question */
  const question = "Did the president mention Zelenskyy?";
  const res = await chain.call({ question, chat_history: [] });
  console.log(res);
  /* Ask it a follow up question */
  const chatHistory = question + res.text;

  console.log(chatHistory);
  const followUpRes = await chain.call({
    question: "What did he say about him?",
    chat_history: chatHistory,
  });
  console.log(followUpRes);
};

run();