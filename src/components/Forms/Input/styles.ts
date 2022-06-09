import styled from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TextInput)`
    width: 100%;
    padding: 16px 18px;
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    background-color: ${({theme}) => theme.colors.background_black_transparent};
    border-radius: 15px;
    margin-bottom: 8px;
    
`;