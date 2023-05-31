import React from 'react'
import { Modal, Pressable, Text } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'

export const SliderModal = ({ pages, visible, closeModal }) => {
  const textButton = ({ onPress, nextLabel, skipLabel }) => (
    <Pressable onPress={onPress}>
      <Text className='text-primary font-ms-semibold text-regular px-4'>{nextLabel || skipLabel}</Text>
    </Pressable>
  )

  return (
    <Modal visible={visible}>
      <Onboarding
        pages={pages}
        onDone={closeModal}
        onSkip={closeModal}
        nextLabel='Próximo'
        skipLabel='Pular'
        NextButtonComponent={textButton}
        SkipButtonComponent={textButton}
        DoneButtonComponent={(props) => textButton({ nextLabel: 'Finalizar', ...props })}
      />
    </Modal>
  )
}
