import { useState, useRef } from "preact/hooks";

//変換用のJSONを用意する
import conversionRules from "../data/conversionRules.json" assert { type: "json" };

//絵文字リスト
const emoticons = ["｡°(´∩ω∩`)°｡", "Σ(•̀ω•́ﾉ)ﾉ", "(ˊo̴̶̷̤ ᴗ o̴̶̷̤ˋ)", "⸜(๑’ᵕ’๑)⸝", "⸜( ´ ꒳ ` )⸝♡︎", "ᐠ(  ᐢ ᵕ ᐢ )ᐟ", "٩(´꒳`)۶", "(ง •̀ω•́)ง", "( ˙꒳​˙ᐢ )", "(   ˙꒳​˙   )", "(⑅•ᴗ•⑅)", "٩(ˊᗜˋ*)و", "”٩(^ᴗ^)۶", "ヽ(*’ ‘*)ﾉ", "👏🏻", "🙏🏻", "🫶🏻", "🤦🏻‍♀️", "✨", "💦", "👍🏻", "🙇🏻💦", "👏🏻💕", "🫶🏻💕", "😾💢", "🫰🏻💗", "🤦🏻‍♀️💞", "🤭🤍", "💡💖"];

export default function App() {
  const [inputText, setInputText] = useState("");
  const [convertedText, setConvertedText] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [randomEmoticon, setRandomEmoticon] = useState("");
  const [hideEmoticon, setHideEmoticon] = useState(false); // 新しいstate追加

  const convertedTextAreaRef = useRef(null);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputText(inputValue);

    let convertedValue = inputValue;

    // 変換方法をJSONから読み込み
    conversionRules.forEach((rule) => {
      const findRegex = new RegExp(rule.find, "g");
      convertedValue = convertedValue.replace(findRegex, rule.replace);
    });

    // 変換の改行を追加する
    convertedValue = convertedValue.replace(/\n/g, "<br>");
    handleEmoticonChange()
    setConvertedText(convertedValue);
    setShowWarning(convertedValue.length > 150);
  };

  const handleEmoticonChange = () => {
    const randomEmoticon = emoticons[Math.floor(Math.random() * emoticons.length)];
    setRandomEmoticon(randomEmoticon);
  };

  const handleCopyClick = () => {
    if (convertedTextAreaRef.current) {
      convertedTextAreaRef.current.select();
      document.execCommand("copy");
    }
  };

  const handleHideEmoticon = () => {
    setHideEmoticon(!hideEmoticon);
  };

  return (
    <div className="my-10 mx-10">
      <div class="mt-8 p-8">
        <label class="block mb-2 font-semibold" for="message">変換前：</label>
        <textarea class="w-full h-40 p-4 border border-gray-300 rounded-lg" id="message" name="message" placeholder="変換したいテキストを入力してください。" value={inputText}
          onInput={handleInputChange}></textarea>

        {showWarning && (
          <p className="text-red-600">テキストが長すぎます！LINEで送信すると長文の可能性があります。</p>
        )}
      </div>
      <div class="mt-8 p-8">
        <label class="block mb-2 font-semibold" for="message">変換後：</label>
        <textarea class="w-full h-40 p-4 border border-gray-300 rounded-lg" id="message" name="message" placeholder="変換したテキストがここに表示されます。" value={inputText ? (hideEmoticon ? convertedText : convertedText + randomEmoticon) : ''} ref={convertedTextAreaRef}></textarea>
        <div class="space-x-5">
          <button class="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded" onClick={handleCopyClick}>コピー</button>
          <button class="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded" onClick={handleEmoticonChange}>絵文字・顔文字を変更する</button>
          <button class="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded" onClick={handleHideEmoticon}>
            {hideEmoticon ? "絵文字・顔文字を表示する" : "絵文字・顔文字を非表示にする"}
          </button>
        </div>
      </div>
    </div>
  );
}