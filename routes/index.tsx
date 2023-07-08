import { Head } from "$fresh/runtime.ts";
import App from "../islands/App.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>やわらかてきすと。｜パソコンでも、いい感じの文章に。</title>
      </Head>
      <div class="bg-yellow-300 p-8">
        <h1 class="text-3xl font-bold">やわらかてきすと。</h1>
        <p class="text-lg mt-4">パソコンでも、いい感じの文章になります</p>
      </div>

      <App />
    </>
  );
}
