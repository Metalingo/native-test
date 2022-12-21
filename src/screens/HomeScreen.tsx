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
import Svg, { Circle, Path } from 'react-native-svg'

import { STATUS, SwipeablePanel } from '@app/components/SwipeablePanel'

const HomeScreen: React.FC = () => {
	const [panelStatus, setPanelStatus] = useState(2)
	const panelHeight = Dimensions.get('window').height * 0.8
	const panelWidth = Dimensions.get('window').width

	const minimizedHeight = Dimensions.get('window').height * 0.35
	const opacityAnim = useRef(new Animated.Value(0.5)).current
	const heightAnim = useRef(new Animated.Value(0)).current

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
				toValue: 0.6,
				duration: 700,
				useNativeDriver: false,
			}).start()

			Animated.timing(heightAnim, {
				toValue: panelHeight * 0.18,
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
				toValue: minimizedHeight * 0.18,
				duration: 700,
				easing: Easing.linear,
				useNativeDriver: false,
			}).start()
		}
	}

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
							padding-bottom: 50px;
							padding-top: 30px;
							flex-direction: column;
						`,
						{ height: panelHeight },
					]}
				>
					{panelStatus === 2 ? (
						<Animated.View style={{ opacity: opacityAnim, marginBottom: 40 }}>
							<Text
								style={css`
									font-size: 18px;
									font-weight: bold;
									text-align: center;
								`}
							>
								이번 주에 4일 연속으로 접속하셨어요.
							</Text>
							<Text
								style={css`
									font-size: 18px;
									font-weight: bold;
									margin-top: 10px;
									text-align: center;
								`}
							>
								14분 더 대화하시면 오늘 목표가 달성돼요!.
							</Text>
						</Animated.View>
					) : (
						<></>
					)}

					<Animated.View
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'row',
							maxHeight: heightAnim,
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
												width: 45px;
												border-radius: 10px;
												margin-right: 1px;
											`,
											{
												borderWidth: 1,
												borderColor: isCompleted ? '#61e294' : '#b5b5b5',
												backgroundColor: isCompleted ? '#61e294' : '#fff',
											},
										]}
									>
										<>
											{isCurrentDay && (
												<>
													<View
														style={{
															backgroundColor: '#f25757',
															width: 10,
															height: 10,
															position: 'absolute',
															borderRadius: 100,
															top: -5,
															right: -5,
														}}
													/>
													<View
														style={{
															position: 'absolute',
															backgroundColor: '#b1f0c9',
															height:
																(data.todayMinutes / userData.targetMinutes) *
																0.18 *
																panelHeight,
															width: 43,
															bottom: 0,
															borderBottomRightRadius: 10,
															borderBottomLeftRadius: 10,
														}}
													/>
												</>
											)}
											<Text
												style={[
													css`
														font-size: 18px;
														font-weight: bold;
														text-align: center;
														padding-top: 10px;
													`,
													{ paddingTop: 0.08 * panelHeight },
												]}
											>
												{title}
											</Text>
										</>
									</View>
								)
							},
						)}
					</Animated.View>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							paddingHorizontal: 24,
							paddingTop: 30,
						}}
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
								const radius = 40
								const circumference = radius * 2 * Math.PI
								const progress = circumference - percentage * circumference
								return (
									<View
										style={{
											paddingHorizontal: 2,
										}}
										key={title}
									>
										<Text style={{ textAlign: 'center', fontSize: 16 }}>
											{title}
										</Text>

										<Svg
											fill="transparent"
											style={[
												css`
													width: 100px;
													height: 100px;
													transform: rotate(-90deg); /* Fix the orientation */
												`,
											]}
										>
											<Circle
												cx={50}
												cy={50}
												r={radius}
												strokeLinecap="round"
												stroke="#e3e3e3"
												strokeWidth={5}
												fill="transparent"
												strokeDashoffset={progress}
											/>
											<Circle
												cx={50}
												cy={50}
												r={radius}
												strokeLinecap="round"
												stroke="#61e294"
												strokeWidth={5}
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
												top: 55,
											}}
										>
											<Text
												style={{
													fontWeight: 'bold',
													fontSize: 20,
												}}
											>
												{numerator}
											</Text>
											<Text style={{ marginTop: 3 }}>
												/{denominator}
												{unit}
											</Text>
										</View>
									</View>
								)
							},
						)}
					</View>

					<TouchableOpacity
						style={{
							position: 'absolute',
							top: panelHeight * 0.7,
							width: '100%',
						}}
					>
						<View
							style={{
								backgroundColor: '#61e294',
								alignSelf: 'center',
								borderRadius: 10,
								paddingVertical: 16,
								paddingHorizontal: (panelWidth / 2) * 0.7,
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
						</View>
					</TouchableOpacity>

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
