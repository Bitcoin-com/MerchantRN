import React from "react"
import { Button, StyleSheet, Text, View } from "react-native"
import AsyncStorage from '@react-native-community/async-storage';

export interface Props {
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

export default class HomeScreen extends React.Component<Props, State> {

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

  getMerchantInfo = async () => {
    const merchantInfo = await this.getMerchantID();


    const resp = await this.mockApiCall(merchantInfo);
    this.setState({ merchant: resp });
  };


  getMerchantID = async () => {
    try {
      const value = await AsyncStorage.getItem('merchant')
      return value;
    } catch (e) {

      throw new Error('error reading merchant');
    }
  }


  mockApiCall = async (apiKey: any) => {
    return {
      currency: "USD",
      destinationAddress: "asdf",
      companyName: "Test Merchant Name"
    };
  };


  render() {
    return (
      <View>
        <Text>
          Invoice page
        </Text>


      </View>
    )
  }
}
