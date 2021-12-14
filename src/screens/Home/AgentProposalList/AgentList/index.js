import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {NAVIGATION_NAME} from '../../../../navigations';
import {ServiceHandle} from '../../../../services';
import {Const, trans} from '../../../../utils';
import ItemAgent from '../Component/ItemAgent';

import styles from './styles';

const AgentList = ({navigation}) => {
  const [listAgent, setListAgent] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAgentList();
  }, []);

  const getAgentList = () => {
    setRefreshing(true);
    const params = {
      pagesize: 0,
      pagenum: 0,
    };
    ServiceHandle.get(Const.API.GetCustomerRegistration, params)
      .then(res => {
        if (res.ok) {
          setListAgent(res.data.customerList);
        } else {
          setTimeout(() => {
            SimpleToast.show(res.error, SimpleToast.SHORT);
          }, 700);
        }
      })
      .finally(() => setRefreshing(false));
  };

  const renderItem = item => {
    return (
      <ItemAgent
        item={item}
        onPress={() =>
          navigation.navigate(NAVIGATION_NAME.AgentDetail, {data: item})
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('agentProposal')} />
      </Appbar.Header>
      <FlatList
        data={listAgent}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getAgentList} />
        }
      />
    </View>
  );
};
export default AgentList;
