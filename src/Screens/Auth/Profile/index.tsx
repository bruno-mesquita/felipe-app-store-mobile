import React, { useState } from 'react';

import { Tab, FormAddress, FormProfile } from './Components';

import { Container, Tabs } from './styles';

export const Profile = () => {
  const [activeData, setActiveData] = useState(true);
  const [activeAddress, setActiveAddress] = useState(false);

  const onPressData = () => {
    setActiveAddress(false);
    setActiveData(true);
  }

  const onPressAddress = () => {
    setActiveData(false);
    setActiveAddress(true);
  }

  return (
    <Container>
      <Tabs>
        <Tab onPress={onPressData} active={activeData}>Dados do estabelecimento</Tab>
        <Tab onPress={onPressAddress} active={activeAddress}>Endereço</Tab>
      </Tabs>

      {activeData ? <FormProfile /> : <FormAddress />}
    </Container>
  )
}
