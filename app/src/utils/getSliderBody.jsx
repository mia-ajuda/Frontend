import Step1 from '../../assets/images/TutorialImages/Step1.svg'
import Step2 from '../../assets/images/TutorialImages/Step2.svg'
import Step3 from '../../assets/images/TutorialImages/Step3.svg'
import colors from '../../assets/styles/colorVariables'
import { SliderDescription } from '../components/atoms/SliderDescription'
import { SliderTitle } from '../components/atoms/SliderTitle'

export const getSliderBody = (index, title, subtitle) => {
    const stepImages = {
        1: <Step1 />,
        2: <Step2 />,
        3: <Step3 />,
    }
    const image = stepImages[index]
    return ({
        backgroundColor: colors.light,
        image,
        title: <SliderTitle title={title} />,
        subtitle: <SliderDescription description={subtitle} />,
    })
}