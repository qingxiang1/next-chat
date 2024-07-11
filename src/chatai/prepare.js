/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { TextLoader } from "langchain/document_loaders/fs/text";
import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
// import ignore from "ignore";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { AlibabaTongyiEmbeddings } from "@langchain/community/embeddings/alibaba_tongyi";
import path from "path";
import { fileURLToPath } from 'url';

/**
 * 文本就是切割，并保存在本地的数据库文件中
 */
const run = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const baseDir = __dirname;

  // const loader = new TextLoader(path.join(baseDir, "../md/qiu.txt"));
  const loader = new GithubRepoLoader(
    "https://github.com/qingxiang1/blog-site-template",
    {
      branch: "main",
      recursive: true,
      unknown: "warn",
      ignorePaths: [
        "*.md", "yarn.lock", "*.json", '*.js', '*.ts', '*.tsx', '*.jsx', '*.html', '*.css', '*.yml', '*.png',
        '*.svg', '*.jpg', '*.jpeg', '*.ico', '.bib', '.mjs'
      ],
      accessToken: ''
    }
  );
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });

  const splitDocs = await splitter.splitDocuments(docs);

  const embeddings = new AlibabaTongyiEmbeddings({
    apiKey: '',
    // @ts-ignore
    modelName: 'text-embedding-v1'
  });
  const vectorStore = await FaissStore.fromDocuments(splitDocs, embeddings);

  await vectorStore.save(path.join(baseDir, "./db/github"));
};

void run();
