import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const run = async () => {
  // Create a vector store from the documents.
  const vectorStore = await HNSWLib.load(
    "./data/vectorstore",
    new OpenAIEmbeddings()
  );

  // Create a chain that uses the OpenAI LLM and HNSWLib vector store.
  const chain = RetrievalQAChain.fromLLM(
    new OpenAI(),
    vectorStore.asRetriever(2),
    {
      returnSourceDocuments: true,
    }
  );
  const res = await chain.call({
    query: "What did the president say about Zelenskyy?",
  });
  console.log(JSON.stringify(res, null, 2));
  /*
  {
    res: {
      text: 'The president said that Justice Breyer was an Army veteran, Constitutional scholar,
      and retiring Justice of the United States Supreme Court and thanked him for his service.'
    }
  }
  */
};

run();
