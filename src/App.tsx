import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';

const BAN_WORDS = [
	'Kupka kreka',
	'!!!Stop!!!',
	'Ni, pozwalam',
	'Nie, nie, nie',
	'Wonchaj dupe',
	'💩 Nie?',
	'Zastanuw sie',
	'Śmierdzisz',
	'Namwet nie mymś o tym',
	'Mamy hotpotulca',
	'Dupa',
	'Apud',
	'Gegagedigedagedago',
	'Kurwa!!!!',
	'STOP!!!',
	'RZESTAN!!!!',
	'APUD!!!!',
	'Abi mery alongtamigo',
	'wede wude kamfro',
	'wede wudo go',
	'wede jude kamfro bagulado'
];

type FlyingCat = {
	x: number;
	velocity: number;
};

export function App() {
	const [isHeartClicked, setIsHeartClicked] = useState(false);
	const [banWordIndex, setBanWordIndex] = useState(0);
	const [flyingCats, setFlyingCats] = useState<FlyingCat[]>([]);

	const heartClick = useCallback(() => {
		setIsHeartClicked(true);
	}, []);

	const banWordHover = useCallback(() => {
		setBanWordIndex((oldValue) => {
			return oldValue === BAN_WORDS.length - 1 ? 0 : oldValue + 1;
		});
	}, []);

	useEffect(() => {
		if (!isHeartClicked) {
			return;
		}

		const interval = setInterval(() => {
			setFlyingCats((oldValue) => {
				const newFlyingCat = {
					x: Math.random() * window.innerWidth,
					velocity: Math.floor(Math.random() * 5) + 1
				};


				return [...oldValue, newFlyingCat];
			});
		}, 200);

		return () => {
			clearInterval(interval);
		};
	}, [isHeartClicked]);

	return (
		<div className="w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
			<p>
				Czy chcesz zostać moją <span className="text-red-400">Walentyłką</span>?
			</p>

			<PropositionWrapper className="flex gap-10 mt-8">
				<BananaCatWrapper onClick={heartClick}
				                  className="flex gap-2 flex-col items-center cursor-pointer">
					<span className="text-red-400">
						❤️ Tek ❤️
					</span>

					<img className="w-10"
					     src="./banana-cat.png"
					     alt="Banankowy Cat"/>
				</BananaCatWrapper>

				<div className="relative flex gap-2 flex-col items-center">
					<span className="text-amber-800">
						💩 Ni 💩
					</span>

					<img className="w-32"
					     src="./sad-heart.png"
					     alt="Ty chuju!"/>

					<div
						onMouseEnter={banWordHover}
						className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-white opacity-0 text-center cursor-not-allowed hover:opacity-100 transition-opacity">
						<span>
							{BAN_WORDS[banWordIndex]}
						</span>
					</div>
				</div>
			</PropositionWrapper>

			{isHeartClicked && (
				<video className="absolute top-0 left-0 w-full h-full object-cover"
				       autoPlay={true}
				       loop={true}
				       src="./yippee.mp4"></video>
			)}

			{
				isHeartClicked && (
					<div className="absolute top-0 left-0 w-full h-full z-10 overflow-hidden">
						{
							flyingCats.map((flyingCat, index) => (
								<FlyingCat key={index}
								           velocity={flyingCat.velocity}
								           className="absolute w-10"
								           style={{
									           top: 0,
									           left: flyingCat.x
								           }}
								           src="./banana-cat.png"
								           alt="Banankowy Cat"/>
							))
						}
					</div>
				)
			}
		</div>
	);
}

const BananaCatWrapper = styled.div`
    &:hover {
        img {
            animation: rotate .5s ease-in-out infinite;
        }
    }

    @keyframes rotate {
        0% {
            transform: scaleX(-1);
        }

        50% {
            transform: scaleX(1);
        }

        100% {
            transform: scaleX(-1);
        }
    }
`;

const PropositionWrapper = styled.div`
    transition: ease-in-out 0.3s;
`;

const FlyingCat = styled.img<{ velocity: number }>`
    animation: fly ${p => p.velocity}s linear infinite;

    @keyframes fly {
        0% {
            top: 0;
        }

        100% {
            top: 100%;
        }
    }
`;
