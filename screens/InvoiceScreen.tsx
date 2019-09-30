import React from "react"
import { TouchableHighlight, TextInput, Text, View } from "react-native"
import { AxiosResponse } from "axios";
import AsyncStorage from '@react-native-community/async-storage';
import { SvgUri } from 'react-native-svg';
import styled from 'styled-components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import BchInput from "../components/bch-input";

export interface Props {
  location: object;
  history: any;
}

interface State {
  id: string;
  errorMsg: string;
  merchant: {
    currency: string;
    destinationAddress: string;
    companyName: string;
  };
  bip70Payload: object;
  isValid: boolean;
}

export default class InvoiceScreen extends React.Component<Props, State> {
  state: State = {
    id: "",
    errorMsg: "",
    merchant: {
      currency: "",
      destinationAddress: "",
      companyName: ""
    },
    bip70Payload: {},
    isValid: false
  };

  componentDidMount = () => {
    this.getMerchantInfo();
  };


  getMerchantID = async () => {
    try {
      const value = await AsyncStorage.getItem('merchant')
      return value;
    } catch (e) {

      throw new Error('error reading merchant');
    }
  }

  getMerchantInfo = async () => {
    const merchantInfo = await this.getMerchantID();

    const resp = await this.mockApiCall(merchantInfo);
    this.setState({ merchant: resp });
  };

  mockApiCall = async (apiKey: any) => {
    return {
      currency: "USD",
      destinationAddress: "asdf",
      companyName: "Test Merchant Name"
    };
  };

  updateBip70Payload = (obj: object) => {
    this.setState({ bip70Payload: obj });
  };

  markValid = () => {
    this.setState({ isValid: true });
  };
  markInvalid = () => {
    this.setState({ isValid: false });
  };

  submitPayload = async () => {
    const { bip70Payload } = this.state;

    const {
      history: { push }
    } = this.props;
    const { data }: AxiosResponse = await axios.post(
      `https://pay.bitcoin.com/create_invoice`,
      bip70Payload
    );

    const { paymentId } = data;
    //    push(`/i/${paymentId}`);
  };

  render(): JSX.Element {
    const {
      merchant: { companyName },
      isValid,
      bip70Payload
    } = this.state;

    return (
      <Container>

        <BchInput
          companyName={companyName}
          markValid={this.markValid}
          markInvalid={this.markInvalid}
          updateBip70Payload={this.updateBip70Payload}
        />


      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #FBFCFF;
`;
