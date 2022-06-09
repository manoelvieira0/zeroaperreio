import React, { useContext, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { useTheme } from "styled-components";

import { useAuth } from "../../hooks/auth";

import { SignInSocialButton } from "../../components/SignInSocialButton";

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper,
    NameLogo,
} from "./styles";

export function SingIn() {
    const [isLoading, setIsLoading] = useState(false);
    const { signInWithGoogle } = useAuth();
    const theme = useTheme();

    async function handleSignInWithGoogle() {
        try {
            setIsLoading(true)
            return await signInWithGoogle();
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possível conectar a conta Google')
            setIsLoading(false)
        }

    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(180)}
                        height={RFValue(110)}
                    />

                    <NameLogo>
                        ZeroAperreio
                    </NameLogo>

                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>

                <SignInTitle>
                    Faça seu login {'\n'}com sua conta abaixo
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} onPress={handleSignInWithGoogle} />
                </FooterWrapper>

                {isLoading && <ActivityIndicator color={theme.colors.shape} style={{ marginTop: 18 }} />}
            </Footer>

        </Container>
    );

}