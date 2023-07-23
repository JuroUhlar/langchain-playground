import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const run = async () => {
  // Load vector store from a directory
  const vectorStore = await HNSWLib.load(
    "./stores/fp_vector_store",
    new OpenAIEmbeddings()
  );

  // Create a chain that uses the OpenAI LLM and HNSWLib vector store.
  const chain = RetrievalQAChain.fromLLM(
    new OpenAI(),
    vectorStore.asRetriever(5),
    {
      returnSourceDocuments: true,
      verbose: true,
    }
  );
  const res = await chain.call({
    query: "Give me a list of possible errors of the JS agent",
  });
  console.log(res.text);
  console.log(res);
};

run();
