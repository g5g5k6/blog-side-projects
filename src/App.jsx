import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Client, Account } from "appwrite";
function App() {
  const [count, setCount] = useState(0)
   useEffect(() => {
    const client = new Client();
    // 故意不寫 setEndpoint() 來測試看看會不會錯
    client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

    const account = new Account(client);

    account.get()
      .then((res) => {
        console.log("✅ 成功取得使用者：", res);
      })
      .catch((err) => {
        console.error("❌ 發生錯誤：", err);
      });
  }, []);
  return (
    <>
      <h1 class="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-500">
        Tailwind 測試成功 🎉
      </h1>
      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        測試按鈕
      </button>
    </div>
    </>
  )
}

export default App
