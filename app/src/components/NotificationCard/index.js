import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import colors from '../../../assets/styles/colorVariables';
import styles from './styles';

export default function NotificationCard({
  notificationType,
  notificationTitle,
  notificationBody,
  notificationDate,
  dateNow,
}) {
  const [time, setTime] = useState(``);
  const [iconName, setIconName] = useState('bell');
  const [iconBackground, setIconBackground] = useState(colors.primary);

  useEffect(() => {
    let date = new Date(notificationDate);
    let dateNow = new Date();
    let msDifferenceTime = dateNow.getTime() - date.getTime();
    if (msDifferenceTime < 0) {
      setTime('Agora');
    } else {
      let interval = new Date(msDifferenceTime);
      // Qualquer data registrada é contada a partir de 1970,
      //então para pegar a quantidade certa de anos que passaram substraísse 1970.
      let yearsPassed = interval.getUTCFullYear() - 1970;
      let monthsPassed = interval.getUTCMonth();
      // Dia começa em 1, então para pegar a quantidade certa de dias substraísse 1.
      let daysPassed = interval.getUTCDate() - 1;
      let hoursPassed = interval.getUTCHours();
      let minutesPassed = interval.getUTCMinutes();

      if (yearsPassed > 0) {
        yearsPassed > 1
          ? setTime(`${yearsPassed} anos atrás`)
          : setTime(`${yearsPassed} ano atrás`);
      } else if (monthsPassed > 0) {
        monthsPassed > 1
          ? setTime(`${monthsPassed} meses atrás`)
          : setTime(`${monthsPassed} mês atrás`);
      } else if (daysPassed > 0) {
        daysPassed > 1 ? setTime(`${daysPassed} dias atrás`) : setTime(`${daysPassed} dia atrás`);
      } else if (hoursPassed > 0) {
        hoursPassed > 1
          ? setTime(`${hoursPassed} horas atrás`)
          : setTime(`${hoursPassed} hora atrás`);
      } else if (minutesPassed > 0) {
        minutesPassed > 1
          ? setTime(`${minutesPassed} minutos atrás`)
          : setTime(`${minutesPassed} minuto atrás`);
      } else {
        setTime(`Agora`);
      }
    }
  }, [dateNow]);

  useEffect(() => {
    switch (notificationType) {
      case 'ajudaRecebida':
        setIconName('bell');
        setIconBackground(colors.primary);
        break;

      case 'ajudaAceita':
        setIconName('bell');
        setIconBackground(colors.primary);
        break;

      case 'ajudaFinalizada':
        setIconName('check');
        setIconBackground(colors.danger);
        break;

      case 'ajudaExpirada':
        setIconName('exclamation');
        setIconBackground(colors.danger);
        break;
    }
  }, []);

  return (
    <View style={styles.cardContainer}>
      <View style={[styles.iconContent, { backgroundColor: iconBackground }]}>
        <Icon size={15} name={iconName} type="font-awesome" color={colors.light} />
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {notificationTitle}
        </Text>
        <Text numberOfLines={2}>{notificationBody}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}
