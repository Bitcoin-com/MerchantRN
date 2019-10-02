import React from "react"
import { NativeModules, TextInput, TouchableHighlight, Text, View } from "react-native"
import styled from 'styled-components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { TokenSelection } from "./tokenSelection";


const defaultTheme = '#5451c9';


const mockupArray = [
  {
    name: "Bitcoin Cash",
    ticker: "BCH",
    tokenID: "",
    decimal_count: 8,
    imagePath: 'https://learnbitcoin.cash/bch.png'
  },
  {
    tokenID: "4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf",
    imagePath: 'https://learnbitcoin.cash/spice.svg',
    name: "SPICE",
    ticker: "SPICE",
    decimal_count: 8
  }
];

console.log('mockupArray', mockupArray);

export interface PaymentProps {
  addSelection: Function;
  selectedPaymentType: {
    name: string;
    ticker: string;
    tokenID: string;
    decimal_count: number;
    imagePath: string;
  };
  constructBip70Payload: Function;
}

interface PaymentState { }

export class Payment extends React.Component<PaymentProps, PaymentState> {
  state: PaymentState = {};

  componentDidMount = async () => {
    // set BCH as default
    const { addSelection } = this.props;
    await addSelection(mockupArray[0]);
  };

  render(): JSX.Element {
    const {
      addSelection,
      selectedPaymentType,
      constructBip70Payload
    } = this.props;
    if (selectedPaymentType === null) {
      return null;
    }

    return (
      <Container>
        <HeaderText>Pay with</HeaderText>
        {mockupArray.map((x, i) => {
          const isSelected = selectedPaymentType.ticker === x.ticker;

          return (
            <TokenSelection
              key={i}
              token={x}
              active={isSelected}
              addSelection={addSelection}
              constructBip70Payload={constructBip70Payload}
            />
          );
        })}
      </Container>
    );
  }
}



const Container = styled.View`
  margin-top:${hp('2%')};
`;


const HeaderText = styled.Text`
  font-weight: 100;
  text-align:left;
  font-size: ${wp('5%')};
  color: ${defaultTheme};
  margin-left:${wp('5%')};
  margin-top:${hp('4%')};
`;


