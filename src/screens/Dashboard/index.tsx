import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from 'react-native'
import { HighlightCard } from "../../components/HighlightCard";
import { useTheme } from "styled-components"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton,
    LoadContainer,

} from './styles'
import { useAuth } from "../../hooks/auth";

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighLightProps {
    amount: string;
    lastTransaction: string;
}

interface HighLightData {
    entries: HighLightProps;
    expensives: HighLightProps;
    total: HighLightProps;
}

export function Dashboard() {
    const theme = useTheme();
    const {SignOut, user} = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highLightData, setHighLightData] = useState<HighLightData>({} as HighLightData);

    function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative'){
        const collectionFilttered = collection.filter(transaction => transaction.type === type);
        if(collectionFilttered.length === 0){
            return 0;
        }

        const lastTransactions = new Date(
                Math.max.apply(Math, collectionFilttered
                    .map(transaction => new Date(transaction.date).getTime())))

        return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString('pt-BR', {month: 'long'})}`

    };

    async function loadTransactions() {
        const dataKey = `@gofinances:transactions_user:${user.id}`;
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions
            .map((item: DataListProps) => {

                if (item.type === 'positive') {
                    entriesTotal += Number(item.amount)
                } else {
                    expensiveTotal += Number(item.amount)
                }

                let amount = Number(item.amount).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                });

                amount = amount.replace('R$', 'R$ ')

                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(item.date));

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date,
                }
            });

        setTransactions(transactionsFormatted);

        const lastTransactionsEntries = getLastTransactionDate(transactions, 'positive');
        const lastTransactionsExpensive = getLastTransactionDate(transactions, 'negative');
        const totalInterval = lastTransactionsExpensive === 0 ? 'Não há transações' : `01 a ${lastTransactionsExpensive}`

        const total = entriesTotal - expensiveTotal;

        setHighLightData({
            entries: {
                amount: entriesTotal
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                    lastTransaction: lastTransactionsEntries === 0 ? 'Não há entradas' : `Última entrada dia ${lastTransactionsEntries}`,
            },
            expensives: {
                amount: expensiveTotal
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                    lastTransaction: lastTransactionsExpensive === 0 ? 'Não há saídas' : `Última saída dia ${lastTransactionsExpensive}`
            },
            total: {
                amount: total
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                    lastTransaction: totalInterval
            }
        });
        setIsLoading(false);

    }

    useEffect(() => {
        loadTransactions();
    }, [])

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

    return (
        <Container>
            {
                isLoading ?
                    <LoadContainer>
                        <ActivityIndicator color={theme.colors.primary} size="large" />
                    </LoadContainer> :
                    <>
                        <Header>
                            <UserWrapper>
                                <UserInfo>
                                    <Photo source={{ uri: user.photo }} />
                                    <User>
                                        <UserGreeting>Olá,</UserGreeting>
                                        <UserName>{user.name}</UserName>
                                    </User>
                                </UserInfo>
                                <LogoutButton onPress={SignOut}>
                                    <Icon name="power" />
                                </LogoutButton>
                            </UserWrapper>
                        </Header>

                        <HighlightCards>
                            <HighlightCard
                                type="up"
                                title="Entradas"
                                amount={highLightData?.entries?.amount}
                                lastTransaction={highLightData.entries.lastTransaction}
                            />
                            <HighlightCard
                                type="down"
                                title="Saídas"
                                amount={highLightData?.expensives?.amount}
                                lastTransaction={highLightData.expensives.lastTransaction}
                            />
                            <HighlightCard
                                type="total"
                                title="Total"
                                amount={highLightData?.total?.amount}
                                lastTransaction={highLightData.total.lastTransaction}
                            />
                        </HighlightCards>

                        <Transactions>
                            <Title>Listagem</Title>
                            <TransactionList
                                data={transactions}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <TransactionCard data={item} />}
                            />
                        </Transactions>
                    </>
            }
        </Container>
    )
}
