import { css } from '@emotion/native'
import { useRef,useState } from 'react'
import { Animated, Dimensions, Text, View } from 'react-native'

import { STATUS, SwipeablePanel } from '@app/components/SwipeablePanel'

const HomeScreen: React.FC = () => {
	const [panelStatus, setPanelStatus] = useState(2)
	const panelHeight = Dimensions.get('window').height * 0.8
    const minimizedHeight = Dimensions.get('window').height * 0.35
    const opacityAnim = useRef(new Animated.Value(0.5)).current

	const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,        
        canClose: false,
        canScroll: false,
        orientation: 'portrait',
        showCloseButton: false,
        largePanelHeight: panelHeight,
        smallPanelHeight: minimizedHeight,
        bigBackgroundOpacity: 0.0,
        smallBackgroundOpacity: 0.0,
        onChangeStatus: (status: STATUS) => changedStatus(status),
        statusChangeDone: (status: STATUS) => statusChangeDone(status) 
      });

	  const [isPanelActive, setIsPanelActive] = useState(true);

	  const statusChangeDone = (status: STATUS) => {
        setPanelStatus(status)
      }
	  const changedStatus = (status: STATUS) => {
        if (status == 2) {
            setPanelStatus(status)
            Animated.timing(opacityAnim, {
                toValue: 0.6,
                duration: 700,
                useNativeDriver: true
            }).start()
        } else {
            Animated.timing(opacityAnim, {
                toValue: 0.0,
                duration: 700,
                useNativeDriver: true
            }).start()
        }
    } 


	// static data to build front-end UI
	const userData = {
		targetMinutes: 20,
		targetDaysPerWeek: 6,
		targetDaysPerMonth: 20
	}
	const data = {
		todayMinutes: 6,
		currentDays: 5,
	}


	return (
		
		<View
			style={css`
				flex: 1;
				background: #000; 
			`}
		>
			<SwipeablePanel {...panelProps} isActive={isPanelActive}>
                    <View style={[css`
                        padding: 24px;
                        padding-bottom: 50px;
                        padding-top: 30px;
                        flex-direction: column;
                    `, { height: panelHeight  }]}>
                        <Text style={css`font-size: 18px; text-align: center`}>이번 주에 4일 연속으로 접속하셨어요.</Text>
                        <View style={[css`
                            flex: 0.3;
                            flex-direction: row;
                            justify-content: flex-end;
                            // background-color: red;
                        `]}>
                            {/* <MBText>{JSON.stringify(greetings.data)}</MBText> */}
                            {/* Enter statistics */}
				        </View>
                    </View>
                </SwipeablePanel> 
			
			
		</View>

	)
}

export default HomeScreen
