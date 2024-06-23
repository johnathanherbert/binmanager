import CardsList from "./components/CardsList";
import Cartao from "./components/cartao";
import Form from "./components/form";
import Icon from "./components/icon";

export default function Home() {
  return (
    <body>
      <header className="flex items-center justify-center absolute
      text-centers bg-sky-800 w-full h-10 text-white text-xls font-bold">BIN MANAGER</header>
      <header className="flex items-center absolute mt-10
      text-centers bg-[#5E95AA] w-full h-10 ">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <Icon icon="menu" />
      </header>

      <div className="flex">
        <div className="flex w-[600px]">
          <Form />
        </div>
        <div className="p-5 w-screen h-screen bg-white">
          <div className="w-[100%] p-5 mt-20 bg-gray-200 rounded-md h-[800px]">
            <CardsList />
          </div>

        </div>


      </div>


    </body>
  )
}
