// components/CardsList.tsx
"use client";

import React, { useEffect, useState } from "react";
import { database } from "../lib/firebase";
import { ref, onValue, limitToLast, query } from "firebase/database";
import Card from "./card";

interface Pesagem {
    ativo: string;
    ordemProducao: string;
    recursoBin: string;
    tara: string;
    pesoProduto: string;
    turno: string;
    operador: string;
    data: string;
}

const CardsList: React.FC = () => {
    const [pesagens, setPesagens] = useState<Pesagem[]>([]);

    useEffect(() => {
        const pesagensRef = query(ref(database, 'pesagens'), limitToLast(6));
        onValue(pesagensRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const pesagensArray = Object.values(data) as Pesagem[];
                setPesagens(pesagensArray.reverse());
            }
        });
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pesagens.map((pesagem, index) => (
                <Card key={index} {...pesagem} />
            ))}
        </div>
    );
};

export default CardsList;
