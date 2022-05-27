import React from "react";
import { HistoryCard } from "../../components/HistoryCard";
import { Container, Header, Title } from "./styles";

export function Resume(){
    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            <HistoryCard 
                title="Compras"
                amount="R$ 120,00"
                color="blue"
            />
        </Container>
    )
}