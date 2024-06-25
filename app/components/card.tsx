// components/Card.tsx
import React from "react";
import Icon from "./icon";

interface CardProps {
    ativo: string;
    ordemProducao: string;
    recursoBin: string;
    tara: string;
    pesoProduto: string;
    turno: string;
    pesagemType: string;
    operador: string;
    data: string;
}

const Card: React.FC<CardProps> = ({ ativo, ordemProducao, recursoBin, tara, pesoProduto, turno, pesagemType, operador, data }) => {

    const iconName = pesagemType === "Pesagem Direta" ? "close_fullscreen" : "precision_manufacturing";

    return (
        <div className="bg-[#5E95AA] w-80 h-90 shadow-md rounded-lg p-10 pb-10">
            <div>
                <h2 className="text-lg font-bold mb-1">{ativo}</h2>
            </div>

            <div className="border-b-2 p-1 mb-3"></div>
            <main>
                <div className="flex">
                    <p className="mr-[150px]">OP</p>
                    <p className="text-gray-50  mb-1">{ordemProducao}</p>
                </div>
                <div>
                    <p className="text-gray-50 mb-1">Recurso Bin: {recursoBin}</p>
                </div>



                <p className="text-gray-50 mb-1">Tara: {tara} kg</p>

                <p className="text-gray-50 mb-1">Peso: {pesoProduto} kg</p>

                <p className="text-gray-50 mb-1">Turno: {turno}</p>

                <p className="text-gray-50 mb-1">Operador: {operador}</p>

                <p className="text-gray-50">{data}</p>
            </main>


            <div className=" border-t-2 flex">
                <Icon icon={iconName} className="mr-2 mt-2" /><p className="mt-2">{pesagemType}</p>
            </div>
        </div>
    );
};

export default Card;
