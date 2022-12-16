# Front-End Native Test Project

Native Test는 Metalingo가 활용하고 있는 프론트 전반적인 프레임워크를 활용해서 개발을 할 수 있는 정도를 평가하는 목적으로 만들어진 단순한 프로젝트 입니다. 

저희 테스트는 기본적인 Mobile App - Data Visualization 프로젝트로 다음과 같은 부분을 확인하고자 합니다:
- 기본적인 git 활용
- React Native 활용 능숙도
- TypeScript 활용 능숙도
- 부가적으로 animations, state management, code styles 등 능숙도

Native Test Project는 두가지 난이도로 분류됩니다, 아래에 설명드립니다:

## STARTING POINT
![test](https://github.com/Metalingo/native-test/raw/main/assets/native-test-assets/current.png)


Description:
- 개발 프레임워크의 세팅은 모두 되어 있습니다. `git clone` 이후 README 아래에 있는 커멘드로 개인 환경에 돌려보시면 됩니다.
- Panel도 drag하면 large, small버전으로 로 animate되도록 만들어져 있습니다.
- 본 테스트는 해당 Panel에 데이터를 표시하는 작업입니다. 
- **각 난이도의 예시에 있는 첫 flash screen사진은 시작점만 표시하는 것으로 만들지 않으셔도 됩니다.**


## EASY

![test](https://github.com/Metalingo/native-test/raw/main/assets/native-test-assets/EASY.png)
 
Description:
- 주어진 패널에 예시와 같이 데이터가 표시되어야 합니다. 
- 샘플 데이터는 `HomeScreen.tsx` 코드 내의 `userData, data`에 준비 되어 있습니다.

## HARD

![test](https://github.com/Metalingo/native-test/raw/main/assets/native-test-assets/HARD.png)

- EASY와 같이 주어진 패널에 예시와 같이 데이터가 표시되어야 합니다. 
- Animation이 추가되어야 합니다:
    - 어플이 시작할때 panel가 slide-up되는 것을 볼 수 있습니다
    - **월~일의 구긴들이 "펼쳐지게 됩니다".**
    - Slidedown 해서 미니마이즈를 하면 **월~일의 구간들이 닫혀집니다**.


## Running This Project

```
$ yarn
$ npx pod-install
$ yarn start
$ yarn ios
```