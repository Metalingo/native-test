import { css } from '@emotion/native'
import React, { useRef, useState } from 'react'
import {
	Animated,
	Dimensions,
	Easing,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import Svg, { Circle } from 'react-native-svg'

import { STATUS, SwipeablePanel } from '@app/components/SwipeablePanel'

const HomeScreen: React.FC = () => {
	const [panelStatus, setPanelStatus] = useState(2)
	const panelHeight = Dimensions.get('window').height * 0.8
	const panelWidth = Dimensions.get('window').width

	// static data to build front-end UI
	const userData = {
		targetMinutes: 20,
		targetDaysPerWeek: 6,
		targetDaysPerMonth: 20,
	}
	const data = {
		todayMinutes: 6,
		currentDays: 5,
	}
	const daysInWeek = [
		{ title: '월', isCompleted: true, isCurrentDay: false },
		{ title: '화', isCompleted: false, isCurrentDay: false },
		{ title: '수', isCompleted: true, isCurrentDay: false },
		{ title: '목', isCompleted: false, isCurrentDay: true },
		{ title: '금', isCompleted: false, isCurrentDay: false },
		{ title: '토', isCompleted: false, isCurrentDay: false },
		{ title: '일', isCompleted: false, isCurrentDay: false },
	]

	const stats = [
		{
			title: '오늘의 목표',
			numerator: data.todayMinutes,
			denominator: userData.targetMinutes,
			unit: '분',
		},
		{
			title: '이번 주 목표',
			numerator: data.currentDays,
			denominator: userData.targetDaysPerWeek,
			unit: '일',
		},
		{
			title: '이번 달의 목표',
			numerator: data.currentDays,
			denominator: userData.targetDaysPerMonth,
			unit: '일',
		},
	]

	const minimizedHeight = Dimensions.get('window').height * 0.35
	const opacityAnim = useRef(new Animated.Value(0.5)).current
	const heightAnim = useRef(new Animated.Value(0)).current
	const translateAnim = useRef(new Animated.Value(0)).current
	const textTranslateAnim = useRef(new Animated.Value(0)).current
	const statPercentageAnim = useRef(new Animated.Value(0)).current

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
		statusChangeDone: (status: STATUS) => statusChangeDone(status),
	})

	const [isPanelActive, setIsPanelActive] = useState(true)

	const statusChangeDone = (status: STATUS) => {
		setPanelStatus(status)
	}
	const changedStatus = (status: STATUS) => {
		if (status == 2) {
			setPanelStatus(status)
			Animated.timing(opacityAnim, {
				toValue: 1,
				duration: 700,
				useNativeDriver: false,
			}).start()

			Animated.timing(heightAnim, {
				toValue: panelHeight * 0.18,
				duration: 700,
				easing: Easing.linear,
				useNativeDriver: false,
			}).start()

			Animated.timing(translateAnim, {
				toValue: 0,
				duration: 700,
				easing: Easing.linear,
				useNativeDriver: false,
			}).start()

			Animated.timing(textTranslateAnim, {
				toValue: 0,
				duration: 700,
				easing: Easing.linear,
				useNativeDriver: false,
			}).start()

			Animated.timing(statPercentageAnim, {
				toValue:
					(data.todayMinutes / userData.targetMinutes) * 0.15 * panelHeight,
				duration: 700,
				easing: Easing.linear,
				useNativeDriver: false,
			}).start()
		} else {
			Animated.timing(opacityAnim, {
				toValue: 0.0,
				duration: 700,
				useNativeDriver: false,
			}).start()

			Animated.timing(heightAnim, {
				toValue: minimizedHeight * 0.15,
				duration: 700,
				easing: Easing.linear,
				useNativeDriver: false,
			}).start()

			Animated.timing(translateAnim, {
				toValue: -panelHeight * 0.15 - 50,
				duration: 700,
				easing: Easing.linear,
				useNativeDriver: false,
			}).start()

			Animated.timing(textTranslateAnim, {
				toValue: -minimizedHeight * 0.15,
				duration: 700,
				easing: Easing.linear,
				useNativeDriver: false,
			}).start()

			Animated.timing(statPercentageAnim, {
				toValue:
					(data.todayMinutes / userData.targetMinutes) * 0.15 * minimizedHeight,
				duration: 700,
				easing: Easing.linear,
				useNativeDriver: false,
			}).start()
		}
	}

	const circleCenter = { x: 60, y: 50 }
	const statWidth = 46
	return (
		<View
			style={css`
				flex: 1;
				background: #000;
			`}
		>
			<SwipeablePanel {...panelProps} isActive={isPanelActive}>
				<View
					style={[
						css`
							//padding: 24px;
							//padding-bottom: 50px;
							//padding-top: 30px;
							flex-direction: column;
						`,
						{
							height: panelHeight,
						},
					]}
				>
					<Animated.View
						style={{
							opacity: opacityAnim,
							flex: 0.15,
							paddingTop: 30,
						}}
					>
						<Text
							style={css`
								font-size: 18px;
								font-weight: bold;
								text-align: center;
								line-height: 36px;
							`}
						>
							이번 주에 4일 연속으로 접속하셨어요.
						</Text>
						<Text
							style={css`
								font-size: 18px;
								font-weight: bold;
								text-align: center;
							`}
						>
							14분 더 대화하시면 오늘 목표가 달성돼요!
						</Text>
					</Animated.View>

					<Animated.View
						style={{
							flex: 0.3,
							display: 'flex',
							flexDirection: 'row',
							maxHeight: heightAnim,
							transform: [{ translateY: translateAnim }],
							justifyContent: 'space-between',
							paddingHorizontal: 11,
						}}
					>
						{daysInWeek.map(
							(day: {
								title: string
								isCompleted: boolean
								isCurrentDay: boolean
							}) => {
								const { title, isCompleted, isCurrentDay } = day
								return (
									<View
										key={title}
										style={[
											css`
												border-radius: 10px;
												margin-right: 1px;
											`,
											{
												width: statWidth,
												borderWidth: 1,
												borderColor: isCompleted ? '#61e294' : '#b5b5b5',
												backgroundColor: isCompleted ? '#61e294' : '#fff',
											},
										]}
									>
										<>
											{isCurrentDay && (
												<>
													<Animated.View
														style={{
															backgroundColor: '#f25757',
															opacity: opacityAnim,
															width: 10,
															height: 10,
															position: 'absolute',
															borderRadius: 100,
															top: -5,
															right: -5,
														}}
													/>

													<Animated.View
														style={{
															position: 'absolute',
															backgroundColor: '#b1f0c9',
															height: statPercentageAnim,
															width: statWidth - 2,
															bottom: 0,
															borderBottomRightRadius: 10,
															borderBottomLeftRadius: 10,
														}}
													/>
												</>
											)}
											<Animated.Text
												style={[
													css`
														font-size: 18px;
														font-weight: bold;
														text-align: center;
														z-index: 100000;
													`,
													{
														position: 'absolute',
														paddingLeft: statWidth * 0.27,
														paddingTop:
															panelStatus === 2
																? 0.08 * panelHeight
																: 0.19 * minimizedHeight,
														transform: [{ translateY: textTranslateAnim }],
													},
												]}
											>
												{title}
											</Animated.Text>
										</>
									</View>
								)
							},
						)}
					</Animated.View>

					<View
						style={{
							flex: 0.4,
						}}
					>
						{panelStatus === 2 && (
							<View
								style={[
									{
										flexDirection: 'row',
										justifyContent: 'space-between',
										paddingTop: 30,
										paddingHorizontal: 24,
									},
								]}
							>
								{stats.map(
									(stat: {
										title: string
										numerator: number
										denominator: number
										unit: string
									}) => {
										const { title, numerator, denominator, unit } = stat
										const percentage = numerator / denominator
										const radius = 34
										const circumference = radius * 2 * Math.PI
										const progress = circumference - percentage * circumference
										return (
											<View key={title}>
												<Text style={{ textAlign: 'center', fontSize: 16 }}>
													{title}
												</Text>

												<Svg
													fill="transparent"
													style={[
														css`
															width: 100px;
															height: 100px;
														`,
														{
															transform: [{ rotate: '-90deg' }],
														},
													]}
												>
													<Circle
														cx={circleCenter.x}
														cy={circleCenter.y}
														r={radius}
														strokeLinecap="round"
														stroke="#e3e3e3"
														strokeWidth={4}
														fill="transparent"
														strokeDashoffset={progress}
													/>
													<Circle
														cx={circleCenter.x}
														cy={circleCenter.y}
														r={radius}
														strokeLinecap="round"
														stroke="#61e294"
														strokeWidth={4}
														fill="transparent"
														strokeDasharray={circumference}
														strokeDashoffset={progress}
													/>
												</Svg>

												<View
													style={{
														display: 'flex',
														flexDirection: 'row',
														alignItems: 'center',
														position: 'absolute',
														alignSelf: 'center',
														top: circleCenter.y,
													}}
												>
													<Text
														style={{
															fontWeight: 'bold',
															fontSize: 16,
														}}
													>
														{numerator}
													</Text>
													<Text style={{ marginTop: 3, fontSize: 12 }}>
														/{denominator}
														{unit}
													</Text>
												</View>
											</View>
										)
									},
								)}
							</View>
						)}

						<TouchableOpacity
							style={{
								width: '100%',
								paddingTop: 40,
							}}
						>
							<Animated.View
								style={{
									backgroundColor: '#61e294',
									alignSelf: 'center',
									borderRadius: 10,
									paddingVertical: 20,
									paddingHorizontal: (panelWidth / 2) * 0.7,
									transform: [{ translateY: translateAnim }],
								}}
							>
								<Text
									style={{
										textAlign: 'center',
										fontSize: 21,
										fontWeight: 'bold',
									}}
								>
									시작하기
								</Text>
							</Animated.View>
						</TouchableOpacity>
					</View>

					{/*<View*/}
					{/*	style={[*/}
					{/*		css`*/}
					{/*			//flex: 0.3;*/}
					{/*			flex: 1;*/}
					{/*			flex-direction: row;*/}
					{/*			display: flex;*/}
					{/*			//justify-content: flex-end;*/}
					{/*			//justify-content: flex-start;*/}
					{/*			//background-color: red;*/}
					{/*		`,*/}
					{/*	]}*/}
					{/*>*/}
					{/*	/!*<MBText>{JSON.stringify(greetings.data)}</MBText> *!/*/}
					{/*	/!* Enter statistics *!/*/}
					{/*</View>*/}
				</View>
			</SwipeablePanel>
		</View>
	)
}

export default HomeScreen
