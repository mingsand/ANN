class 퍼셉트론 {
    constructor(학습률, 입력수) {
        this.학습률 = 학습률;
        this.가중치 = new Array(입력수).fill(0).map(() => Math.random());
        this.편향 = Math.random();
    }

    활성화(합) {
        return 합 >= 0 ? 1 : 0; // Step function
    }

    예측(입력) {
        const 가중합 = 입력.reduce((누적, 값, 인덱스) => 누적 + 값 * this.가중치[인덱스], this.편향);
        return this.활성화(가중합);
    }

    학습(훈련입력, 훈련출력, 에포크) {
        for (let 에포크수 = 0; 에포크수 < 에포크; 에포크수++) {
            for (let i = 0; i < 훈련입력.length; i++) {
                const 출력 = this.예측(훈련입력[i]);
                const 오차 = 훈련출력[i] - 출력;

                // 가중치와 편향 업데이트
                this.가중치 = this.가중치.map((가중치, 인덱스) => 가중치 + this.학습률 * 오차 * 훈련입력[i][인덱스]);
                this.편향 += this.학습률 * 오차;
            }
        }
    }
}

// 사용 예
const 훈련입력 = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
];

const 훈련출력 = [0, 0, 0, 1]; // AND 논리 연산

const 퍼셉트론모델 = new 퍼셉트론(0.1, 2);
퍼셉트론모델.학습(훈련입력, 훈련출력, 100);

// 사용자 입력 받기
const 입력값 = prompt("두 개의 0 또는 1을 입력하세요 (예: 0,1):");
const 입력배열 = 입력값.split(",").map(Number);

const 결과 = 퍼셉트론모델.예측(입력배열);
console.log(`입력값: [${입력배열}] -> 예측 결과: ${결과}`);
