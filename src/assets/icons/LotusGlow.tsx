import Svg, { Path, Defs, RadialGradient, Stop, Circle, G } from 'react-native-svg';

const LotusGlow = ({ size = 96 }: { size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 96 96">
        <Defs>
            <RadialGradient id="lotusGlow" cx="50%" cy="50%" r="50%">
                <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.5" />
                <Stop offset="0.45" stopColor="#4FB3F6" stopOpacity="0.25" />
                <Stop offset="1" stopColor="#4FB3F6" stopOpacity="0" />
            </RadialGradient>
        </Defs>

        <Circle cx="48" cy="48" r="48" fill="url(#lotusGlow)" />

        <G transform="translate(28 28) scale(0.101) translate(-300 -150)">
            {/* Top petal */}
            <Path
                fill="#FFFFFF"
                d="M500 160 C540 190 575 240 560 290 C555 315 530 335 500 348 C470 335 445 315 440 290 C425 240 460 190 500 160 Z"
            />
            {/* Bowl */}
            <Path
                fill="#FFFFFF"
                d="M305 332 C345 305 440 300 500 405 C560 300 655 305 690 332 C685 455 600 540 500 540 C400 540 315 455 305 332 Z"
            />
        </G>
    </Svg>
);

export default LotusGlow;