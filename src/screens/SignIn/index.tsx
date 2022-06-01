import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import AppleSvg from '../../assets/apple.svg';
import AndroidSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
} from "./styles";

export function SingIn() {
    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />

                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples 
                    </Title>
                </TitleWrapper>

                <SignInTitle>
                    Faça seu login {'\n'}com uma das contas abaixo
                </SignInTitle>
            </Header>

            <Footer>

            </Footer>

        </Container>
    );

}